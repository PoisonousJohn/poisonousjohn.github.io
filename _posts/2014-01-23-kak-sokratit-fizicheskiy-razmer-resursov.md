---
id: 286
title: Как сократить физический размер ресурсов
date: 2014-01-23T17:25:47+00:00


guid: http://fateev.pro/?p=286
permalink: /gamedev/kak-sokratit-fizicheskiy-razmer-resursov.html
dsq_thread_id:
  - "6101654417"
header:
  teaser:  /wp-content/uploads/2014/01/archive.png
categories:
  - Gamedev
tags:
  - gamedev
  - OpenGL
  - python
  - tools
  - useful
---
<a href="http://fateev.pro/wp-content/uploads/2014/01/archive.png"><img class="alignleft size-full wp-image-291" title="archive" src="http://fateev.pro/wp-content/uploads/2014/01/archive.png" alt="" width="256" height="256" /></a>Обычно больше всего места занимают текстуры. Мы использовали до этого исключительно PNG, а он достаточно много весит. Распространенный хак состоит в том, чтобы разделить <strong>PNG</strong> на два <strong>JPG'a</strong> или на <strong>JPG</strong> + <strong>PNG</strong>, в первом файле будут храниться <strong>RGB</strong> каналы, а во втором только маска. Это позволит сильно уменьшит физический размер файлов (у нас вышло более чем в 2 раза, при качестве JPEG = 95).

Для разбиения текстур из <strong>PNG</strong> на два <strong>JPG</strong> я написал небольшой скриптик на python'e, который кладет рядом два файла.jpg_alpha.jpg, а оригинальный.png удаляет:

{% highlight python %}
#!/usr/bin/python

import os, fnmatch
import Image
import argparse
import ntpath
import ImageFile

ImageFile.MAXBLOCK = 2048*2048# default is 64k

def splitImage(filename):
    print 'splitting %s\n' % png
    originalImage = Image.open(filename)
    baseName = ntpath.splitext(filename)[0]
    originalImage.save(baseName + '.jpg', 'JPEG', quality=95, optimize = True)

    if len(originalImage.getbands()) == 4:
        ir, ig, ib, ia = originalImage.split()
        alphaImage = Image.merge("RGB", (ia, ia, ia));
        alphaImage.save(baseName + '_alpha.jpg', 'JPEG', quality=90)

    os.remove(filename)


def locate(pattern, root=os.curdir):
    for path, dirs, files in os.walk(os.path.abspath(root)):
        for filename in fnmatch.filter(files, pattern):
            yield os.path.join(path, filename)



parser = argparse.ArgumentParser(description='Pack animations.')
parser.add_argument('images', metavar='I', help='Directory with images')

args = parser.parse_args()

pngDir = args.images

for png in locate("*.png", pngDir):
    splitImage(png)
{% endhighlight %}
&nbsp;

Что касается <strong>OpenGL</strong>, то в итоге происходит загрузка той же <strong>RGBA</strong> текстуры, только она собирается из двух файлов. Я беру массив пикселей первой текстуры, записываю их в результирующий массив, а любой из каналов второй текстуры (альфы) я записываю в 4 компонент результирующего массива.

&nbsp;