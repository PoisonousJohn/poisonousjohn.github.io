---
title: 'Система компонентов cущностей (Entity Component System)'
date: 2018-07-20T14:33:30+00:00


guid: /ru/gamedev/entity-component-system.html
permalink: /ru/gamedev/entity-component-system.html
header:
  teaser:  /imgs/health-component.jpg
categories:
  - Gamedev
tags:
  - Gamedev
  - Architecture
  - Patterns
---

Использование паттерна "Компонент" -- это единственная альтернатива не потеряться среди леса из деревьев наследования. Я поясню.

Когда люди работают над сложными механиками, они пытаются выделить общие части системы, чтобы их переиспользовать. Но так случается, что общие части должны присутствовать в совершенно несвязанных модулях.

Частая ошибка -- пытаться объединить то, что должно лежать раздельно. Из-за того, что общий функционал нужен в двух несвязанных ветках наследования, а большинство языков не поддерижвают множественное наследование, то люди извращаются как могут. Впиливают куда-нибудь наверх еще уровень наследования, чтобы где-то через несколько уровней вниз, 2 класса использовали 1-2 метода.

![Inheritance-problem-diagram](/imgs/inheritance-problem.png)

Часто еще бывает, что этот Common класс не используется целиком, и среди всей иерархии тащатся бесполезные части.

## Component pattern

