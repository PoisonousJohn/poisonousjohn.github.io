---
title: 'Независимый UI слой &mdash; ускоряем разработку UI'
date: 2018-11-16T00:00:00+03:00
author: Poisonous John
layout: post
guid: /ru/gamedev/independent-ui-layer.html
permalink: /ru/gamedev/independent-ui-layer.html
image: /imgs/ui-arch.png
categories:
  - Programming
  - Gamedev
tags:
  - Programming
  - Gamedev
---

Это первая статья из цикла “Ускоряем разработку UI”. В этом цикле я хочу поднять проблему, которая у нас остро стояла на нескольких проектах. Одной из главных головных болей в повседневной разработке у нас частенько были UI задачи:

1. UI, как правило, пишется не изолировано, поэтому протестировать его, например, на отдельной сцене, может быть проблематично
1. Дизайнеры креативят то, что сложно впихнуть в игру: постоянная борьба за размер текстур, сложность реализации тех или иных компонентов и т.д.
1. Нет дизайн гайдбука, где описаны все цвета, элементы и т.д. Многие вещи делаются на глаз, что порождает большое количество итераций по правкам дизайнера в стиле “тут на два пикселя больше, а тут цвет не тот”.
1. Из предыдущего пункта выливается отсутствие стандартных элементов, переиспользуемых в UI. Одинаковые вещи делаются разными людьми, привнося разные баги.

Это только то что, что сразу пришло на ум. Конечно же, со всем этим можно, и нужно разбираться.

## Изолированное тестирование UI

Один из сложнейших случаев тестирования: есть какой-либо игровой ивент, завязанный на сервер, ограниченный временными рамками, и работающий только при определенном количестве игроков.

Чтобы проверить поведение UI в таких сложно-воспроизводимых условиях, зачастую пишутся хаки/тулы и т.д., чтобы их обеспечить. Это может и работает, но требует все равно приличных усилий на поддержку, и много телодвижений при использовании.

Очень ломает со всем этим заморачиваться, когда нужно проверить что-нибудь тривиально, например, действительно ли появляется спиннер, если мы кликнем на кнопку в UI ивента.

Мы, разработчики, очень ленивые люди. Нередки ситуации, когда кто-то шлепнет фикс не глядя, авось прокатит, а тестер потом нам сообщит если что не так. Если таких итераций несколько, то это огромная трата времени, как разработчика, так и отдела тестирования.

Чтобы убрать издержки на тестирование в таких ситуациях, нужно обеспечить легкий способ проверять правки. Как правило, большинство UI элементов имеют всего-лишь несколько состояний, которые довольно просто проверять изолировано.

![Изображение, где есть три слоя: UI, бизнес логика и сервер](/imgs/ui-arch.png)

К сожалению, я редко вижу практику, когда UI элементы изолируют от остального кода. UI кишит привязками к синглтонам, моделям, которые не имеют никакого отношения к UI, системным сервисам, аналитике, и так далее. А это ведет нас к истокам проблемы.

Различные шаблоны UI не просто так придумали. Но почему то считается, что к разработке игр, в частности на Unity, они не особенно применимы. Лично я убедился, что это не так.

Это типичная архитектура UI. Я тут не привязывался к конкретному паттерну, это может быть MVP/MVC/MVVM, не суть. Во всех шаблонах есть четкое разделение на слои. Если это разделение отсутствует, то тестировать UI изолированно не выйдет.

Ключевые моменты, на которые стоит обратить внимание:
- У бизнес логики и UI **разные модели**. Это позволяет использовать одни и те же компоненты UI в привязке к разным частям бизнес логики. Плюс вы всегда можете, например, перетащить такой UI в другой проект, или даже организовать репозиторий с общими компонентами.
- View Script максимально тупой. Он либо передает пользовательский ввод в слой бизнес логики, либо реагирует на обновление view model со стороны бизнес логики.
_ Изменение моделей однонаправленное, вьюха напрямую не меняет модели. Это упрощает понимание и отладку логики.
- Добавьте RX и получится неплохой микс

