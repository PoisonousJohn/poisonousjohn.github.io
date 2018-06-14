---
id: 99
title: 'SonataAdminBundle: как добавить произвольную страницу к сущности'
date: 2012-09-14T01:33:24+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=99
permalink: /symfony-sonata/sonataadminbundle-kak-dobavit-proizvolnuyu-stranicu-k-sushhnosti.html
dsq_thread_id:
  - "6095488605"
categories:
  - Symfony Sonata
tags:
  - php
  - symfony-sonata
  - symfony2
---
У меня часто возникает необходимость добавлять произвольные страницы (например для ajax'a), связанные с конкретной сущностью, или для целого класса сущностей.<!--more-->

Добавление страницы начинается с добавления роута в админ классе. За это отвечает метод configureRoutes:

{% highlight php %}<?php
    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->add('members', $this->getRouterIdParameter() . '/members');
        $collection->add('getProjects');
    }{% endhighlight %}

В примере я рассмотрел два случая:
<ol>
	<li>Роут привязан к конкретной сущности, о чем свидетельствует наличие метода $this-&gt;getRouterIdParameter() в роуте, на место которого будет подставлен id сущности, в итоге на страницу можно будет попасть по роуту вида bla/bla/12/members</li>
	<li>Роут привязан не к конкретной сущности, а к админ классу, на страницу можно попасть по роуту вида bla/bla/getProjects</li>
</ol>
<div>Далее в дело вступает контроллер для админ класса, в котором необходимо добавить соответствующий action:</div>
<div>

{% highlight php %}<?php
    public function membersAction($id = null)
    {
        $id = $this->get('request')->get($this->admin->getIdParameter());

        $object = $this->admin->getObject($id);

        if (!$object) {
            throw new NotFoundHttpException(sprintf('unable to find the object with id : %s', $id));
        }
        ...
    }

    public function getProjectsAction()
    {

        $choice = array();

        ...

        return $this->renderJson($choice);

    }{% endhighlight %}

Первый action предназначен для работы с конкретной сущностью, пример получения самой сущности взят из стандартного editAction().

Второй action предназначен для вывода json, к счастью в сонате предусмотрен соответствующий метод.
<blockquote>Напомню, что контроллер указывается в аргументах, в описании сервиса админ класса. Более подробно об этом я писал в <a title="Архитектура Sonata Admin Bundle" href="http://fateev.pro/symfony-sonata/arxitektura-sonata-admin-bundle.html">другой статье</a>.</blockquote>
&nbsp;Ну и последний шаг - создание шаблона для страницы. Если страницы без кастомного дизайна, и вы намерены придерживаться общего стиля Sonata, то вам необходимо унаследовать стандартный шаблон сонаты:

{% highlight php %}\{\% extends 'SonataAdminBundle:Core:dashboard.html.twig' %}

\{\% block content%}
      blabla
\{\% endblock%}{% endhighlight %}

Разумеется, вы можете свободно переопределять такие блоки как javascripts и stylesheets.

На этом вроде все =)

</div>
<div>&nbsp;</div>