Если использовать шаблон [Component](http://gameprogrammingpatterns.com/component.html), то все упрощается. Мы просто меняем наследование на композицию, добавляем там где нам нужно компонент, и вызываем методы.

![Inheritnace-problem-diagram](/imgs/inheritance-problem2.png)

Теперь у нас ничего лишнего в родительских классах, все выглядит почище. Не смотря на то, что решение простое, и, казалось бы, интуитивное, люди, почему-то, все равно хотят использовать наследование, как одержимые.

## Entity Component Pattern

Я не смог найти правильное название для этого шаблона. Это что-то среднее между использование компонентов, что я рассмотрел ранее, и Entity Component System, что мы рассмотрим позже.

Предыдущий подход имеет один большой недостаток: использование всех компонентов зашито в коде. То есть, мы не можем добавить к классу игрока новый компонент, не поменяв код.

Это может быть довольно сильным ограничением, ведь геймплей должен быть настраиваемым. Если каждый раз гейм-дизайнер будет дергать программиста, чтобы изменить скорость перемещения персонажа -- это катастрофа.

Для этого в играх есть некая система для конфигурации. Если можно конфигурировать то что уже написано в коде, так почему бы не дать еще больше свободы для креатива и не "хардкодить" поведение заранее.

Шаблон Entity Component -- это то, как работает вся система в Unity. Идея, на самом деле неплохая, но реализация так себе. О ее недостатках все известно, но мы часто забываем о преимуществах.

Данный шаблон предполагает, что все в программе -- это некая "Сущность (Entity)". В терминах Unity сущность -- это GameObject. И каждая сущность может иметь набор компонентов. Они заранее не определены и их список может меняться посредством методов.

Если откинуть мысли о производительности, то давайте посмотрим какое преимущество нам дает такая система.

### Классический пример.

Есть, например, шутер. В нем есть игроки, которые палят друг в друга, пока не прикончат. Внезапно гейм-дизайнер решил, что в игре должны быть и разрушаемые предметы, причем разрушаться они должны после определенного урона.

Компоненты позволяют отделить код от конфигурации/представления. Поэтому, если программисты делали свою работу хорошо, и сделали отдельный компонент, который имеет "здоровье" и может принимать урон, то разрушение чего-угодно решается простым добавлением компонента к объекту.

В юнити, гейм-дизайнер может открыть "префаб" камня, например, и добавить к нему соответствующий компонент. Если бы у нас не было такой возможности, то программисту понадобилось бы искать условный класс "Камень" и добавлять компонент в код.

Немного программер-арта:

![Health component attached to every object](/imgs/health-component.jpg)

HealthComponent приаттачен как к плеерам, так и к камню, что позволяет сразу получить весь необходимый функционал, включая отображение полосок здоровья.

Еще одна приятная возможность такой системы, что компоненты можно аттачить к объектам в рантайме, по какому-либо событию, что тоже позволяет делать интересные механики.

Это классный паттерн, но у него есть свои недостатки:

- мы не знаем какие компоненты есть у объекта заранее, можем определить это только в рантайме, что рождает все эти ошибки, когда мы пытаемся использовать компонент, которого нет
- зависимости между компонентами сложнее реализовать и отслеживать
- такая система бьет по производительности, так как многие вещи делаются в рантайме

Но преимущества сильно перевешивают недостатки, имхо.

## Entity Component System

На самом деле, шаблон [Entity Component System (ECS)](https://github.com/junkdog/artemis-odb/wiki/Introduction-to-Entity-Systems) очень похож на предыдущий вариант. С одним ключевым отличием: бизнес логика по обработке компонентов лежит в системах, а не в самих компонентах.

В отличие от предыдущего подхода, где, например, метод Update присутствует в каждом отдельном компоненте, в ECS есть система обработки компонентов, которая имеет список всех компонентов одного типа, и, итерируясь по ним, исполняет бизнес логику.

В чем здесь выгода?

### Порядок обработки компонентов системами четко регламентирован

В каком порядке системы были зарегистрированы в ECS, в таком они и обработают компонент. Это дает высокую предсказуемость кода. Когда отлаживаешь баги, то почти сразу можно локализовать место, где данные поломались.

### Легко включать и выключать логику

Попробуйте в Unity отключить все MonoBehavior определенного типа. Это возможно, но будет проблематично:

- Найти все компоненты типа T и выключить их: FindObjectsOfType<T>, который по сути итерируется по всем объектам в сцене.
- Сделать статическую переменную в классе компонента и проверять ее внутри Update и других методов, т.е. по сути исполнять N раз одну и ту же работу в каждом компоненте.
- Прикреплять компоненты одного типа к одному game object и включать/выключать его

Если у вас есть система физики, которая работает с рядом физических компонентов, обновляя их, то выключить физику можно простейшим выключением апдейта самой системы.

Аналогично, если в Update есть какое-то вычисление, одинаковое для всех компонентов, то система его может закэшировать.

Итерация и обработка однотипных компонентов происходит гораздо быстрее.

Система может манипулировать несколькими типами компонентов и эффективно их обрабатывать, решая проблему зависимостей и взаимодействия. Даже если у вас несколько типов компонентов, код логично сгруппирован в системе.

### Легко писать тесты

Так как системы сосредоточены на одной задаче, слабо связаны и оперируют только данными в компонентах, то писать тесты -- сущая легкотня.

Фикстуры -- это просто набор компонентов-данных.
Мокать ничего практически не нужно.
Проверять вход и выход системы в тестах -- элементарно!

### Модульность кода

ECS позволяет организовывать модульный код. Имеется ввиду, что какая-то фича может состоять из ряда компонентов и группы систем по их обработке. Они должны быть связаны вместе, потому что не могут работать друг без друга (вспоминаем high cohesion). Вместе они образуют фича-модуль.

Если правильно организовать код и держать связанные вещи рядом, организуя их в модули, а между модулями выстроить границы (вспоминаем loose coupling), то получится классная архитектура.

К примеру, начиная новый прототип, можно легко перетаскивать и подключать целые модули. Здесь мы хотим модуль стрельбы от первого лица, а вот здесь мы хотим NAVMeshAI для мобов, а вот здесь мы подключим модуль с индикаторами здоровья врагов.

А если мы резко передумали и решили что-то выпилить -- тоже не проблема, не нужно перелопачивать весть код удаляя там-сям.

Вот, например, пачка систем оружия из реального проекта, которы могут быть объединены в модуль:
<pre>
{% highlight c# %}
      systems.Add(new FireIfWeaponReadySystem(_superContext));
      systems.Add(new WeaponReloadTriggerSystem(_superContext));
      systems.Add(new UpdateReloadTimer(_superContext));
      systems.Add(new UpdatePostReloadTimer(_superContext));
      systems.Add(new StartReloadTimerSystem(_superContext));
      systems.Add(new UpdateThrowingGrenadeSystem(_superContext));
      systems.Add(new UpdateSpitSystem(_superContext));
      systems.Add(new WeaponShootSystem(_superContext));
      systems.Add(new ModifyDamageSystem(_superContext));
      systems.Add(new ApplyHitSystem(_superContext));
      systems.Add(new WeaponRecoilSystem(_superContext));
      systems.Add(new WeaponUpdateRecoilSystem(_superContext));
{% endhighlight %}
</pre>

## Практический кейс: используем плюшки низкой связности ECS для привязки аналитики

Интеграция аналитики в проект -- всегда геморная задача. Нет, дело не в сложности, а в том, что красиво аналитику в проект вставить сложно. Она часто "размазана" по коду то там, то здесь. Она редко ложится в архитектуру.

Хорошая новость! С ECS вставить аналитику можно красиво! Не зря же я заговорил про модули.

Приведу пример из проекта на Entitas.

Во-первых, я решил отвязать системы геймплея от аналитики. Для этого создал отдельный датакласс для колбеков из геймплея.

<pre>
{% highlight c# %}
  public class EntitasEvents
  {
    [CanBeNull] public Action onLevelCleared;
    [CanBeNull] public Action<Vector3, bool> onCharacterLocationHeartbeat;
    [CanBeNull] public Action<TutorialStep> onTutorialStepStarted;
    [CanBeNull] public Action<IEnumerable<AbilityRef>> onAbilitySelected;
    [CanBeNull] public Action<Dictionary<DamageDescriptor, float>> onReportDamageStatistics;
  }
{% endhighlight %}
</pre>

Это позволит отвязаться от конкретного интерфейса аналитики и предоставить API для подписки на конкретные события внутри геймплея.

Тогда изменения геймплея не будут затрагивать аналитику, и наоборот.

Сами системы аналитики создаются отдельно от игровых систем, по принципу модуля.

<pre>{% highlight c# %}
    private void CreateAnalyticsSystems()
    {
      if (_events?.onLevelCleared != null)
      {
        _coreSystems.Add(new LevelClearedAnalyticsSystem(_superContext, _events.onLevelCleared));
      }

      if (_events?.onCharacterLocationHeartbeat != null)
      {
        _coreSystems.Add(
          new CharacterLocationHeartbeatSystem(
            _superContext.gameContext,
            _uniqueEntity.serviceLocator.config.characterLocationHeartbeatInterval,
            (position, isAlive) =>
              _events.onCharacterLocationHeartbeat.Invoke(position, isAlive)
          )
        );
      }
      if (_events?.onReportDamageStatistics != null)
      {
        _coreSystems.Add(new DamageStatisticsSystem(_superContext, _events.onReportDamageStatistics));
      }
    }
{% endhighlight %}
</pre>

Для примера, рассмотрим систему для сборки статистики урона от мобов.

<pre>
{% highlight c# %}
    public class DamageStatisticsSystem : IExecuteSystem
    {
        private readonly Action<Dictionary<DamageDescriptor, float>> _onReportDamageStatistics;
        private readonly SingletonEntity _uniqueEntity;
        private readonly IGroup<EventsEntity> _damageEvents;
        private readonly IGroup<GameEntity> _activeCharacterGroup;

        public DamageStatisticsSystem(
            SuperContext superContext,
            [CanBeNull] Action<Dictionary<DamageDescriptor, float>> onReportDamageStatistics)
        {
            _onReportDamageStatistics = onReportDamageStatistics;
            _uniqueEntity = superContext.uniqueEntity;
            _uniqueEntity.isDamageStatistics = true;
            _damageEvents = superContext.eventsContext.GetGroup(EventsMatcher.DamageEvent);
            _activeCharacterGroup = superContext.gameContext
                    .GetGroup(GameMatcher.AllOf(GameMatcher.ActiveCharacter, GameMatcher.Character));
            _uniqueEntity.runData.runData.damageStatistics.Clear(); // make sure each room has clean stats
        }

        public void Execute()
        {
            if (!_uniqueEntity.isDamageStatistics) return;

            var activeCharacterEntity = _activeCharacterGroup.GetSingleEntity();


            var statistics = _uniqueEntity.runData.runData.damageStatistics;
            foreach (var damageEvent in _damageEvents)
            {
                var isActiveCharacterDamage = damageEvent.damageEvent.targetId == activeCharacterEntity.character.id;
                if (!isActiveCharacterDamage) continue;

                var damageDescriptor = GetDamageDescriptor(damageEvent.damageEvent);
                var damage = statistics.GetValueOrDefault(damageDescriptor, 0L);
                statistics[damageDescriptor] = damage + damageEvent.damageEvent.damage;
            }

            if (!_uniqueEntity.hasScenarioCompleted && !activeCharacterEntity.isDead) return;

            _onReportDamageStatistics?.Invoke(_uniqueEntity.runData.runData.damageStatistics);
            _uniqueEntity.isDamageStatistics = false;
        }

        private static DamageDescriptor GetDamageDescriptor(DamageEventComponent damageEventComponent) =>
            new DamageDescriptor()
            {
                botAttack = damageEventComponent.botAttackRef,
                botPrototype = damageEventComponent.botPrototypeRef,
                damageZone = damageEventComponent.damageZoneRef
            };

    }
{% endhighlight %}
</pre>

Ключевое в этой системе, что она использует компоненты из других систем, такие как DamageEvent или ActiveCharacter, но никак не влияет на сами эти системы.

Просто делает свое дело, накапливая статистику в RunData -- это контекст забега в игре.

А когда уровень завершен (опять же, логика завершения уровня лежит где-то в других системах), то дергает соответствующий колбек, отдавая данные вовне.

Итак, что же такого хорошего в таком подходе?

1. Аналитика разбита между отдельными системами. Каждая система делает только одну вещь и делает ее хорошо -- Single responsibility principle
1. Системы аналитики не имеют своего состояния. Они используют общедоступные данные в компонентах ECS. Другие системы ничего не знают об аналитике -- Loose coupling
1. Системы аналитики никак напрямую не привязаны к отправке этой самой аналитике. Т.е. условный транспорт может быть любой и может меняться независимо.
1. Системы аналитики организованы в отдельный "модуль" и могут легко подключаться и отключаться

## Подводим итоги

Люди все еще думают классическими терминами ООП, и стремятся "унаследовать" все подряд. Для механики игр больше подходят другие решения вроде Entity Component System (ECS). И да, если вы не пробовали писать код с таким подходом, то скорее всего придется немножко сломать голову и поменять мышление.

## Ссылки

- [Introduction to Entity Systems](https://github.com/junkdog/artemis-odb/wiki/Introduction-to-Entity-Systems)
- [Entitas: Entity Component System Framework specifically made for C# & Unity](https://github.com/sschmid/Entitas-CSharp)
- [Шаблон проектирования Entity-Component-System — реализация и пример игры](https://habr.com/post/343778/)
- [Survival Shooter using Unity’s Entity Component System](http://www.davidpol.com/2018/03/28/survival-shooter-ecs/)