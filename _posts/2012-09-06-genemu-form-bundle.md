---
id: 83
title: Genemu Form Bundle
date: 2012-09-06T22:25:12+00:00
author: Poisonous John
layout: post
guid: http://fateev.pro/?p=83
permalink: /symfony-sonata/genemu-form-bundle.html
dsq_thread_id:
  - "6095485627"
categories:
  - Symfony Sonata
tags:
  - genemu
  - php
  - symfony-bundles
  - symfony-sonata
  - symfony2
---
GenemuFormBundle, на мой взгляд один из must have бандлов. Что из себя представляет? Набор очень удобных типов полей для формы с использованием jquery chosen, autocompleter и даже uploadify с jcrop.

На <a title="Genemu Form Bundle" href="https://github.com/genemu/GenemuFormBundle">странице репозитория</a> все вполне адекватно описано, встраивается легко и без заморочек. Я его использую как замену для sonata_type_model, да и вообще вместо большинства стандартных типов Sonata.

Большие плюсы:
<ul>
	<li>Прекрасно работает с сущностями</li>
	<li>Умеет делать ajax запросы для подгрузки списков для выбора</li>
	<li>Можно подствлять query builder для подгрузки списка сущностей</li>
</ul>
Вот несколько примеров:

{% highlight php %}<?php

    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
                ...
                ->add('project', 'genemu_jquerychosen', array('label' => 'Проект',
                    'class' => 'Mtools\ProjectBundle\Entity\Project',
                    'widget' => 'entity',
                    'choices' => $allowedProjects,
                    'multiple' => false,
                ))
                ->add('projectType', 'genemu_jquerychosen', array('label' => 'Тип проекта',
                    'class' => 'Mtools\SystemValuesBundle\Entity\ProjectType',
                    'widget' => 'entity',
                    'multiple' => false,
                    'required' => false,
                ))
                ->add('rolesArray', 'genemu_jquerychosen', array('label' => 'Доступ',
                    'choices' => $roles,
                    'multiple' => true,
                    'required' => false,
                ))
                ...{% endhighlight %}

И вот как примерно это выглядит в форме:

<a href="http://fateev.pro/wp-content/uploads/2012/09/Screen-Shot-2012-09-06-at-10.18.54-PM.png"><img class="alignnone size-full wp-image-85" title="Screen Shot 2012-09-06 at 10.18.54 PM" src="http://fateev.pro/wp-content/uploads/2012/09/Screen-Shot-2012-09-06-at-10.18.54-PM.png" alt="" width="557" height="198" /></a>

Также в бандле есть тип поля для загрузки файлов, но я пока его еще не тестил, не приходилось =) но думаю, что все должно быть на уровне.