---
id: 127
title: 'Genemu jquerydate: Как удалить native datepicker chrome browser`a'
date: 2012-12-26T14:57:32+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=127
permalink: /symfony2/genemu-jquerydate-kak-udalit-native-datepicker-chrome-browser-a.html
dsq_thread_id:
  - "6095492138"
categories:
  - Symfony2
tags:
  - genemu
  - php
  - symfony2
---
Столкнулся с проблемой, что когда используешь genemu jquerydate тип, то хром подставляет свой дейтпикер в поле, что абсолютно неприемлемо. Это происходить потому что jquerydate выводить дату в input с type = date. Решить проблему можно довольно просто: нужно указать формат даты:

{% highlight php %}<?php
    $formBuilder->add('availableSince', 'genemu_jquerydate', array('label' => 'Доступен с', 'format' => 'dd.MM.y', 'widget' => 'single_text'));{% endhighlight %}