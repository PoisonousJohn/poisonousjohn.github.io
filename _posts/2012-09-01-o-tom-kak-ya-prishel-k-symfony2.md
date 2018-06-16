---
id: 47
title: О том, как я пришел к Symfony2
date: 2012-09-01T23:44:44+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=47
permalink: /chronicles/o-tom-kak-ya-prishel-k-symfony2.html
dsq_thread_id:
  - "6095534844"
image: /wp-content/uploads/2012/09/logo_symfony_header.png
categories:
  - Хроники
tags:
  - framework
  - php
  - symfony-sonata
  - symfony2
---


<a href="http://fateev.pro/wp-content/uploads/2012/09/logo_symfony_header.png"><img class="size-full wp-image-49 alignleft" title="logo_symfony_header" src="http://fateev.pro/wp-content/uploads/2012/09/logo_symfony_header.png" alt="" width="240" height="60" /></a>Это что-то вроде вступительного слова, а также первый из серии постов про мой инструментарий, про те вещи с которыми я работаю.

За всю свою не очень долгую карьеру программиста, на чем только я не пробовал кодить. Начиналось все безобидно, в колледже, я захотел сделать свою персональную страничку, тогда это считалось круто, все дела. И я потихоньку начал гуглить на тему, как же это все делается. В то время, как раз, web стремительно развивался и PHP имел широкое распространение.&nbsp;

Потихоньку, полегоньку, я начал разбираться что к чему с HTML, затем освоил PHP на базовом уровне, и начал творить. Мои потуги были замечены со стороны и меня взяли на должность лаборанта в аудиторию, где проводились все лекции по информационным технологиям и программированию.

Там у меня было много времени на то, чтобы освоиться с PHP. Помимо задач по администрированию рабочих тачек и линуксового сервера, я занялся разработкой электронного тестирования на PHP, а также локального сайта для проведения лабораторных работ.

По мере своего развития я рефакторил код, и, наверное, прошел все этапы развития самого программирования, начиная с процедурного подхода и заканчивая ООП.&nbsp;

Когда я все таки закончил колледж, решил поставить жизнь с ног на голову, и дать деру в Москву, я думал что знаю PHP, ООП, и даже SQL (на счет последнего, я все же сомневался, но думал что знаю нелпохо), я даже начал читать про паттерны проектирования и пробовать свои силы с Zend Framework (я только совсем недавно узнал что такое фреймворки и что для PHP есть оные), но мои надежды жестоко обломали на первом же собеседовании, вопросами как раз на тему SQL. К следующему собеседованию я немного подтянулся в SQL, правда чисто в теоретической части. Мне повезло и на собеседовании по SQL были те же вопросы, поэтому я его прошел, и мне повезло даже дважды, потому что я устроился в компанию своей мечты =)

Итак, выйдя первый день на работу на меня свалилась вся тяжесть трудовыебудней, сразу же сказали выносить какой-то проект на ПРО (черт возьми! что такое ПРО? я тогда понятия не имел), но с помощью коллеги я все же справился с задачей. В компании на то время использовалась своя CMS, которая была чем-то средним между CMS и фреймворком. Коллега тогда поразился, что я довольно быстро въехал в их CMS'ку, но здесь роль сыграло то, что я был немного знаком с Zend Framework. Вообще, &nbsp;я был уверен что в этой компании используется какой-нибудь известный фреймворк, но оказалось - это совсем не так.

Признаться, я представлял что такое MVC, но на деле никогда им не пользовался, и первым опытом MVC для меня стал именно CMS нашей компании. По сравнению с тем, что я делал раньше (считай Plain PHP) было очень приятно пользовать все преимущества MVC и я был всем доволен. Я набирался опыта, получая довольно сложные задачи, изучал новые технологии, сильно вникал во всю мощь ООП (кстати особенно полезно для понимания было изучение Java), и в ходе обсуждения с коллегами, зашла тема о фреймворках, и мы выдвинули предложение нашему техническому директору перейти на один из фреймворков.&nbsp;

Предложение было спонтанно, и мы все тогда думали, что переход будет долгоми, и все это будет еще не скоро, но, тем не менее, стали рассматривать варианты фреймворков, среди которых были: Zend, Yii, Kohana и Symfony2. Мы рассмотрели каждый из них, пытались сравнивать, но таки пришли к выводу, что чтобы оценить фреймворк, надо сделать проект на нем, тогда все станет ясно, насколько хорош фреймворк на практике. Начальство решило, что выбор должен быть между Symfony2 и Yii (хотя я был за Zend), и мы решили сделать проект для начала на Symfony2.

