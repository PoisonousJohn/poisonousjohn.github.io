---
id: 74
title: Архитектура Sonata Admin Bundle
date: 2012-09-02T16:35:47+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=74
permalink: /symfony-sonata/arxitektura-sonata-admin-bundle.html
dsq_thread_id:
  - "6094530426"
image: /wp-content/uploads/2012/09/sonata.jpg
categories:
  - Symfony Sonata
tags:
  - php
  - symfony-sonata
  - symfony2
---

<a href="http://fateev.pro/wp-content/uploads/2012/09/sonata.jpg"><img class="size-full wp-image-78 alignleft" title="sonata" src="http://fateev.pro/wp-content/uploads/2012/09/sonata.jpg" alt="" width="59" height="59" /></a>Sonata Admin Bundle, как и вся концепция symfony2 поддерживает сервисно-ориентированную архитектуру, поэтому, чтобы сделать CRUD для сущности, в первую очередь, необходимо создать определенный сервис.

<!--more-->Приведу пример сервиса в моем проекте:

{% highlight yaml %}services:
    mtools.budget.expense.admin:
        id: mtools.budget.expense.admin
        class: Mtools\BudgetBundle\Admin\BudgetExpenseAdmin
        tags:
            - { name: sonata.admin, manager_type: orm, group: budget, label: Расходная cмета }
        arguments: [null, Mtools\BudgetBundle\Entity\BudgetExpense, MtoolsBudgetBundle:BudgetExpenseAdmin&nbsp;]{% endhighlight %}

Итак, по порядку:
<ul>
	<li>mtools.budget.expense.admin - выступает в качестве родительского id сервиса, на следующей строчке, я все же явно указываю, что это id сервиса</li>
	<li>class - это админ класс для вашей сущности, должен быть наследником&nbsp;Sonata\AdminBundle\Admin\Admin</li>
	<li>tags - теги, по которым соната определяет, что этот сервис принадлежит ей. Обращу внимание на то, что group действителен только в том случае, если в конфигурации сонаты вы явно не указывает список групп, которые должны выводиться в dashboard; label - фактически, это имя сущности, которое будет выводиться в dashboard</li>
	<li>arguments - первый аргумент... честно говоря хз что это, второй аргумент - это класс сущности, которую мы редактируем, третий аргумент - это класс контроллера, который будет обслуживать нашу сущность, должен быть &nbsp;наследником&nbsp;Sonata\AdminBundle\Controller\CRUDController</li>
</ul>
Теперь рассмотрим архитектуру админ класса. Так как основная задача админгенератора, обеспечить CRUD, то, соответственно, все архитектура завязана вокруг этих действий. Основными являются три метода для настройки админ класса:
<ul>
	<li>configureFormFields - в данном методе мы настраиваем вид формы для редактирования нашей сущности</li>
	<li>configureListFields - этот метод определяет набор колонок, которые будут отображены при выводе списка сущностей для редактирования</li>
	<li>configureDatagridFilters - а в этом методе мы определяем набор фильтров, которые мы сможем использовать для поиска по сущностям (<a title="SonataAdminBundle: фильтры" href="http://fateev.pro/symfony-sonata/sonataadminbundle-filtry.html">Более подробная информация о фильтрах</a>)</li>
	<li>configureRoutes - соната динамически генерирует роуты для сущностей, с помощью этого метода можно управлять как уже сгенерированными роутами для CRUD'a (create, edit, delete), так и добавить свои роуты, например для <a title="SonataAdminBundle: как добавить произвольную страницу к сущности" href="http://fateev.pro/symfony-sonata/sonataadminbundle-kak-dobavit-proizvolnuyu-stranicu-k-sushhnosti.html">произвольной страницы</a></li>
</ul>
Вцелом, принцип настройки админ класса сходен для всех трех методов, но есть и свои особенности. В простейшем виде метод может выглядеть следующим обарзом:

