---
id: 188
title: 'Symfony2: Авторизация через соц. сети VKontakte, Facebook, Odnoklassniki. OAuth 2.0'
date: 2013-04-10T14:35:21+00:00


guid: http://fateev.pro/?p=188
permalink: /symfony2/symfony2-avtorizaciya-cherez-soc-seti-vkontakte-facebook-odnoklassniki-oauth-2-0.html
dsq_thread_id:
  - "6095496210"
dsq_needs_sync:
  - "1"
categories:
  - Symfony2
---
<blockquote>Update: Рассмотрите в первую очередь <a href="https://github.com/hwi/HWIOAuthBundle" rel="nofollow">https://github.com/hwi/HWIOAuthBundle</a></blockquote>
Собственно, так получилось, что я сделал авторизацию через 3 популярные соцсети на OAuth 2.0. Тестировалось все под symfony 2.1:

<a title="VKontakte" href="https://github.com/ailove-dev/AbstractSocialBundle">AbstractSocialBundle</a>

<a title="VKontakte" href="https://github.com/ailove-dev/VKBundle">VKontakte</a>

<a title="Facebook" href="https://github.com/ailove-dev/FacebookBundle">Facebook</a>

<a title="Odnoklassniki" href="https://github.com/ailove-dev/OKBundle">Odnoklassniki</a>

К сожалению, полной документации по интеграции бандлов у меня пока нет, опишу кратко.
<h3>Как поставить</h3>
```
./composer.phar require ailove-dev/vk-bundle dev-master
./composer.phar require ailove-dev/ok-bundle dev-master
./composer.phar require ailove-dev/facebook-bundle dev-master
```

Необходимо в security.yml интегрировать провайдер для нужной соц. сети (если у вас несколько авторизаций будет, то обычно делают chain provider):
{% highlight yaml %}
    providers:
        chain_provider:
            chain:
                providers: [  fos_userbundle, vk_provider, fb_provider, ok_provider]
        fos_userbundle:
            id: fos_user.user_provider.username_email
        vk_provider:
            id: vk.user.provider
        ok_provider:
            id: ok.user.provider
        fb_provider:
            id: fb.user.provider
{% endhighlight %}
Также необходимо описать файрволы:
{% highlight yaml %}
    firewalls:
         main:
            pattern: ^/
            fb_firewall:
                check_path: /fb/login_check/
                login_path: /fb/login/
                use_forward: false
                failure_path: /fail
                always_use_default_target_path: true
                default_target_path: /user/connect/
                provider: chain_provider
            vk_firewall:
                check_path: /vk/login_check/
                login_path: /vk/login/
                use_forward: false
                failure_path: /
                always_use_default_target_path: true
                default_target_path: /user/connect/
                provider: chain_provider
            ok_firewall:
                check_path: /ok/login_check/
                login_path: /ok/login/
                use_forward: false
                failure_path: /
                always_use_default_target_path: true
                default_target_path: /user/connect/
                provider: chain_provider
            anonymous: true
            logout:
                path: /logout
                target: /
{% endhighlight %}
<blockquote>/user/connect/ здесь - роут для контроллера, который будет обрабатывать авторизовавшегося пользователя (бандлы только создают соответствующий токен). Пример контроллера можно посмотреть <a href="https://github.com/ailove-dev/sf2.1-sonata/blob/master/src/Application/Sonata/UserBundle/Controller/SocialConnectController.php">здесь</a>.</blockquote>
Доступ к контроллеру стоит ограничить только для авторизованных пользователь (бандлы используют соответствующие роли, поэтому их стоит добавить в ROLES):
{% highlight yaml %}
    role_hierarchy:
        # Social
        ROLE_VK_USER: [ROLE_USER]
        ROLE_OK_USER: [ROLE_USER]
        ROLE_FACEBOOK_USER: [ROLE_USER]
        ROLE_REGISTERED: [ROLE_VK_USER, ROLE_OK_USER, ROLE_FACEBOOK_USER]
        # Admin
        ROLE_ADMIN:       ROLE_REGISTERED
        ROLE_SUPER_ADMIN: [ROLE_USER, ROLE_SONATA_ADMIN, ROLE_ADMIN, ROLE_ALLOWED_TO_SWITCH, ROLE_SONATA_PAGE_ADMIN_PAGE_EDIT, ROLE_SONATA_PAGE_ADMIN_BLOCK_EDIT, ROLE_REGISTERED]

{% endhighlight %}
Cсылки для входа и выхода:
{% highlight php %}
{% raw %}
<a href="{{ path('_vk_login') }}">VK</a> | <a href="{{ path('_ok_login') }}">OK</a> | <a href="{{ path('_fb_login') }}">FB</a>
<a href="{{ path('fos_user_security_logout') }}">Выход</a>
{% endraw %}
{% endhighlight %}
<blockquote>Также бандлы поддаются настройке! Посмотреть параметры можно <a href="https://github.com/ailove-dev/AbstractSocialBundle/blob/master/Classes/AbstractConfiguration.php">здесь</a>.</blockquote>
&nbsp;