Не смотря на то, что такое разделение может показаться избыточным, на практике -- это очень удобно.

- UI складывается из различных компонентов, которые можно переиспользовать, комбинировать совершенно независимо.
- Тестировать конкретный компонент UI можно вытащив на отдельную сцену, ведь нет завязки на какие-либо компоненты и модели бизнес-логики
- Если хорошенько поработать на тулами, встроить их в редактор, то интерфейсы строить сможет даже дизайнер
- Если UI скрипты скрыта за интерфейсами, то **бизнес логику можно тестировать независимо от UI**, юнит тестами.
- Работу над UI и бизнес-логикой можно вести **параллельно**, обговорив контракт, в виде интерфейсов

## Немного кода

Я решил в качестве примера накидать простенькое окно, которое может быть в трех состояниях:

- Загрузка
- Ошибка
- Отображение контента

Для простоты, контент -- строки.

Префаб окна выглядит примерно так:

![префаб окна на сцене](/imgs/loadable-window-prefab.png)

Обычно дизайн UI я начинаю с модели для конкретного компонента. Для начала обозначим три взаимоисключающих состояния окна.

{% highlight csharp %}
public enum LoadableWindowState
{
	READY,
	LOADING,
	ERROR
}
{% endhighlight %}

Далее определимся какие данные нужны для отображения в окне, и зафиксируем их в контракте-интерфейсе:

{% highlight csharp %}
public interface ILoadableWindowViewModel
{
	IObservable<LoadableWindowState> state { get; }
	IObservable<string> content { get; }
	IObservable<string> error { get; }
	IObservable<string> buttonTitle { get; }

	void ButtonClicked();
}
{% endhighlight %}

Сформировав уже на этом этапе контракт, разработка UI и бизнес логики могла бы происходить параллельно.

В некоторых случаях интерфейс для модели может быть избыточным. Но я нахожу интерфейсы более гибкими, так как они позволяют отвязаться от наследования.

Тогда моделью может выступать любой класс, например, сам презентер/контроллер. Было бы невозможно его одновременно унаследовать и от базового класса, и от модели.

Дефолтная имплементация модели пригодится для теста, при желании ее можно использоват и в бизнес логике.

{% highlight csharp %}
public class LoadableWindowViewModel : ILoadableWindowViewModel
{
	public IObservable<LoadableWindowState> state { get { return stateSubject; } }
	public IObservable<string> content { get { return contentSubject; } }
	public IObservable<string> error { get { return errorSubject; } }
	public IObservable<string> buttonTitle { get { return buttonTitleSubject; } }

	public IObservable<Unit> buttonClicked { get { return _buttonClicked; } }

	public void ButtonClicked()
	{
		_buttonClicked.OnNext(Unit.Default);
	}

	public readonly BehaviorSubject<LoadableWindowState> stateSubject = new BehaviorSubject<LoadableWindowState>(LoadableWindowState.LOADING);
	public readonly BehaviorSubject<string> contentSubject = new BehaviorSubject<string>(string.Empty);
	public readonly BehaviorSubject<string> errorSubject = new BehaviorSubject<string>(string.Empty);
	public readonly BehaviorSubject<string> buttonTitleSubject = new BehaviorSubject<string>(string.Empty);

	private Subject<Unit> _buttonClicked = new Subject<Unit>();

}
{% endhighlight %}

Реализация самого окна сводится просто к байндингам:

{% highlight csharp %}
public class LoadableWindow : MonoBehaviour
{

	public Button button;
	public Text buttonText;
	public Text errorText;
	public Text content;
	public RectTransform spinner;

	private IDisposable _viewModelSubscription;