Стоит заметить, что Symfony2 тогда только зарелизилась, и по сравнению с symfony первой, там были кардинальные отличия, symfony2 заслужила наше внимание благодаря активному коммьюнити, но на практике оказалось, что сам фреймворк после релиза был довольно сырым и набор бандлов был довольно скудным.

Для нас проблемой стал выбор админогенератора. На то время было их было всего два достойных: Admingenerator и Sonata. Исследования по их выбору проводил не я, мой коллега, и он сказал что Admingenerator более гибкий, но там многое нужно дописывать, а Sonata не такая гибкая, но там довольно много фишек идет в стандартном функционале, но все-таки она довольно сырая.

Когда до меня дошла очередь делать проект на Symfony2, я все же решил что будем использовать Sonata, потому что мне не хотелось изобретать велосипед и писать то, что уже есть. Вариант, что нужно сделать свой админогенератор не рассматривался ввиду того, что команда, работавшая над сонатой, гораздо больше, и на порядок дольше занимаются этим делом, поэтому изобретать второй велосипед точно не хотелось. Пришлось разбираться с тем, что есть.

И я скажу вам, что разбираться с Сонатой было нелегко, почти полное отсутствие ПОЛНОЙ документакции, только скудные крохи, что были на их сайте, большинство вещей приходилось узнавать, просто копая код. &nbsp;Были и плюсы: такой подход мне стал настолько привычен, что я смело лезу в самые дебри чужого кода, дабы узнать то, что мне нужно.&nbsp;Я долго матерился на сонату и симфони (у которой были просто нереальные проблемы с обратной совместимостью), но с каждым обновлением дела становились все лучше и лучше.

Отдельный геморроем было для меня - разобраться с Doctrine2, особенно, если учитывать, что ранее я с ORM не имел дела никогда. Въехал в принцип работы я не сразу, но в целом мне понравилось,<del> хотя я и считаю что ORM менеджеры не позволяют НОРМАЛЬНО сделать некоторые простые вещи, вроде агрегирования данных, и в таких случаях приходится извращаться, правда, радует, что такое бывает довольно редко</del>.

<strong>UPD</strong>: Спасибо Максиму, посмотрел более подробно доки, попробовал немного перестроить запросы и добился того что надо безо всяких проблем.&nbsp;

Я думаю, если бы Symfony2 был бы немного постарше, то проблем с ним совсем не возникало бы, за полгода фреймворк динамично развивался, появлялось все больше команд, которые разрабатывали интересные и полезные бандлы. Меня порадовала сервисная архитектура фреймворка, модель с бандлами и сам паттерн dependency injection. Благодаря Symfony2 я узнал что такое социальный кодинг и github. Я абсолютно не жалею, чтоб выбрал этот фреймворк, а также не жалею что выбрал Sonata'у в качестве админогенератора, потому что разобравшись с ней, я перестал запариваться над тем, что и как сделать, забыть про реализацию CRUD, а кастомные формы стало делать явно легче.

Сейчас я делаю внутренний проект компании, который целиком и полностью сделан на сонате, то есть пользовательской части там вообще нет.

Из плюсов Symfony2 отмечу:
<ul>
	<li>Мощнейшая security система, поддерживающая роли, ACL на уровне классов, объектов и даже полей объектов (мне можете поверить, проект, которым я занимаюсь на данный момент предъявляет ОСОБЫЕ требования к системе ролей и доступа в целом)</li>
	<li>Приличный набор бандлов (правда пока что не так много качественных бандлов, ибо фреймворк относительно молодой)</li>
	<li>Вы можете использовать каждый из компонент фреймворка в отдельности (например интегрировать часть фреймворка в существующий проект)</li>
	<li>Интеграция с ORM менеджерами</li>
	<li>Легкая интеграция с NoSQL</li>
	<li>Сервисная архитектура</li>
	<li>Интеграция с composer</li>
</ul>
Из минусов:

Столкнулся с задачей разграничения доступа по ролям, причем организовать его нужно довольно гибко, но в symfony2 большинство конфигов лежат в файлах, которые кэшатся, вынести конфигурацию таких важных вещей как иерархия ролей можно, но для этого нужно будет дополнительно заморачиваться, что явно не с руки.&nbsp;