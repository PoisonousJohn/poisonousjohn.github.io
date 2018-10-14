---
title: 'Важность понимания парадигмы. RX для работы с API'
date: 2018-10-12T15:00:00+03:00
author: Poisonous John
layout: post
guid: /ru/programming/understanding-paradigm-rx-for-api.html
permalink: /ru/programming/understanding-paradigm-rx-for-api.html
image: /imgs/paradigm-shift-graphic.jpg
categories:
  - Programming
tags:
  - Programming
---

Каждый день в нашей работе мы сталкиваемся с различными парадигмами. Не смотря на то, что большинство парадигм стары как мир (ООП, ФП и т.д.), часто всплывает что-то новое для нас. Возможно, что раньше мы не обращали внимание на них, или просто отсутствовала необходимость. Но теперь, когда она появилась, важно открыть свой разум, и освободить его от оков старых устоев.

Когда мы изучаем что-то новое, бывает сложно перестроиться. Что такое парадигма? Это философия, образ мышления. Если его не понять, не придерживаться ему, то использование инструментов парадигмы становится бессмысленным.

С этой проблемой столкнулись С++ программисты, когда популярность Си стала угасать, и многие Сишные программисты ринулись покорять новый, более популярный, более сложный язык. Проблема была в том, что С++ использовали как Си с классами, не пытаясь постичь ООП, соответствующие паттерны, ну вы поняли мысль.

Хотя люди и получили новый инструмент, они просто не хотели менять свой образ мышления. Ведь для этого нужно многое переосмыслить, поменять образ мышления. Не все этого хотят, не все на это способны.

Это я все к чему. [Парадигма реактивного программирования](https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5) становится все более популярной. Если вы еще не знакомы с ней, я очень советую познакомиться.

