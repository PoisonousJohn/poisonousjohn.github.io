var store = [{
        "title": "Автор блога",
        "excerpt":"Ivan Fateev (Poisonous John) Экспертиза: Языки: C#, C++, Objective C, PHP Фреймворки: Unity 3D, ASP.Net Core, Symfony2   Текущая сфера деятельности: FinTech Место работы: ANNA    ","categories": ["About"],
        "tags": [],
        "url": "https://fateev.pro/about/author.html",
        "teaser": null
      },{
        "title": "О том, как я пришел к Symfony2",
        "excerpt":"Это что-то вроде вступительного слова, а также первый из серии постов про мой инструментарий, про те вещи с которыми я работаю. За всю свою не очень долгую карьеру программиста, на чем только я не пробовал кодить. Начиналось все безобидно, в колледже, я захотел сделать свою персональную страничку, тогда это считалось...","categories": ["Хроники"],
        "tags": ["framework","php","symfony-sonata","symfony2"],
        "url": "https://fateev.pro/chronicles/o-tom-kak-ya-prishel-k-symfony2.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2012/09/logo_symfony_header.png"
      },{
        "title": "Архитектура Sonata Admin Bundle",
        "excerpt":"Sonata Admin Bundle, как и вся концепция symfony2 поддерживает сервисно-ориентированную архитектуру, поэтому, чтобы сделать CRUD для сущности, в первую очередь, необходимо создать определенный сервис. Приведу пример сервиса в моем проекте: services: mtools.budget.expense.admin: id: mtools.budget.expense.admin class: Mtools\\BudgetBundle\\Admin\\BudgetExpenseAdmin tags: - { name: sonata.admin, manager_type: orm, group: budget, label: Расходная cмета } arguments:...","categories": ["Symfony Sonata"],
        "tags": ["php","symfony-sonata","symfony2"],
        "url": "https://fateev.pro/symfony-sonata/arxitektura-sonata-admin-bundle.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2012/09/sonata.jpg"
      },{
        "title": "Genemu Form Bundle",
        "excerpt":"GenemuFormBundle, на мой взгляд один из must have бандлов. Что из себя представляет? Набор очень удобных типов полей для формы с использованием jquery chosen, autocompleter и даже uploadify с jcrop. На странице репозитория все вполне адекватно описано, встраивается легко и без заморочек. Я его использую как замену для sonata_type_model, да...","categories": ["Symfony Sonata"],
        "tags": ["genemu","php","symfony-bundles","symfony-sonata","symfony2"],
        "url": "https://fateev.pro/symfony-sonata/genemu-form-bundle.html",
        "teaser": null
      },{
        "title": "StatusMapBundle",
        "excerpt":"В рамках своего проекта начал работать над бандлом, который предоставит возможности для реализации карты статусов с привязкой к роли. За основу взята модель статусов в Redmine. Сам статус будет обладать полями: системное имя имя флаг \"по умолчанию\" тип статуса Тип статуса - отдельная сущность с системным и обычным именами. &nbsp;...","categories": ["Хроники"],
        "tags": [],
        "url": "https://fateev.pro/chronicles/statusmapbundle.html",
        "teaser": null
      },{
        "title": "SonataAdminBundle: как добавить произвольную страницу к сущности",
        "excerpt":"У меня часто возникает необходимость добавлять произвольные страницы (например для ajax’a), связанные с конкретной сущностью, или для целого класса сущностей. Добавление страницы начинается с добавления роута в админ классе. За это отвечает метод configureRoutes: &lt;?php protected function configureRoutes(RouteCollection $collection) { $collection-&gt;add('members', $this-&gt;getRouterIdParameter() . '/members'); $collection-&gt;add('getProjects'); } В примере я рассмотрел...","categories": ["Symfony Sonata"],
        "tags": ["php","symfony-sonata","symfony2"],
        "url": "https://fateev.pro/symfony-sonata/sonataadminbundle-kak-dobavit-proizvolnuyu-stranicu-k-sushhnosti.html",
        "teaser": null
      },{
        "title": "SonataAdminBundle: фильтры",
        "excerpt":"Лично для меня - фильтры один из самых краеугольных камней, ибо это любимое требование заказчика, и очень часто у этого заказчика очень нестандартные запросы к фильтрам. Итак, соната предоставляет несколько возможностей для внедрения фильтрации данных. Неявные фильтры. Могут понадобится в случае, когда данные нужно фильтровать для пользователя определенным образом, но...","categories": ["Symfony Sonata"],
        "tags": ["php","symfony-sonata","symfony2"],
        "url": "https://fateev.pro/symfony-sonata/sonataadminbundle-filtry.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2012/10/Screen-Shot-2012-10-09-at-1.32.37-AM.png"
      },{
        "title": "Genemu jquerydate: Как удалить native datepicker chrome browser`a",
        "excerpt":"Столкнулся с проблемой, что когда используешь genemu jquerydate тип, то хром подставляет свой дейтпикер в поле, что абсолютно неприемлемо. Это происходить потому что jquerydate выводить дату в input с type = date. Решить проблему можно довольно просто: нужно указать формат даты: &lt;?php $formBuilder-&gt;add('availableSince', 'genemu_jquerydate', array('label' =&gt; 'Доступен с', 'format' =&gt;...","categories": ["Symfony2"],
        "tags": ["genemu","php","symfony2"],
        "url": "https://fateev.pro/symfony2/genemu-jquerydate-kak-udalit-native-datepicker-chrome-browser-a.html",
        "teaser": null
      },{
        "title": "Symfony2: Event system",
        "excerpt":"Недавно в очередной раз столкнулся с задачей ведения рейтинга пользователя и решил ее немного абстрагировать и сделать отдельный бандл. На проекте возникла необходимость кэширвать текущее значение очков пользователя. Для управления запиями рейтинга у меня есть отдельный сервис - RatingManager. Так как система управления записями о рейтинге централизована посредством этого менеджера,...","categories": ["PHP","Symfony2"],
        "tags": [],
        "url": "https://fateev.pro/php/symfony2-event-system.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2013/01/PublishSubscribeSolution.gif"
      },{
        "title": "Sonata Admin Bundle: One-To-Many и sonata_type_collection",
        "excerpt":"На первых порах, в Сонате возникало непонимание того как правильно организовать редактирование связи one-to-many.  На самом деле, есть несколько неочевидных моментов в Сонате, которые могут вызвать проблемы. Итак, как организовать one-to-many: ORM сущности mac: targetEntity: Mac mappedBy: device cascade: [\"all\"] orphanRemoval: true Здесь следует обратить внимание на параметр cascade, который...","categories": ["Symfony Sonata"],
        "tags": ["php","symfony-sonata","symfony2"],
        "url": "https://fateev.pro/symfony-sonata/sonata-admin-bundle-one-to-many-i-sonata-type-collection.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2013/01/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2013-01-21-%D0%B2-14.52.53.png"
      },{
        "title": "Symfony2: Авторизация через соц. сети VKontakte, Facebook, Odnoklassniki. OAuth 2.0",
        "excerpt":"Update: Рассмотрите в первую очередь https://github.com/hwi/HWIOAuthBundle Собственно, так получилось, что я сделал авторизацию через 3 популярные соцсети на OAuth 2.0. Тестировалось все под symfony 2.1: AbstractSocialBundle VKontakte Facebook Odnoklassniki К сожалению, полной документации по интеграции бандлов у меня пока нет, опишу кратко. Как поставить ./composer.phar require ailove-dev/vk-bundle dev-master ./composer.phar require ailove-dev/ok-bundle...","categories": ["Symfony2"],
        "tags": [],
        "url": "https://fateev.pro/symfony2/symfony2-avtorizaciya-cherez-soc-seti-vkontakte-facebook-odnoklassniki-oauth-2-0.html",
        "teaser": null
      },{
        "title": "Установка Boost на Mac OS X",
        "excerpt":" Руки наконец дошли до boost. Самый простой способ поставить boost, на мой взгляд, это через mac ports, выполнив команду: sudo port install boost После установки все заголовки можно найти в /opt/local/include/boost После чего, открываем XCode, в Build Settings находим секцию Search Paths и прописываем в Header Search Paths значение /opt/local/include с опцией...","categories": ["C++"],
        "tags": ["boost","c++"],
        "url": "https://fateev.pro/c_plus_plus/ustanovka-boost-na-mac-os-x.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2013/05/boost.png"
      },{
        "title": "Удалить CLRF из файла",
        "excerpt":" Не так часто сталкиваюсь с файлами в windows кодировках, но бывает, и наличие в них некорректных переносов жутко раздражает, XCode, например, от таких переносов вообще сходит с ума и показывает ошибки не на тех строках. Удалить CLRF поможет простая команда:   cat file | tr -d '\\015' &gt; file ","categories": ["Dev tools"],
        "tags": ["tools","unix","useful","xcode"],
        "url": "https://fateev.pro/dev-tools/udalit-clrf-iz-fajla.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2013/07/windows-8-fail.jpeg"
      },{
        "title": "Particle эффекты в мобильных играх",
        "excerpt":"До настоящего момента я особо не сталкивался с задачами визуализации сложных эффектов, в целом все сводилось к примитивным анимациям, но в текущем проекте нужны были различные эффекты, сложность которых заранее не была известна. Мы задумались над концепцией разделения визуализации и программирования, чтобы мне не делать лишнюю работу. Вот тут то...","categories": ["Gamedev"],
        "tags": ["experience","gamedev","mobile"],
        "url": "https://fateev.pro/gamedev/particle-effekty-v-mobilnyx-igrax.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2013/09/fig9.png"
      },{
        "title": "Любители велосипедов",
        "excerpt":"В очередной раз задался вопросом: оправдано ли создание собственного велосипеда и окупится ли оно в дальнейшем? Часто ведь бывает, что приходишь в какую-нибудь фирму, и у них обязательно есть “свой движок”. Вот и сейчас так со мной случилось … приходится писать на движке, который толком не отлажен, и вместо того,...","categories": ["Хроники"],
        "tags": ["daily","philosophy","programming"],
        "url": "https://fateev.pro/chronicles/lyubiteli-velosipedov.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2013/09/1678303_565afa6f.jpg"
      },{
        "title": "Все как всегда&#8230;",
        "excerpt":"Вот только я думал, что все идет хорошо, я наконец то завершу свою первую приложеньку и выложусь в стор, меня апнут, как и обещали, и тут начальница сообщает, что выпуститься мы должны так же на Android, хотя ранее планировалось только iOS. Нет, я, конечно, учитывал такой расклад, старался все ваять...","categories": ["Хроники"],
        "tags": [],
        "url": "https://fateev.pro/chronicles/vse-kak-vsegda.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2013/10/bx7fZI4.jpg"
      },{
        "title": "Gamedev интересная сфера, но беспощадная",
        "excerpt":"В моем детстве многие из друзей грезили вырасти и заниматься играми, я не был исключением, но так вышло, что меня занесло в web. Там я провел довольно много времени, о чем сейчас жалею, ведь я мог заняться плюсами гораздо раньше, тогда влиться в gamedev  было бы куда проще. Вообще, влиться...","categories": ["Gamedev"],
        "tags": ["gamedev"],
        "url": "https://fateev.pro/gamedev/gamedev-interesnaya-sfera-no-suka-besposhhadnaya.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2013/12/original.jpg"
      },{
        "title": "Smart pointers vs raw pointers; XCode: отладка undefined behaviour",
        "excerpt":"Скорость против удобства или Smart pointers не для игр Очень много времени потратил на оптимизацию, все никак не мог понять, что же мне так сильно все тормозит, рендер вроде уже оптимизировал, добрался до игровой механики. Проект - игра match3. Давно написал систему для match3 поля, ну и благополучно пользовался ей...","categories": ["C++"],
        "tags": ["c++","gamedev","xcode"],
        "url": "https://fateev.pro/c_plus_plus/smart-pointers-vs-raw-pointers-xcode-otladka-undefined-behaviour.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2014/01/icon-lg-speed.png"
      },{
        "title": "Размышления о будущем",
        "excerpt":"Я живу в Москве уже почти 3 года, переехал сюда из Тулы, это 200 км от Москвы, два с половиной часа на поезде, не так уж и далеко. Я встретил свою любовь, она живет в Москве, потому и переехал. Сразу устроился web-программистом, на довольно скромную по меркам Москвы зарплату. Денег...","categories": ["Хроники"],
        "tags": [],
        "url": "https://fateev.pro/chronicles/razmyshleniya-o-budushhem.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2014/01/Paper-Money-icon.png"
      },{
        "title": "Как сократить физический размер ресурсов",
        "excerpt":"Обычно больше всего места занимают текстуры. Мы использовали до этого исключительно PNG, а он достаточно много весит. Распространенный хак состоит в том, чтобы разделить PNG на два JPG’a или на JPG + PNG, в первом файле будут храниться RGB каналы, а во втором только маска. Это позволит сильно уменьшит физический...","categories": ["Gamedev"],
        "tags": ["gamedev","OpenGL","python","tools","useful"],
        "url": "https://fateev.pro/gamedev/kak-sokratit-fizicheskiy-razmer-resursov.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2014/01/archive.png"
      },{
        "title": "XCode5: Assistant editor",
        "excerpt":"Задолбало тратить свободное рабочее место в окне, и я занялся поисками как эффективно использовать рабочую область в XCode5. После недолгих поисков наткнулся на эту статью . которая позволила понять как добиться такой простой фишки как быстрое открытие файла в Assistant editor’e. Для этого достаточно вызвать диалог Cmd + Shift +...","categories": ["Dev tools"],
        "tags": ["daily","tools","xcode"],
        "url": "https://fateev.pro/dev-tools/xcode5-assistant-editor.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2014/04/xcode-logo.png"
      },{
        "title": "Facebook iOS SDK FBSession release message sent to deallocated object",
        "excerpt":"Каким-то необычайно странным образом столкнулся со следующей проблемой: Запускаем приложениеЗапрашиваем права на publish_actionsДаем отказ в правахПерезапускаем приложениеПолучаем crash на objc_release (двойной релиз) Включив Enable Zombie Objects, локализовал проблему: [FBSession release] message sent to deallocated instance В проекте выключен ARC, код брал из документации FB. Покопавшись еще немного (и приняв во...","categories": ["ObjectiveC","Хроники"],
        "tags": ["Crash","Facebook","iOS","ObjectiveC","SDK"],
        "url": "https://fateev.pro/chronicles/facebook-ios-sdk-fbsession-release-message-sent-to-deallocated-object.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2014/05/67a6bfe5cb2.png"
      },{
        "title": "Утечки. XCode Leaks &#038; Allocations. Осторожно XML",
        "excerpt":"Я люблю сложные задачи, но терпеть не могу, когда не ясно откуда идет проблема, как с ней бороться и куда вообще копать. Третий день бьюсь над проблемами с памятью: после загрузки и выгрузки игровой сцены есть большая утечка порядка 20Мб, что, мягко говоря, много. Изначально я пробовал пользоваться инструментом Leaks,...","categories": ["Gamedev"],
        "tags": ["c++","gamedev"],
        "url": "https://fateev.pro/gamedev/utechki-xcode-leaks-and-allocations-ostorozhno-xml.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2014/06/crystal_xml.png"
      },{
        "title": "Smiley Boom &#8211; первый крупный релиз",
        "excerpt":"Мы наконец-то зарелизили нашу игру Smiley Boom: Facebook iOS Что хочу заметить: Реализация внутриигровых покупок (IAP) заняла больше недели ( хотя я планировал значительно меньше ), это обусловлено тем, что очень много нестандартных вариантов с потерей соединения и прочего, а так же с наличием у нас механики акций. Кучу сложностей сейчас...","categories": ["Хроники"],
        "tags": ["gamedev","mobile"],
        "url": "https://fateev.pro/chronicles/smiley-boom-perviy-krupniy-reliz.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2014/04/smileyBoom.png"
      },{
        "title": "Facebook Unity SDK Problems and Error Handling",
        "excerpt":"Unity is quite useful. But every tool has its own cons. One of that cons is a WWW class - some kind of HTTP wrapper. You might say: “What’s wrong with it? It’s quite handy!”. Yes, it is, till you need to work with some kind of REST API. Most...","categories": ["Unity"],
        "tags": ["c#","Facebook","unity"],
        "url": "https://fateev.pro/gamedev/unity/facebook-unity-sdk-problems-and-error-handling.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2014/05/67a6bfe5cb2.png"
      },{
        "title": "Cinnamon заставил скучать по Linux",
        "excerpt":"Не смотря на то, что основная моя рабочая машина - iMac, и она меня вполне устраивает, сердце все равно тоскует по свободе Linux‘a. На домашнем ноуте у меня стоит Linux, на котором недавно я попробовал Cinnamon. И… он потрясающий! Невероятно легкая и простая оболочка, с большими возможностями для кастомизации. На...","categories": ["Хроники"],
        "tags": ["cinnamon","linux"],
        "url": "https://fateev.pro/chronicles/cinnamon-zastavil-skuchat-po-linux.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2015/12/Screenshot-from-2015-12-30-001346.png"
      },{
        "title": "Unity 4.6.x doesn&#8217;t show up when opening large projects, is it alive?",
        "excerpt":"Due to single-threaded approach of Unity editor of version 4.x, when opening large project first time, Unity launches importing of files, yet doesn’t show anything on screen. Also CPU activity keeps at low rate.  On Mac OS X it is possible to track Unity’s background activity when it is reading...","categories": ["Unity"],
        "tags": ["OSX","unity"],
        "url": "https://fateev.pro/gamedev/unity/unity-4-6-x-doesnt-show-up-when-opening-large-projects-is-it-alive.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2016/12/977b0ce93a4099143e64ae932e905dc0_e7cdc06072836c64f441c5014ad641f5.jpg"
      },{
        "title": "Waveshare 7&#8243; touchscreen showing lines and black screen",
        "excerpt":"I’ve recently bought a waveshare 7 inch touchscreen, which didn’t work out of the box. It comes with custom raspbian image, which isn’t handy because you can’t upgrade so easily. So actually this display is able to work on stock raspbian with slight modifications to config.txt as you can see...","categories": ["IoT","Raspberry Pi"],
        "tags": ["IoT","Raspberry Pi"],
        "url": "https://fateev.pro/iot/waveshare-7-touchscreen-showing-lines-and-black-screen.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2017/01/7inch-HDMI-LCD-B_l.jpg"
      },{
        "title": "GameDev Architecture: Telegram Channel",
        "excerpt":" Запустил свой телеграм канал GameDev Architecture. На канале я делюсь своими заметками о том, как игровым компаниям строить правильные, эффективные и красивые решения, в основном на C#. От описания сложных архитектурных решений, до простых туториалов. Всегда рад услышать ваши мысли.  ","categories": ["Хроники"],
        "tags": ["Telegram"],
        "url": "https://fateev.pro/chronicles/poisonous_johns_lair_telegram_channel.html",
        "teaser": "https://fateev.pro/wp-content/uploads/2017/11/jp_oss_pirate_small.png"
      },{
        "title": "Оффлайн режим в клиент-серверных приложениях",
        "excerpt":"Игры, да и приложения в целом, часто подразумевают наличие механик, завязанных на сервер. Сейчас не часто встретишь оффлайн игру. Как минимум, игры имеют различные социальные составляющие: кланы, чаты, список друзей, да что угодно. И каждый пук уходит в аналитику. Конечно же, сетап команды предполагает два отдельных юнита, которые занимаются своей...","categories": ["Gamedev"],
        "tags": ["Gamedev","Architecture","Client-server","Patterns"],
        "url": "https://fateev.pro/ru/gamedev/offline-mode-in-client-server-apps.html",
        "teaser": "https://fateev.pro/imgs/offline-mode-facade.png"
      },{
        "title": "Система компонентов cущностей (Entity Component System)",
        "excerpt":"Использование паттерна “Компонент” – это единственная альтернатива не потеряться среди леса из деревьев наследования. Я поясню. Когда люди работают над сложными механиками, они пытаются выделить общие части системы, чтобы их переиспользовать. Но так случается, что общие части должны присутствовать в совершенно несвязанных модулях. Частая ошибка – пытаться объединить то, что...","categories": ["Gamedev"],
        "tags": ["Gamedev","Architecture","Patterns"],
        "url": "https://fateev.pro/ru/gamedev/entity-component-system.html",
        "teaser": "https://fateev.pro/imgs/health-component.jpg"
      },{
        "title": "Средства отладки",
        "excerpt":"Сколько времени мы тратим в день, разбираясь в коде? Согласно этой статье — 75%. Источник: dmitripavlutin.com Это не удивительно. Хотя есть такая тенденция, что за людьми закрепляют какие-то части системы, все равно нам каждый день приходится читать чужой код. Свой код бывает понять сложно, а чужой дается нам еще тяжелее....","categories": ["Gamedev"],
        "tags": ["Gamedev","Tools"],
        "url": "https://fateev.pro/ru/gamedev/debug-tools.html",
        "teaser": "https://fateev.pro/imgs/gizmos.jpg"
      },{
        "title": "Важность понимания парадигмы. RX для работы с API",
        "excerpt":"Каждый день в нашей работе мы сталкиваемся с различными парадигмами. Не смотря на то, что большинство парадигм стары как мир (ООП, ФП и т.д.), часто всплывает что-то новое для нас. Возможно, что раньше мы не обращали внимание на них, или просто отсутствовала необходимость. Но теперь, когда она появилась, важно открыть...","categories": ["Programming"],
        "tags": ["Programming"],
        "url": "https://fateev.pro/ru/programming/understanding-paradigm-rx-for-api.html",
        "teaser": "https://fateev.pro/imgs/paradigm-shift-graphic.jpg"
      },{
        "title": "Независимый UI слой &mdash; ускоряем разработку UI",
        "excerpt":"Это первая статья из цикла “Ускоряем разработку UI”. В этом цикле я хочу поднять проблему, которая у нас остро стояла на нескольких проектах. Одной из главных головных болей в повседневной разработке у нас частенько были UI задачи: UI, как правило, пишется не изолировано, поэтому протестировать его, например, на отдельной сцене,...","categories": ["Programming","Gamedev"],
        "tags": ["Programming","Gamedev"],
        "url": "https://fateev.pro/ru/gamedev/independent-ui-layer.html",
        "teaser": "https://fateev.pro/imgs/ui-arch.png"
      },{
        "title": "Are you growing your juniors right?",
        "excerpt":"Nothing! Literally – nothing. And that’s the point. When my student told me about what’s happening in his job, I couldn’t take it anymore and decided to write this article. I hope to help at least some people with it. Let’s look at a couple of problems. Such situations happen...","categories": ["Programming"],
        "tags": ["Programming","Soft skills","Management"],
        "url": "https://fateev.pro/en/programming/are-you-growing-your-juniors-right.html",
        "teaser": "https://fateev.pro/assets/images/growing_junior.png"
      },{
        "title": "Правильно ли вы растите своих джунов?",
        "excerpt":"А ничего! Буквально – ничего! В том то и дело. Когда мой ученик рассказал о том, что происходит у него на работе, я не смог больше терпеть, и решился на эту статью. Вдруг получится помочь хоть нескольким людям. Рассмотрим пару проблем. Подобные ситуации возникают не только в нашей индустрии. Вы...","categories": ["Programming"],
        "tags": ["Programming","Soft skills","Management"],
        "url": "https://fateev.pro/ru/programming/are-you-growing-your-juniors-right.html",
        "teaser": "https://fateev.pro/assets/images/growing_junior.png"
      }]
