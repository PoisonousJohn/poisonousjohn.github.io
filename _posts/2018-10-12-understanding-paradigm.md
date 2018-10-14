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

Давайте посмотрим на пример. Я буду писать на .Net Core и Rx.Net, но его можно легко транслировать на Unity и UniRx.

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

Таким образом, Retry и Timeout будут инкапсулированы в репозитории, и пользователю не нужно о них думать.