	public void init(ILoadableWindowViewModel model)
	{
		var disposable = new CompositeDisposable();
		model.buttonTitle.Subscribe(s => buttonText.text = s).AddTo(disposable);
		model.error.Subscribe(s => errorText.text = s).AddTo(disposable);
		model.content.Subscribe(s => content.text = s).AddTo(disposable);
		model.state.Subscribe(s =>
		{
			spinner.gameObject.SetActive(s == LoadableWindowState.LOADING);
			content.gameObject.SetActive(s == LoadableWindowState.READY);
			button.gameObject.SetActive(s != LoadableWindowState.LOADING);
			errorText.gameObject.SetActive(s == LoadableWindowState.ERROR);
		}).AddTo(disposable);
		button.onClick.AsObservable().Subscribe(u => model.ButtonClicked()).AddTo(disposable);
		_viewModelSubscription = disposable;
		_viewModelSubscription.AddTo(gameObject);
	}

}
{% endhighlight %}

Класс, теперь есть готовое окно. Но в стандартном подходе, мы бы не смогли потестить его, пока не готова бизнес логика. Она в свое время может быть завязана, например на сервер, или на другие части системы, которые еще не готовы.

На самом деле, у нас уже есть все, чтобы полноценно проверить все состояния UI.

Я создал отдельную сцену для теста окна, и отдельный скрипт, позволяющий проверить каждое из его состояний.

{% highlight csharp %}
public class LoadableWindowTest : MonoBehaviour
{


	public LoadableWindow window;

	public Button setErrorButton;
	public Button setReadyButton;
	public Button loadContentButton;
	public Button setLoadingButton;

	private LoadableWindowViewModel _viewModel = new LoadableWindowViewModel();

	CompositeDisposable _disposable = new CompositeDisposable();

	private void Start()
	{
		window.init(_viewModel);
		LoadContent();

		_viewModel.buttonClicked.Subscribe(u => ButtonClicked()).AddTo(_disposable);
		setErrorButton.onClick.AsObservable().Subscribe(u => SetError()).AddTo(_disposable);
		setLoadingButton.onClick.AsObservable().Subscribe(u => SetLoading()).AddTo(_disposable);
		setReadyButton.onClick.AsObservable().Subscribe(u => SetContent()).AddTo(_disposable);
		loadContentButton.onClick.AsObservable().Subscribe(u => LoadContent()).AddTo(_disposable);
		_disposable.AddTo(gameObject);
	}

	[ContextMenu("Set error")]
	private void SetError()
	{
		_viewModel.stateSubject.OnNext(LoadableWindowState.ERROR);
		_viewModel.buttonTitleSubject.OnNext("Retry");
		_viewModel.errorSubject.OnNext("Error text");
	}

	private void SetContent()
	{
		_viewModel.stateSubject.OnNext(LoadableWindowState.READY);
		_viewModel.contentSubject.OnNext("Loaded Content");
		_viewModel.buttonTitleSubject.OnNext("Refresh");
	}

	private void SetLoading()
	{
		_viewModel.stateSubject.OnNext(LoadableWindowState.LOADING);
	}

	private void LoadContent()
	{
		SetLoading();
		Observable.Timer(TimeSpan.FromSeconds(3.0))
			.Subscribe(u => SetContent())
			.AddTo(gameObject);
	}

	public void ButtonClicked()
	{
		LoadContent();
	}
}
{% endhighlight %}

Скрипт посылает в модель соответствующие каждому состоянию данные. Отдельно я вытащил кнопки на каждое состояние и привязал их к скрипту.

Окно вставлено в сцену как префаб, тестовый скрипт -- отдельная сущность. Таким образом мы можем играться с тестом не затрагивая реализацию окна.

Вот так это выглядит в живую:

![живая демонстрация работы окна](/imgs/loadable-window.gif)


## Подводим итоги

В данной статье я продемонстрировал всего лишь наброски мыслей на тему. Подход может быть доработан и адаптирован под проект. Кто-то найдет некоторые части излишними и обойдется без них. Но в долгосрочной перспективе иметь UI как отдельный слой -- однозначно выгодно.