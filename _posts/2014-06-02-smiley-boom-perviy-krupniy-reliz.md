---
id: 301
title: 'Smiley Boom &#8211; первый крупный релиз'
date: 2014-06-02T12:52:50+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=301
permalink: /chronicles/smiley-boom-perviy-krupniy-reliz.html
dsq_thread_id:
  - "6119440949"
image: /wp-content/uploads/2014/04/smileyBoom.png
categories:
  - Хроники
tags:
  - gamedev
  - mobile
---
<a href="http://fateev.pro/wp-content/uploads/2014/04/smileyBoom.png"><img class="alignleft  wp-image-302" title="smileyBoom" src="http://fateev.pro/wp-content/uploads/2014/04/smileyBoom-300x300.png" alt="" width="180" height="180" /></a>

Мы наконец-то зарелизили нашу игру <a href="http://www.game-insight.com/ru/games/smiley-boom">Smiley Boom</a>:

<a href="https://apps.facebook.com/smiley_boom/">Facebook</a>

<a href="https://itunes.apple.com/ru/app/smiley-boom/id798708455">iOS</a>

Что хочу заметить:
<ul>
	<li>Реализация внутриигровых покупок (IAP) заняла больше недели ( хотя я планировал значительно меньше ), это обусловлено тем, что очень много нестандартных вариантов с потерей соединения и прочего, а так же с наличием у нас механики акций.</li>
	<li>Кучу сложностей сейчас создает режим частичного онлайна, то есть когда только часть функционала требует полного онлайна - все остальное доступно в оффлайне. Кучу данных приходится слать очередью, пачками при выходе в онлайн.</li>
	<li>Забавный факт: Игровая механика была уже готова несколько месяцев назад, много времени ушло на реализацию интеграции с соц. сетями (в нашем случае пока что только Facebook), интеграцию с различными маркетинговыми SDK и прочими подобными вещами.</li>
	<li>Много вещей после релиза придется переделывать, так как эти вещи сейчас сделаны на скорость, нежели на качество</li>
	<li>Народ в команду лучше набирать задолго до релиза</li>
	<li>Match3 игра, вопреки общему мнению, это не пустяк (особенно когда игра включает в себя много механик) , и на данный момент срок разработки приближается к отметке 1 год (хотя команда изначально была очень небольшой)</li>
	<li>В ходе разработки игры интерфейс (дизайн) менялся 3 раза (это далеко не предел), а игровая механика 2 раза.</li>
	<li>Достаточно много времени ушло на проработку системы адаптации к разрешениям экрана ( и его повороту ) - очень важная фича (поворот экрана в итоге не вошел в первый релиз)</li>
	<li>Многие вещи до сих пор совсем не оптимизированы</li>
	<li>Не стоит писать "свой фреймворк" для игры, либо давать это делать людям, которые в этом имеют опыт и понимают что делают</li>
	<li>Тутор не вошел в первый релиз</li>
	<li>Локализация не планировалась заранее, тем не менее, мы быстро ее прикрутили (правда исключая азиатские языки)</li>
	<li>Достаточно много времени занимает интеграция всяких SDK для маркетинговых целей, типа Flurry, Mobile App Tracking и прочего хлама, которые, по большей части, собирают одни и те же данные (и мы до сих пор интегрировали не все SDK, и не все функции)</li>
</ul>
<div></div>
<div>Из технологий:</div>
<div>
<ul>
	<li>Сейчас работа с сервером организована посредством классического REST API, в процессе переход на socket'ы.</li>
	<li>Основной формат общений с сервером JSON</li>
	<li>Большинство файлов конфигурации XML</li>
	<li>Локальное хранилище данных SQLite</li>
	<li>Для сетевых запросов используется cURL</li>
	<li>Графика рисуется OpenGL ES 2.0 собственным движком (о Боже, за что?)</li>
	<li>Почти все написано на C++, исключая платформозависимые части</li>
</ul>
<div>Хочу пожаловаться на последние две недели перед релизом. Коротко говоря - это трындец. Я работал в среднем по 14 часов в сутки, без выходных. И все равно мы не успели к обозначенной дате релиза.</div>
</div>
<div></div>
<div>To be continued...</div>
&nbsp;