---
id: 382
title: 'Unity 4.6.x doesn&#8217;t show up when opening large projects, is it alive?'
date: 2016-12-19T16:13:54+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=382
permalink: /gamedev/unity/unity-4-6-x-doesnt-show-up-when-opening-large-projects-is-it-alive.html
vkapi_comments:
  - "1"
vkapi_buttons:
  - "1"
dsq_thread_id:
  - "6112960687"
image: /wp-content/uploads/2016/12/977b0ce93a4099143e64ae932e905dc0_e7cdc06072836c64f441c5014ad641f5.jpg
categories:
  - Unity
tags:
  - OSX
  - unity
---
<a href="http://fateev.pro/wp-content/uploads/2016/12/977b0ce93a4099143e64ae932e905dc0_e7cdc06072836c64f441c5014ad641f5.jpg" rel="attachment wp-att-383"><img class="alignleft size-full wp-image-383" src="http://fateev.pro/wp-content/uploads/2016/12/977b0ce93a4099143e64ae932e905dc0_e7cdc06072836c64f441c5014ad641f5.jpg" alt="977b0ce93a4099143e64ae932e905dc0_e7cdc06072836c64f441c5014ad641f5" width="300" height="195" /></a>Due to single-threaded approach of Unity editor of version 4.x, when opening large project first time, Unity launches importing of files, yet doesn't show anything on screen. Also CPU activity keeps at low rate.  On Mac OS X it is possible to track Unity's background activity when it is reading files using following command:

`sudo fs_usage | grep Unity | grep /`

This command shows which files are being opened by Unity at the time. This should give you enough information on its current activity and make a rough estimation of process complete time.