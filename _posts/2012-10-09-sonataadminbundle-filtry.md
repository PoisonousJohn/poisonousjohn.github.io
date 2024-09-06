---
id: 109
title: 'SonataAdminBundle: фильтры'
date: 2012-10-09T01:31:41+00:00


guid: http://fateev.me/?p=109
permalink: /symfony-sonata/sonataadminbundle-filtry.html
dsq_thread_id:
  - "6094667200"
header:
  teaser:  /wp-content/uploads/2012/10/Screen-Shot-2012-10-09-at-1.32.37-AM.png
categories:
  - Symfony Sonata
tags:
  - php
  - symfony-sonata
  - symfony2
---
Лично для меня - фильтры один из самых краеугольных камней, ибо это любимое требование заказчика, и очень часто у этого заказчика очень нестандартные запросы к фильтрам.

Итак, соната предоставляет несколько возможностей для внедрения фильтрации данных.

1. Неявные фильтры. Могут понадобится в случае, когда данные нужно фильтровать для пользователя определенным образом, но сам пользователь об этом знать не должен. Как пример: пользователь должен видеть только свои посты.

Стандартное поведение админ классов можно легко модифицировать с помощью AdminExtension'ов. <strong>AdminExtension</strong> - это сервис, который админ класс запускает после того как сделает свою основную работу по конфигурации. AdminExtension'ов может быть несколько. Они включают в себя основные методы админ класса, такие как configureFormFields, configureDatagridFilters и др. Мы рассмотрим метод configureQuery, с помощью которого можно изменить стандартный запрос, который выполняется, когда мы просматриваем список сущностей. В моем случае я буду выводить только те сущности, в которых поле parent &nbsp;является пустым, об иных сущностях пользователю знать не стоит

{% highlight php %} <?php
namespace Mtools\RatecardBundle\Admin;

use Sonata\AdminBundle\Admin\AdminExtension;
use Sonata\AdminBundle\Admin\AdminInterface;
use Sonata\AdminBundle\Datagrid\ProxyQueryInterface;

class RatecardAdminExtension extends AdminExtension
{

    public function configureQuery(AdminInterface $admin, ProxyQueryInterface $query, $context = 'list')
    {

            $query->getQueryBuilder()->where('o.parent IS NULL');

    }

}{% endhighlight %}

Конечно, наш класс унаследован от AdminExtension

Определение сервиса следующее:

{% highlight yaml %}mtools.ratecard.admin.extension:
        id: mtools.ratecard.admin.extension
        class: Mtools\RatecardBundle\Admin\RatecardAdminExtension
        tags:
            - { name: sonata.admin.extension, target: mtools.ratecard.admin }
 {% endhighlight %}

target в секции tag - это id сервиса админ класса, к которому будет присоединен AdminExtension
<blockquote>С помощью AdminExtension'ов очень удобно джойнить нужные сущности, чтобы потом фильтровать по этим полям внутри админ класса (это второй способ, рассмотрен ниже)</blockquote>
2. Часто возникает необходимость реализовать нестандартную логику фильтрации по определнному полю, а времени, чтобы оформлять данный фильтр как отдельный сервис нет, да и такой фильтр может встреаться только в одном месте. Для таких случаев SonataAdminBundle предоставляет тип фильтра <strong>doctrine_orm_callback</strong>. Здесь все просто как 2 копейки:

{% highlight php %}<?php
...
protected function configureDatagridFilters(DatagridMapper $datagridMapper)
{
    $datagridMapper
        ->add('codes', 'doctrine_orm_callback', array(
            'label'         => 'Код',
            'callback'      => array($this, 'getCodesFilter'),
            'field_type'    => 'genemu_jquerychosen',
            'field_options' => array(
                'class'     => 'Mtools\ClientBundle\Entity\Client',
                'widget'    => 'entity',
                'multiple'  => false,
            )
        );
}

public function getCodesFilter($queryBuilder, $alias, $field, $value)
{
    if (null === $value['value']) {
        return;
    }

    $queryBuilder->leftJoin(sprintf('%s.codes', $alias), 'c');
    $queryBuilder->andWhere('c.code = :code');
    $queryBuilder->setParameter('code', $value['value']);
}
...{% endhighlight %}

Сам фильтр мы так же, как и обычные, описываем в методе configureDatagridFilters, с той разницей, что тип фильтра указываем doctrine_orm_callback, а в опциях фильтра обязательно указываем callback - метод, который будет вызываться для формирования QueryBuilder'a соответственно нашему фильтру. Иначе говоря, в этот метод передается сам QueryBuilder, $alias - основной алиас сущности, $field - какое то мистическая переменная, я не нашел ей применения, и $value - собственно значение из фильтра, которое ввел пользователь.

Внутри функции callback'a в данном случае добавляется джоин (что, как я и говорил раньше, можно вынести в AdminExtension, и даже нужно, если этих джоинов множество), ну, и само условие для фильтрации.

Еще любопытные опции, на поиск которых я потратил некоторое время:
<ul>
	<li>field_type - тип поля, которое будет отображаться для ввода пользователем значения</li>
	<li>field_options - опции этого поля, которые обычно идут третьим аргументом в FormMapper'e метода configureFormFields</li>
</ul>
<div>В итоге, мы получаем миловидный (благодаря GenemuFormBundle) фильтр с произвольной логикой</div>
<div>Так выглядят фильтры на одном из проектов:</div>
<div><a href="http://fateev.me/wp-content/uploads/2012/10/Screen-Shot-2012-10-09-at-1.32.37-AM.png"><img title="Screen Shot 2012-10-09 at 1.32.37 AM" src="http://fateev.me/wp-content/uploads/2012/10/Screen-Shot-2012-10-09-at-1.32.37-AM.png" alt="" width="910" height="238" /></a></div>
<div>&nbsp;</div>
<div>3. Есть и третий способ - вынести фильтр в полностью самостоятельный сервис. Актуально, когда этот фильтр часто встречается в вашем проекте. Рассмотрю этот способ в отдельной статье.</div>
<div>&nbsp;</div>
<h3>Значение фильтров по-умолчанию</h3>
Однажды столкнулся с задачей, что необходимо было явно указать в фильтрах значение по-умолчанию, как если бы пользователь сам его выбрал.

{% highlight php %}<?php
    ...
    public function  getFilterParameters()
    {
        $parameters = parent::getFilterParameters();

        $filterUsers = ...;

        if (!isset($parameters['managers']['value']) || !sizeof($parameters['managers']['value'])) {

            $parameters['managers']['value'] = $filterUsers;
            $this->datagridValues['managers']['value'] = $filterUsers;
        }


        return $parameters;
    }{% endhighlight %}

Ключ ко всему - метод getFilterParameters, который соната вызывает, чтобы составить список сущностей для listAction. Данный метод заполняет свойство datagridValues соответствующими значениями. В данном случае предполагается, что $filterUsers - это массив с id'шками пользователей.