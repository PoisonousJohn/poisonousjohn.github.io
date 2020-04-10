---
id: 148
title: 'Sonata Admin Bundle: One-To-Many и sonata_type_collection'
date: 2013-01-21T15:00:44+00:00


guid: http://fateev.pro/?p=148
permalink: /symfony-sonata/sonata-admin-bundle-one-to-many-i-sonata-type-collection.html
dsq_thread_id:
  - "6095480857"
header:
  teaser:  /wp-content/uploads/2013/01/Снимок-экрана-2013-01-21-в-14.52.53.png
categories:
  - Symfony Sonata
tags:
  - php
  - symfony-sonata
  - symfony2
---
На первых порах, в Сонате возникало непонимание того как правильно организовать редактирование связи one-to-many.  На самом деле, есть несколько неочевидных моментов в Сонате, которые могут вызвать проблемы.<!--more-->

Итак, как организовать one-to-many:

1. ORM сущности

{% highlight yaml %}
mac:
    targetEntity: Mac
    mappedBy: device
    cascade: ["all"]
    orphanRemoval: true
{% endhighlight %}

Здесь следует обратить внимание на параметр cascade, который говорит доктрине, что все действия, относящиеся к родителю, должны также влиять на дочерние объекты. Также важен параметр orphanRemove, который облегчит вам жизнь, так как говорит доктрине, что нужно отслеживать объекты, у которых нет привязки к родительскому объекту и удалять их. Это нужно в случаях, когда мы редактируем уже созданную сущность, внутри самой сущности, при редактировании достаточно всего лишь отвязать объект от родительской сущности и доктрина сама удалить его из базы.

2. Сущность

{% highlight php %}
<?php
/**
* @var Application\Ailove\EquipBundle\Entity\Mac
*/
private $mac;

/**
* Construct
*/
public function __construct()
{
    $this->mac = new \Doctrine\Common\Collections\ArrayCollection();
}

/**
* Set mac
*
* @param Doctrine\Common\Collections\ArrayCollection $mac
*/
public function setMac($mac)
{
    if (!$mac) {
        $this->mac = new \Doctrine\Common\Collections\ArrayCollection();
        return;
    }

    foreach ($mac as $item) {
        $item->setDevice($this);
    }

    foreach ($this->getMac() as $item) {
        if (!$mac->contains($item)) {
            $this->getMac()->removeElement($item);
            $item->setDevice(null);
        }
    }

    $this->mac = $mac;
}

/**
* Add mac
*
* @param Application\Ailove\EquipBundle\Entity\Mac $mac
*/
public function addMac(\Application\Ailove\EquipBundle\Entity\Mac $mac)
{
    $mac->setDevice($this);
    $this->mac[] = $mac;
}

/**
* Remove mac
*
* @param Application\Ailove\EquipBundle\Entity\Mac $mac
*/
public function removeMac(\Application\Ailove\EquipBundle\Entity\Mac $mac)
{
    $this->getMac()->removeElement($mac);
    $mac->setDevice(null);
}

/**
* Get mac
*
* @return Doctrine\Common\Collections\Collection
*/
public function getMac()
{
    return $this->mac;
}
{% endhighlight %}
Здесь нужно обратить внимание, что в первую очередь в one-t0-many поля должны быть обязательно представлены ArrayCollection, для этого нужно добавить соответствующую строчку в конструкторе. Соната требует наличия add и remove методов для свойства, в которых через методы сущности нужно осуществлять привязку или отвязку дочерних объектов, благодаря orphanRemoval доктрина сама определит когда нужно удалять отвязанный объект.

3. configureFormFields

Внутри админ класса следует добавить следующее поле:

{% highlight php %}
<?php
$formBuilder->add('mac', 'sonata_type_collection',
    array('required' => false, 'by_reference' => false),
    array('edit' => 'inline', 'inline' => 'table')
);
{% endhighlight %}

На этом, собственно все. В конечном счете, one-to-many будет выглядеть примерно таким образом:

<a href="http://fateev.pro/wp-content/uploads/2013/01/Снимок-экрана-2013-01-21-в-14.52.53.png"><img class="alignnone size-medium wp-image-150" title="Снимок экрана 2013-01-21 в 14.52.53" src="http://fateev.pro/wp-content/uploads/2013/01/Снимок-экрана-2013-01-21-в-14.52.53-300x93.png" alt="" width="300" height="93" /></a>