{% highlight php %}<?php
    protected function configureFormFields(FormMapper $formMapper)
    {
        ...
        $formMapper
            ->add('title', null, array('label' => 'Название'))
        ;
        ...{% endhighlight %}

Мы используем метод add класса FormMapper, чтобы добавить в форму поле для редактирования названия сущности. Первый аргумент &nbsp;- идентификатор поля сущности, второй (чаще всего будет null) - тип поля формы, соната, чаще всего, без проблем определяет тип поля автоматически и подбирает соответствующий тип поля формы, третий - список опции для поля.
<blockquote>Замечу то, что соната позволяет использовать стандартные типы полей формы symfony2, а это дает возможность очень гибко строить кастомные формы. В дальнеших статьях я расскажу о том как сделать свой тип поля, а также расскажу о готовых решениях.</blockquote>
Для связных сущностей, возможно, придется явно указывать тип поля sonata_type_model, у которого есть довольно удобная опция edit =&gt; 'list', позволяющая производить создание и поиск нужной сущности прямо в попапе. Хотя, конечно, на тот момент, когда я использовал эту фишку, она была довольно сырой и было несколько неприятных багов, вроде того, что нужно инициализировать кастомные js скрипты специально для попапа, поэтому я стал использовать немного другое решение, но об этом в другой статье.

Пример поля sonata_type_model с опцией edit =&gt; 'list':

{% highlight php %}<?php
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('title', null, array('label' => 'Название'))
            ->add('subProject', 'sonata_type_model', array('label' => 'Подпроект'), array('edit' => 'list')){% endhighlight %}

Выглядит это примерно так:

<a href="http://fateev.pro/wp-content/uploads/2012/09/Screen-Shot-2012-09-14-at-12.36.01-AM.png"><img class="size-medium wp-image-96 alignleft" title="Screen Shot 2012-09-14 at 12.36.01 AM" src="http://fateev.pro/wp-content/uploads/2012/09/Screen-Shot-2012-09-14-at-12.36.01-AM-300x65.png" alt="" width="300" height="65" /></a>

<a href="http://fateev.pro/wp-content/uploads/2012/09/Screen-Shot-2012-09-14-at-12.37.47-AM.png"><img class="alignnone size-medium wp-image-97" title="Screen Shot 2012-09-14 at 12.37.47 AM" src="http://fateev.pro/wp-content/uploads/2012/09/Screen-Shot-2012-09-14-at-12.37.47-AM-300x126.png" alt="" width="300" height="126" /></a>
<blockquote>Полный список типов полей, доступных в сонате, можно посмотреть в файле сервисов Sonata/AdminBundle/Resources/config/form_types.xml</blockquote>
Метод configureListFields, очень похож на configureFormFields, но в нем есть дополнительный метод addIdentifier, который добавляет не только колонку со значением поля, но и делает эту колонку ссылкой для редактирования сущности, если вы опустите это поле, то просто не сможете отредактировать вашу сущность. Вот пример метода:

{% highlight php %}<?php
    protected function configureListFields(ListMapper $listMapper)
    {
        ...
        $listMapper
            ->addIdentifier('title', null, array('label' => 'Название'))
        ...{% endhighlight %}
<blockquote>Обратите внимание, что в configureFormFields НЕ НУЖНО использовать sonata_type_model, Sonata сама должна определить тип поля и вывести соответствующее значение. Кстати значение связных сущностей выводится из метода __toString(), поэтому если вы выводите связные сущности в списке, этот метод обязателен для реализации</blockquote>
&nbsp;Метод configureDatagridFields немного более сложный, хотя схож с предыдущими. Пример:

{% highlight php %}<?php
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('title', null, array('label' => 'Название'))
        ;
    }{% endhighlight %}

Не смотря на то, что вид метода add такой же, как и прошлых, он в корне отличается от них. Второй параметр - это не тип поля, а тип фильтра, фактически он определяет то, как поле будет фильтроваться в базе. Сам тип поля формы в фильтре, а также его опции - это, соответственно, четвертый и пятый параметры, принцип у них такой же, как и в двух предыдущих методых.
<blockquote>Тип фильтра, по умолчанию, ставьте null, Sonata чаще всего сама легко определяет нужный, но, если что, список доступных типов фильтра можно посмотреть в файле Sonata/DoctrineOMRAdminBundle/Resources/config/doctrine_orm_filter_types.xml</blockquote>
Что касается метода configureRoutes, то его можно использовать, к примеру, чтобы запретить какое либо из действий для сущности:

{% highlight php %}<?php
    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->remove('create');
    }{% endhighlight %}

