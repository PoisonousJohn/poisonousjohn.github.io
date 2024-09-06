---
id: 201
title: Установка Boost на Mac OS X
date: 2013-05-28T12:50:57+00:00


guid: http://fateev.me/?p=201
permalink: /c_plus_plus/ustanovka-boost-na-mac-os-x.html
dsq_thread_id:
  - "6095032898"
header:
  teaser:  /wp-content/uploads/2013/05/boost.png
categories:
  - C++
tags:
  - boost
  - c++
---
<a href="http://fateev.me/wp-content/uploads/2013/05/boost.png"><img class="alignleft size-full wp-image-202" title="boost" src="http://fateev.me/wp-content/uploads/2013/05/boost.png" alt="" width="277" height="86" /></a> Руки наконец дошли до <strong>boost</strong>. Самый простой способ поставить boost, на мой взгляд, это через mac ports, выполнив команду:

<strong>sudo port install boost</strong>

После установки все заголовки можно найти в <strong>/opt/local/include/boost</strong>

После чего, открываем XCode, в Build Settings находим секцию <strong>Search Paths </strong>и прописываем в <strong>Header Search Paths </strong>значение <strong>/opt/local/include</strong> с опцией non-recursive. Теперь можно использовать всю мощь библиотеки. Подключить файл можно следующим образом:

<strong>#include &lt;boost/array.hpp&gt;</strong>

Кстати, в моем случае (при использовании cocos2d-x) еще пришлось добавлять эту строчку последней, чтобы не было конфликтов с библиотеками самого кокоса