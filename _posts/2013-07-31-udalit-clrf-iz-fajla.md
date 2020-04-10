---
id: 219
title: Удалить CLRF из файла
date: 2013-07-31T12:20:55+00:00


guid: http://fateev.pro/?p=219
permalink: /dev-tools/udalit-clrf-iz-fajla.html
dsq_thread_id:
  - "6095498545"
header:
  teaser:  /wp-content/uploads/2013/07/windows-8-fail.jpeg
categories:
  - Dev tools
tags:
  - tools
  - unix
  - useful
  - xcode
---
<a href="http://fateev.pro/wp-content/uploads/2013/07/windows-8-fail.jpeg"><img src="http://fateev.pro/wp-content/uploads/2013/07/windows-8-fail-300x200.jpeg" alt="" title="windows-8-fail" width="300" height="200" class="alignleft size-medium wp-image-222" /></a>
Не так часто сталкиваюсь с файлами в windows кодировках, но бывает, и наличие в них некорректных переносов жутко раздражает, XCode, например, от таких переносов вообще сходит с ума и показывает ошибки не на тех строках. Удалить CLRF поможет простая команда:

{% highlight bash %}
cat file | tr -d '\015' > file
{% endhighlight %}