Данный код запрещает создание новых сущностей. Соната сама скроет все ссылки на создание новой сущности. Более подробно про configureRoutes рассказано <a title="SonataAdminBundle: как добавить произвольную страницу к сущности" href="http://fateev.pro/symfony-sonata/sonataadminbundle-kak-dobavit-proizvolnuyu-stranicu-k-sushhnosti.html">здесь</a>.

В админ классе есть методы-события, связанные с CRUD'ами: prePersist, postPersist, preUpdate, postUpdate, preRemove, postRemove. Эти методы, в качестве единственного аргумента, получают редактируемый/создаваемый нами объект/ В большинстве случаев, этих методов вполне достаточно, чтобы обслужить создание/обновление/удаление объекта.

После того как вы закончите с админ классом и опишите новый сервис, если у вас конфигурация админ бандла по умолчанию, то в dashboard появится новый пункт для редактирования вашей сущности. Это происходит автоматически, соната определяет нужные сервисы по тегу sonata.admin.

Если нужно выводить конкретную структуру админ сервисов в dashboard, то для этого предусмотрена определенная конфигурация админ бандла:

{% highlight yaml %}sonata_admin:
    dashboard:
        groups:
            sonata_user:
                label: Пользователи
                items:
                   - sonata.user.admin.user{% endhighlight %}

sonata.user.admin.user - здесь, соответственно, id сервиса, который попадет в группу, sonata_user произвольный, уникальный идентификатор группы, label - имя группы, которое будет отображаться в dashboard'e

Приведу несколько трюков, которые могут пригодиться:

1. Вывести разный набор полей, в зависимости от того, редактируем мы сущность или создаем

{% highlight php %}<?php
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('Подпроект')
                ->add('title', null, array(
                    'label' => 'Название',
                ))
        ;

        if ($this->getSubject()->getId()) {
            //если мы редактируем объект
            $formMapper->add('description', null, array('label' => 'Описание'));
        }

        $formMapper ->end();{% endhighlight %}

При создании новой сущности Sonata создает пустой объект этой сущности, а при редактировании, получает его из базы. Этот объект мы получаем посредством метода getSubject(), и, если у объект есть id, то значит, что он уже есть в базе, а, следовательно, мы редактируем объект.

Также здесь присутствуют два неупомянутых методы with() и end(). Они позволяют группировать поля в fieldset.

2. Этот же трюк можно использовать, чтобы устанавливать значения полей по умолчанию:

{% highlight php %}<?php
        if (!$this->getSubject()->getId()) {
                $this->getSubject()->setSomeValue($someValue);
        }{% endhighlight %}

3. Для работы с другими сущностями вам может понадобиться получить &nbsp;entityManager:

{% highlight php %}<?php
        $em = $this->getModelManager()->getEntityManager($this->getSubject());{% endhighlight %}
<blockquote>Обратите внимание, что getEntityManager принимает в качестве параметра объект (например тот, который мы редактируем)</blockquote>
4. Соната довольно логично использует шаблонизатор, поэтому переопределить шаблон того или иного action'a (edit, list) довольно просто. Сначала вам необходимо создать шаблон и унаследовать его от сонатовского:

{% highlight php %}\{\% extends 'SonataAdminBundle:CRUD:base_list.html.twig' %}{% endhighlight %}

Затем, в шаблоне переопределите соответствующие блоки. Финальный шаг - указать админ классу, какой шаблон нужно использовать для action'a. Я это делал, вызывая метод setTemplate внутри метода configureFormFields, хотя можно было бы придумать и более изящный способ:

{% highlight php %}    protected function configureFormFields(FormMapper $formMapper)
    {

        $this->setTemplate('edit', 'SonataTemplatesBundle:Default:edit_with_top_actions.html.twig');{% endhighlight %}

Ну вот, думаю на этом все =) надеюсь эта информация будет вам полезна, дерзайте.