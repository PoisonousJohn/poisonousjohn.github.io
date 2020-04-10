---
id: 136
title: 'Symfony2: Event system'
date: 2013-01-13T19:11:44+00:00


guid: http://fateev.pro/?p=136
permalink: /php/symfony2-event-system.html
dsq_thread_id:
  - "6095492892"
header:
  teaser:  /wp-content/uploads/2013/01/PublishSubscribeSolution.gif
categories:
  - PHP
  - Symfony2
---
Недавно в очередной раз столкнулся с задачей ведения рейтинга пользователя и решил ее немного абстрагировать и сделать отдельный бандл. На проекте возникла необходимость кэширвать текущее значение очков пользователя. Для управления запиями рейтинга у меня есть отдельный сервис - RatingManager. Так как система управления записями о рейтинге централизована посредством этого менеджера, то для слежения за изменением очков пользователя я решил внедрить в бандл использование событий.

<!--more-->

Итак, в чем заключается идея системы событий? В общих чертах, все похоже на паттерн Publisher/Subscriber:

<a href="http://fateev.pro/wp-content/uploads/2013/01/PublishSubscribeSolution.gif"><img class="alignnone size-full wp-image-138" title="Publisher/Subscriber pattern" src="http://fateev.pro/wp-content/uploads/2013/01/PublishSubscribeSolution.gif" alt="" width="504" height="330" /></a>

Все довольно просто, рассмотрим это на примере symfony2:
<ol>
	<li>Диспетчер событий (Symfony\Component\EventDispatcher\EventDispatcher)&nbsp;- &nbsp;выступает в роли Publisher'a, отвечает за транслирование этих событий на всю систему, можно сказать, посылает broadcast message с событием</li>
	<li>Событие (Symfony\Component\EventDispatcher\Event)&nbsp;- это и есть событие, которое мы будем транслировать, если рассматривать на примере картинки с паттерном, то это Address Changed</li>
	<li>Слушатель или Подписчик (Listener/Subscriber) - это сервис, который мы подписываем на конкретное событие. Если верить stackoverflow, то единственное значимое различие между этими двумя сервисами, это то что Слушатель подписывается на статичное событие посредством описания сервиса в конфиге, подписчик же может быть динамически подписан на событие в ходе выполнения приложения. &nbsp;</li>
</ol>
Теперь на конкретном примере задачи с рейтингом: посредством RatingManager'a мы каким либо образом меняем рейтинг пользователя, в свою очередь RatingManager транслирует событие, мол "Рейтинг изменен", далее мы создаем Listener для этого события и выполняем нужные нам действия.

Теперь рассмотрим все по компонентам системы:
<h4>1. Event</h4>
Рассмотрим класс события&nbsp;RatingUpdatedEvent:

{% highlight php %}<?php
namespace Ailove\RatingBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use Ailove\RatingBundle\Entity\RatingEntry;

class RatingUpdatedEvent extends Event
{

    /**
     * @var RatingEntry
     */
    protected $entry;

    /**
     * @var int
     */
    protected $score;

    function __construct(RatingEntry $entry, $score)
    {
        $this->entry = $entry;
        $this->score = $score;
    }

    /**
     * @return \Ailove\RatingBundle\Entity\RatingEntry
     */
    public function getEntry()
    {
        return $this->entry;
    }

    /**
     * @return int
     */
    public function getScore()
    {
        return $this->score;
    }

}{% endhighlight %}

Ничего сложного, просто сохраняю нужную мне информацию, чтобы потом в Listener'e выполнить нужные манипуляции с данными, в т.ч. сохранить количество очков пользователя.
<h4>2. Event Wrapper</h4>
При транслировании события через диспетчер, мы должны указывать id события, событий может быть много, мы можем менять их id в процессе рефакторинга, поэтому я решил их обернуть в отдельный класс RatingEvents

{% highlight php %}<?php

namespace Ailove\RatingBundle\Event;

class RatingEvents
{
    /**
    * The rating.updated event is thrown each time user got
    * new rating entry.
    *
    * The event listener receives an
    * Ailove\RatingBundle\Event\RatingChangedEvent instance.
    *
    * @var string
    */
    const RATING_UPDATED = 'rating.updated';
}{% endhighlight %}

Данный идентификатор используется в методе dispatch диспетчера событий, а также используется в описании сервиса Listener'a чтобы указать какое событие ему нужно слушать.
<h4>3. RatingManager</h4>
Все компоненты для транслирования события готовы. Для менеджера рейтинга приведу только часть кода, посылающую событие:

{% highlight php %}<?php
class RatingManager
{
    /**
     * @var \Symfony\Component\EventDispatcher\EventDispatcherInterface
     */
    protected $dispatcher;

    public function __construct(\Symfony\Component\DependencyInjection\ContainerInterface $container, $security)
    {
        ...
        $this->dispatcher = $container->get('event_dispatcher');
        ...
    }

    public function registerEvent($event, $entity = null, $userId = false)
    {
        ...
        $event = new \Ailove\RatingBundle\Event\RatingUpdatedEvent($entry, $score);

        $this->dispatcher->dispatch(\Ailove\RatingBundle\Event\RatingEvents::RATING_UPDATED, $event);
        ...
    }{% endhighlight %}

Здесь стоит обратить внимание на строчку&nbsp;&nbsp;$this&minus;&gt;dispatcher&nbsp;=&nbsp;$container&minus;&gt;get('event_dispatcher'), мне пришлось потратить некоторое время чтобы выяснить, что в symfony все таки есть общесистемный диспетчер событий, в документации я не нашел ни слова про него.

Далее по коду внутри метода registerEvent я создаю новое событие, которое унаследовал от базового класса Event, добавив к нему некую свою, нужную информацию, а затем посредством диспетчера я транслирую это событие системе с идентификатором RATING_UPDATED.
<h4>4. Listener</h4>
Последнее, что я сделал, это написал для всего этого Listener:

{% highlight php %}<?php

namespace Dom\RoadmapBundle\Listener;

use FOS\UserBundle\Model\UserManagerInterface;
use Symfony\Component\Security\Core\SecurityContextInterface;

class RatingListener
{
    /**
     * @var \FOS\UserBundle\Model\UserManagerInterface
     */
    protected $manager;

    /**
     * @var SecurityContextInterface
     */
    protected $security;

    function __construct(UserManagerInterface $manager, SecurityContextInterface $security)
    {
        $this->manager = $manager;
        $this->security = $security;
    }

    public function onRatingUpdate(\Ailove\RatingBundle\Event\RatingUpdatedEvent $event)
    {
        /**
         * @var \Application\Sonata\UserBundle\Entity\User $user
         */
        $user = $this->security->getToken()->getUser();

        $user->setScore($event->getScore());
        $this->manager->updateUser($user);
    }

}{% endhighlight %}

И описание сервиса Listener'a:

{% highlight yaml %}    ailove.rating.update.listener:
        class: Dom\RoadmapBundle\Listener\RatingListener
        arguments: ["@fos_user.user_manager", "@security.context"]
        tags:
            - { name: kernel.event_listener, event: rating.updated, method: onRatingUpdate }{% endhighlight %}

Посредством тегов мы сообщаем symfony, что наш сервис - это Listener (name:&nbsp;kernel.event_listener), что он слушает событие rating.updated (мы использовали этот идентификатор выше) и что при получении этого события сервис должен запускать метод onRatingUpdate, который в качестве аргумента получит событие. А далее, используя данные внутри события я обновляю данные пользователя.