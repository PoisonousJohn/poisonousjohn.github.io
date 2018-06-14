---
id: 306
title: Facebook iOS SDK FBSession release message sent to deallocated object
date: 2014-05-19T10:25:00+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=306
permalink: /chronicles/facebook-ios-sdk-fbsession-release-message-sent-to-deallocated-object.html
dsq_thread_id:
  - "6113015115"
image: /wp-content/uploads/2014/05/67a6bfe5cb2.png
categories:
  - ObjectiveC
  - Хроники
tags:
  - Crash
  - Facebook
  - iOS
  - ObjectiveC
  - SDK
---
<p><a href="http://fateev.pro/wp-content/uploads/2014/05/67a6bfe5cb2.png"><img class="alignleft size-medium wp-image-307" style="margin-right: 50px;" title="67a6bfe5cb2" src="http://fateev.pro/wp-content/uploads/2014/05/67a6bfe5cb2-300x300.png" alt="" width="300" height="300" /></a>Каким-то необычайно странным образом столкнулся со следующей проблемой:</p><ol><li>Запускаем приложение</li><li>Запрашиваем права на publish_actions</li><li>Даем отказ в правах</li><li>Перезапускаем приложение</li><li>Получаем crash на objc_release (двойной релиз)</li></ol><p>Включив Enable Zombie Objects, локализовал проблему:</p><blockquote><p>[FBSession release] message sent to deallocated instance</p></blockquote><p>В проекте выключен ARC, код брал из документации FB. Покопавшись еще немного (и приняв во внимание, что, скорее всего, FBSession релизится при logout) нашел функцию, которая приводила к крашу:<br /> {% highlight c++ %}{% endhighlight %}</p><p>void IOSFacebook::logout() {<br /> [FBSession.activeSession closeAndClearTokenInformation];<br /> [FBSession.activeSession close];<br /> // [FBSession setActiveSession:nil]; Эта строчка вызывала краш</p><p>token.clear();</p><p>refreshAccount();<br /> }</p><p>&nbsp;</p><p>Не знаю что конкретно вызывало краш, обозначенная строчка ничего криминального не делала, но закомментив ее, все заработало</p>