Я вижу, как библиотеку RX (для Unity это [UniRx](https://github.com/neuecc/UniRx)) пользуют в разных проектах. В частности, один из вариантов использования -- это обертка над API. Оно и понятно, благодаря RX можно удобно комбинировать запросы, реагировать на ошибки и тому подобное.

Давайте посмотрим на пример. Я буду писать на .Net Core и Rx.Net, но его можно легко транслировать на Unity и UniRx. Если вы знакомы с RX, то можете пропустить следующую секцию, и перейти к [следующей части](#understanding-paradigm)

## Пример работы с API через RX.Net

Итак, предположим, у нас есть некий интерфейс коммуникации с сервером.

{% highlight csharp %}
using System;
using System.Reactive;
using System.Reactive.Linq;
using Game.Models;

public interface ILoginRepository {
	IObservable<string> GetToken(string deviceId);
	IObservable<UserState> GetUserSave(string token);
}
{% endhighlight %}

Здесь есть две простейшие операции: получить токен и получить сейв. Как правило, при старте игры мы получаем токен (если он протух или его не было), затем получаем сейв. В принципе это может быть объединено и в одну операцию. Но для демонстрации идеи я их разделил.

Методы возвращают IObservable, что означает, что операция асинхронна, и может занять какое-то время.

Сделаем простейшую заглушку для интерфейса.

{% highlight csharp %}
using System;
using System.Reactive.Linq;
using Game.Models;

public class LoginRepositoryStub : ILoginRepository
{
	public IObservable<string> GetToken(string deviceId)
	{
		return Observable.Return("stub_user_token")
					.Delay(TimeSpan.FromSeconds(1))
					.SingleAsync();
	}

	public IObservable<UserState> GetUserSave(string token)
	{
		return Observable
					.Return(new UserState())
					.Delay(TimeSpan.FromSeconds(1))
					.SingleAsync();
	}
}
{% endhighlight %}

Здесь оба метода возвращают фиксированное значение с небольшой задержкой.

Обратите внимание, что здесь использован `SingleAsync`, который сразу закрывает стрим, после первого же события. Казалось бы, вполне логичное решение, ведь один запрос - один ответ.

`UserState` пример класса сейва, просто для демонстрации.

{% highlight csharp %}
namespace Game.Models {
	public class UserState {
		public long cash { get; set; }
	}
}
{% endhighlight %}

Ну и теперь попробуем это завести.

{% highlight csharp %}
using System;
using System.Reactive.Linq;
using System.Reactive;
using System.Threading;

namespace understanding_paradigm
{
    class Program
    {
        private static ILoginRepository loginRepository = new LoginRepositoryStub();
        static void Main(string[] args)
        {
            Console.WriteLine("Started the program");
            bool exit = false;
            loginRepository.GetToken("device id")
                .Subscribe(token => {
                    Console.WriteLine($"Got token: {token}");
                }, e => {
                    Console.WriteLine($"Got exception while getting the token: {e}");
                }, () => {
                    Console.WriteLine("Finished getting the token");
                    exit = true;
                });
            while (!exit) {
                Thread.Sleep(1);
            }
        }
    }
}
{% endhighlight %}

Программа покажет следующий вывод:

```
Started the program
Got token: stub_user_token
Finished getting the token
```

Пока что все ок. Теперь попробуем сэмулировать ошибку сервиса. Привожу только измененные части.

{% highlight csharp %}
public class LoginRepositoryStub : ILoginRepository
{
	private Func<IObservable<string>> getTokenHandler;

	private IObservable<string> ReturnToken() {
		return Observable.Return("user_stub_token")
				.Delay(TimeSpan.FromSeconds(1))
				.SingleAsync();
	}

	private IObservable<string> ReturnError() {
		return Observable.Throw<string>(new Exception("Failed to get token"))
				.Delay(TimeSpan.FromSeconds(1))
				.SingleAsync();
	}

	public IObservable<string> GetToken(string deviceId)
	{
		getTokenHandler = getTokenHandler == null
							? (Func<IObservable<string>>)ReturnError
							: ReturnToken;

		return getTokenHandler();
	}
}
{% endhighlight %}

При первом запросе к GetToken возвращаю ошибку сервера. При втором, меняю имплементацию и возвращаю токен.

Запускаем программу, и видим, что она висит. Третье сообщение не выводится никогда.

```
Started the program
Got exception while getting the token: System.Exception: Failed to get token
```

Одна из частых ошибок -- люди не предусматривают обработку завершения стрима с ошибкой. В данном случае ошибка обработана (выведена в консоль), но выход из программы не осуществлен, так как onComplete не вызвался. В данном случае в `exit = false` достаточно перенести в Finally.

{% highlight csharp %}
loginRepository.GetToken("device id")
	.Finally(() => exit = true)
	.Subscribe(token => {
		Console.WriteLine($"Got token: {token}");
	}, e => {
		Console.WriteLine($"Got exception while getting the token: {e}");
	}, () => {
		Console.WriteLine("Finished getting the token");
	});
{% endhighlight %}

Теперь, обычная практика, добавить retry и таймаут, мало ли, может плохое соединение, и можно повторить запрос.

{% highlight csharp %}
loginRepository.GetToken("device id")
	.Timeout(TimeSpan.FromSeconds(1))
	.Retry(3)
	.Finally(() => {
		exit = true;
		Console.WriteLine("Finished getting the token");
	})
	.Subscribe(token => {
		Console.WriteLine($"Got token: {token}");
	}, e => {
		Console.WriteLine($"Got exception while getting the token: {e}");
	});
{% endhighlight %}

Чтобы поддержать задержку ошибки, нужно немного изменить метод `ReturnError`:

{% highlight csharp %}
private IObservable<string> ReturnError() {
	return Observable.Return("empty")
				.Delay(TimeSpan.FromSeconds(10))
				.SelectMany(o => Observable.Throw<string>(new Exception("failed to get token")));
}
{% endhighlight %}

> Обратите внимание! Мы не можем сделать просто `Observable.Throw<string>(new Exception("error")).Delay(TimeSpan.FromSeconds(10)))`. В таком случае Delay не будет работать, так как ошибка прерывает стрим моментально. Поэтому здесь я комбинирую стрим через SelectMany. Так же мы не можем воспользоваться Observable.Empty, так как он тоже сразу закроет стрим.

Оператор Retry организован таким образом, что при возникновении ошибки, он переподписывается на стрим. В текущей реализации логика в методе `GetLogin()` не будет вызвана при переподписке. Поэтому необходимо его обновить.

{% highlight csharp %}
public IObservable<string> GetToken(string deviceId)
{
	return Observable.Create<string>(observer => {
		Console.WriteLine("GetToken called");
		getTokenHandler = getTokenHandler == null
							? (Func<IObservable<string>>)ReturnError
							: ReturnToken;
		return getTokenHandler().Subscribe(observer);
	});
}
{% endhighlight %}

Здесь используется фабрика Observable.Create, которая будет вызывать функтор при каждой подписке. Таким образом мы можем быть уверены, что возвращаем разные результаты при Retry.

Запускаем программу:

```
Started the program
GetToken called
GetToken called
GetToken called
Got exception while getting the token: System.TimeoutException: The operation has timed out.
Finished getting the token
```

GetToken вызвался трижды, при этом весь стрим завершился с ошибкой таймаута. Если мы изменим задержку на приемлемые значения, то увидим следующий вывод:

```
Started the program
GetToken called
GetToken called
Got token: user_stub_token
```

Прилеплять логику по ретраю и таймауту извне не красиво, поэтому мы можем перенести это в репозиторий.

{% highlight csharp %}
static class APIRxExtensions {
	private const int DEFAULT_TIMEOUT_SECS = 10;
	private const int DEFAULT_RETRY_COUNT = 3;
	public static IObservable<T> WrapWithRetryAndTimeout<T>(this IObservable<T> observable) {
		return observable
				.Retry(DEFAULT_RETRY_COUNT)
				.Timeout(TimeSpan.FromSeconds(DEFAULT_TIMEOUT_SECS));
	}

}

public class LoginRepositoryStub {
	public IObservable<string> GetToken(string deviceId)
	{
		return Observable.Create<string>(observer => {
			Console.WriteLine("GetToken called");
			getTokenHandler = getTokenHandler == null
								? (Func<IObservable<string>>)ReturnError
								: ReturnToken;
			return getTokenHandler().Subscribe(observer);
		}).WrapWithRetryAndTimeout();
	}
}
{% endhighlight %}

Ну и в конце, после авторизации, нам нужно получить UserState.

{% highlight csharp %}

{% endhighlight %}

Таким образом, Retry и Timeout будут инкапсулированы в репозитории, и пользователю не нужно о них думать.

Финальный стрим будет выглядеть следующим образом:
{% highlight csharp %}
IDisposable disposable = loginRepository.GetToken("device id")
	.SelectMany(token => {
		Console.WriteLine($"Got token: {token}. Fetching user state");
		return loginRepository.GetUserSave(token)
				.Select(state => {
					Console.WriteLine("state: " + state);
					return state;
				});
	})
	.Finally(() => {
		exit = true;
		Console.WriteLine("Finished getting the token");
	})
	.Subscribe(userState => {
		Console.WriteLine($"User's cash: {userState.cash}");
	},
	e => {
		Console.WriteLine($"Got exception while getting the state: {e}");
	},
	() => {
		Console.WriteLine($"Completed");
	});
{% endhighlight %}

## Соблюдаем философию RX
<a name="understanding-paradigm"></a>

Итак, давайте подведем краткие итоги. На данном этапе ясно, что RX позволяет легко и прозрачно внедрять логику вроде ретрая или таймаутов. В целом, логика работы с асинхрорнными операциями выглядит более стройно и понятно.

> Пытливый ум читателя может заметить, что то же самое можно было бы сделать с помощью async/await, но не во всех версиях Unity/С# оно доступно, да и обработка ошибок, на мой взгляд, при таком подходе, не так прозрачна. В любом случае -- решать вам.

Давайте вернемся к началу статьи. Я сказал, что важно понимать парадигму, чтобы максимально извлекать из нее выгоду. Что в приведенном мною примере не так?

Реактивное программирование потому и называется реактивным, что весь код должен реагировать на события. Мы должны создавать все стримы событий заранее. Тогда мы будем уверены, что, когда прилетит событие, все обновится как надо.

В описанном же примере стрим "пассивный". То есть посылка запроса происходит во время подписки на событие. Мы одновременно запрашиваем данные, и их читаем. Более того, такая подписка действую всего лишь один раз, из-за `SingleAsync`.

Это очень ограничивает варианты использования кода. Например, мы можем либо привязать код обновления к загрузке какого-либо вью, либо к кнопке "refresh". Если нам нужны обновления в реальном времени, то мы делаем периодический refresh, что совсем не красиво.

Не смотря на то, что это естественно для REST API, это убивает всю гибкость и выгоду от RX.

В идеологии RX, запрос данных и реакция на событие об обновлении данных &mdash; две разные задачи, которые должны обрабатываться отдельно. Если вы знакомы с паттерном [MVVM](https://ru.wikipedia.org/wiki/Model-View-ViewModel), то можете заметить, что в нем изменение модели и обновление вьюхи разделено. Обновление вью производится с помощью байндингов, которые реагируют на события. Изменение модели производится с помощью команд.

RX по сути требует такого же подхода. Как же это воплотить при работе с API?

## Reactive API

Представим, что запрос данных &mdash; это команда в терминах MVVM. А ответы от API -- это событие, которое может прикатить в любое время. Если мы их разделим, то все вьюхи при старте сразу могут подписаться на событие обновления, а мы можем быть уверены, что данные будут всегда акутальны.

Запросить же обновление данных мы можем из любого места программы. При этом, в отличие от предыдущего подхода, нам не нужно будет менять код обновления view. Да и вообще мы можем быть совершенно отвязаны от view.

Итак, интерфейс меняется следующим образом:

using System;
using System.Reactive;
using System.Reactive.Linq;
using Game.Models;

{% highlight csharp %}
using System;
using System.Reactive;
using System.Reactive.Linq;
using Game.Models;

public interface ILoginRepository {
	#region commands

	void fetchToken(string deviceId);
	void fetchUserSave(string token);

	#endregion

	#region events

	IObservable<string> GetTokenObservable();
	IObservable<UserState> GetUserSaveObservable();

	#endregion
}
{% endhighlight %}

По интерфейсу сразу понятно как данные запросить, и как подписаться на обновления.

Теперь к реализации.

Что я меняю первым делом -- создаю отдельные Observable:

{% highlight csharp %}
public class LoginRepositoryStub : ILoginRepository
{
	private BehaviorSubject<string> _tokenSubject = new BehaviorSubject<string>(null);
	private BehaviorSubject<UserState> _userStateSubject = new BehaviorSubject<UserState>(null);
}
{% endhighlight %}

BehaviorSubject &mdash; классная штука. При подписке на него он сразу эммитит последнее известное ему onNext значение. Таким образом, если токен уже был получен, то подписчик будет обладать актуальным значением. Это такой своеобразный кэш.

Если в какой-то момент мы поймем, что токен надо обновить, то достаточно просто вызывать fetchToken() и все заинтересованные его получат.

Даже если нам необходимо периодическое обновление, то его легко сделать в одном месте по таймеру. Подписчиков может быть сколь угодно много.

Но это еще не все. Часто в приложениях нужен прямо таки настоящий реалтайм, когда сервер уведомляет клиент об изменениях. Например, с использованием сокетов. Если это ваш случай, то изменить код с REST API на сокеты элементарно. Все подписки остаются прежними. Меняется только транспорт: присоединяемся к сокету, и прокидываем событие в BehaviorSubject.

Важный момент: такой стрим не завершается никогда, при нормальных обстоятельствах. Если стрим закрылся, то это либо программа завершается, либо произошла ошибка. То есть, например, http ошибки прокидывать в этот стрим не нужно. Вся обработка ошибок должна уйти на другой слой логики.

Итак, давайте посмотрим как изменилась реализация с разделением кода.

{% highlight csharp %}
public class LoginRepositoryStub : ILoginRepository
{

	// нужно учитывать, что при подписке может прийти null
	private BehaviorSubject<string> _tokenSubject = new BehaviorSubject<string>(null);
	// нужно учитывать, что при подписке может прийти null
	private BehaviorSubject<UserState> _userStateSubject = new BehaviorSubject<UserState>(null);

	private Action getTokenHandler;

	private void ReturnToken() {
		_tokenSubject.OnNext("user_stub_token");
	}

	public IObservable<string> GetTokenObservable()
	{
		return _tokenSubject;
	}

	public IObservable<UserState> GetUserSaveObservable()
	{
		return _userStateSubject;
	}

	public void fetchToken(string deviceId)
	{
		// вся логика работы с транспортом должна уйти на этот слой
		Observable.Timer(TimeSpan.FromSeconds(1))
			.Subscribe(__ => {
				ReturnToken();
			});
	}

	public void fetchUserSave(string token)
	{
		// вся логика работы с транспортом должна уйти на этот слой
		Observable.Timer(TimeSpan.FromSeconds(1))
			.Subscribe(__ => {
				_userStateSubject.OnNext(new UserState());
			});
	}
}
{% endhighlight %}

Здесь я сделал просто заглушку, которая присылает события с задержкой. Но на деле, в этом месте должен посылаться запрос и обрабатываться ошибки. Если пользователю нужно знать об ошибке, то нужно вывесить отдельный Observable с человекопонятным типом ошибки.

Теперь посмотрим на сам стрим.

{% highlight csharp %}
static void Main(string[] args)
{
	Console.WriteLine("Started the program");
	bool exit = false;
	IDisposable disposable = loginRepository.GetTokenObservable()
		.Finally(() => {
			Console.WriteLine($"Closing token observable");
		})
		.Where(token => token != null)
		.Subscribe(token => {
			Console.WriteLine($"Got token {token}");
			loginRepository.fetchUserSave(token);
		},
		e => {
			Console.WriteLine($"Got exception while getting the token: {e}");
		});

	loginRepository.GetUserSaveObservable()
		.Where(state => state != null)
		.Subscribe(state => {
			Console.WriteLine($"User's cash: {state.cash}");
			exit = true;
		});

	loginRepository.fetchToken("device id");
	while (!exit) {
		Thread.Sleep(1);
	}
}
{% endhighlight %}

Интересные моменты:

1. Теперь две отдельные подписки
2. Подписки учитывают, что может прийти null, поэтому фильтруют ивенты
3. Команды на запрос данных могут находиться в любом месте программы, как до подписки, так и после. Завязка на порядок вызова отсутствует.

## Подводим итоги

Фух, получилась довольно большая статья. Но основная мысль такова: недостаточно использовать парадигму, нужно полностью понять и принять ее философию. Если мы это не делаем, то сильно себя ограничиваем, тем самым теряя всю пользу от подхода.

Сделаю удобную работу с API можно и нужно. Если утилизировать возможность реактивности по максимуму, разделяя запросы и события, то код будет понятен и предсказуем.

Тем не менее, я хочу предостеречь о сложностях отладки RX стримов. когда что-то не работает, приходится повозится, зарываясь в дебрях колстека. Это один из негативных моментов работы с RX, да и ФП в целом.

Как всегда, если у вас есть мысли по теме &mdash; буду рад услышать. Комменты, или ПМ приветствуются.