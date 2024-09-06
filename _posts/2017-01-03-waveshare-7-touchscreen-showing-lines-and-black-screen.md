---
id: 389
title: 'Waveshare 7&#8243; touchscreen showing lines and black screen'
date: 2017-01-03T15:14:30+00:00


guid: http://fateev.me/?p=389
permalink: /iot/waveshare-7-touchscreen-showing-lines-and-black-screen.html
vkapi_comments:
  - "1"
vkapi_buttons:
  - "1"
dsq_thread_id:
  - "6094488106"
header:
  teaser:  /wp-content/uploads/2017/01/7inch-HDMI-LCD-B_l.jpg
categories:
  - IoT
  - Raspberry Pi
tags:
  - IoT
  - Raspberry Pi
---
<a href="http://fateev.me/wp-content/uploads/2017/01/7inch-HDMI-LCD-B_l.jpg" rel="attachment wp-att-390"><img class="alignleft wp-image-390 size-full" src="http://fateev.me/wp-content/uploads/2017/01/7inch-HDMI-LCD-B_l.jpg" alt="Waveshare touchscreen 7inch" width="300" height="225" /></a>I've recently bought a waveshare 7 inch touchscreen, which didn't work out of the box. It comes with custom raspbian image, which isn't handy because you can't upgrade so easily. So actually this display is able to work on stock raspbian with slight modifications to config.txt as you can see below.

{% highlight config %}
# set current over USB to 1.2A
max_usb_current=1

# overscan to adjust image position
overscan_left=0
overscan_right=0
overscan_top=0
overscan_bottom=0

# HDMI config
hdmi_drive=1
hdmi_ignore_edid=0xa5000080
hdmi_group=2
hdmi_mode=87

# 1024x600 display
hdmi_cvt=1024 600 60 3 0 0 0
{% endhighlight %}

Also I couldn't get touch capabilities working on Raspberry Pi, yet touch worked on Ubuntu. So I've made a fork of a driver I found on github: https://github.com/JohnPoison/waveshare-7inch-touchscreen-driver . And added support for right button on hold and scroll by two fingers.

<script src="https://gist.github.com/JohnPoison/ed544f07da72568fc60074a4566560b8.js"></script>