---
id: 89
title: StatusMapBundle
date: 2012-09-06T23:05:45+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=89
permalink: /chronicles/statusmapbundle.html
dsq_thread_id:
  - "6095488127"
categories:
  - Хроники
---


В рамках своего проекта начал работать над бандлом, который предоставит возможности для реализации карты статусов с привязкой к роли. За основу взята модель статусов в Redmine.

Сам статус будет обладать полями:
<ul>
	<li>системное имя</li>
	<li>имя</li>
	<li>флаг "по умолчанию"</li>
	<li>тип статуса</li>
</ul>
<div>Тип статуса - отдельная сущность с системным и обычным именами.</div>
<div>&nbsp;</div>
<div>Таким образом, в рамках одного бандла, в проект можно будет интегрировать централизованную систему статусов и, собственно, саму карту статусов.</div>
Бандл будет включать в себя админ классы Sonata для редактирования сущностей и самой карты статусов, и будет включать в зависимости <a title="Genemu Form Bundle" href="http://fateev.pro/symfony-sonata/genemu-form-bundle.html">genemu form bundle</a>