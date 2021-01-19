---
title: 'How to clean a legacy code: stop complaining, start doing'
date: 2021-01-15T00:00:00+03:00


guid: /en/programming/how-to-clean-a-legacy-code-stop-complaining-start-doing.html
permalink: /en/programming/how-to-clean-a-legacy-code-stop-complaining-start-doing.html
header:
  teaser: /assets/images/abstract-code.jpg
  overlay_image: /assets/images/abstract-code.jpg
  overlay_filter: 0.8
categories:
  - Programming
tags:
  - Programming
  - Management
excerpt: >
  Most of the articles and books tell you how to write a "good code". But in real life, you often find yourself deep in the shit after joining some company or project.
---


## Blue or Red pill?

When it happens to join a project with a poor codebase, usually you have two options:

1. Complain about the code
1. Search for another job
1. Start doing everything right

The first two options are easy and crystal clear. But the last one is not so simple.

I was in the same situation a bunch of times, and always chose the last one. And here what worked for me:

1. Plan changes
1. Isolate legacy
1. Lead by example
1. Teach
1. Scale
1. Clean the shit in small and quick iterations
1. Document the code as you refactor
1. Write tests

Now, before getting into more details, let's think a bit.

## Why does this happen?

The poor state of the codebase is a result of previously made decisions. It's hard to tell if they were right or wrong. But the point is that "clean code" is not always a good option for business.

Nobody expects you to write a clean and neat code for a prototype. You should make the prototype as fast as you can, check your hypothesis, and throw it away.

Yes, some people CAN write code fast and clean, but it's hard to find them. And startups, for example, do not have time and money for that.

As the company grows, priorities change, and businesses need larger teams, more features etc. It's impossible to continue in a paradigm where speed is the only priority.

So, being an experienced developer, you likely may find yourself in a project which was written by less experienced people. And that's fine.

My point is that complaining and blaming people for being dumb is not professional.

Now, let's move to the points of healing the project in more details

## Plan changes

All changes for the good should start with a plan. Usually I identify what needs to be improved, break it down for tasks, roughly estimate them, and also assess benefits this task can bring to the codebase in a 5-star scale.

Then I prioritize a backlog by the highest benefit and the smallest size.

## Isolate legacy

To start refactoring without blocking feature development, you need to commit changes in small chunks and predictable deadlines.

One of the handiest ways to run smooth ongoing refactoring in huge and dynamic projects is to isolate legacy parts.

This means before rebuilding all of the "legacy" internals, you need to hide them behind a "clean" abstraction layer.

So you have to have a clear vision of the architecture you want to get to. Then you need to build that "clean" abstraction interface and put it before the "legacy" part. So all the code users will see only a new, clean interface, and already may start building a better code.

It's done with the help of the "Adapter" pattern.

Meanwhile, the legacy part may be ugly, but the adapter connects it to the clean world.

Once it's done, you can start reworking the legacy code. Since the legacy code is isolated, your changes won't affect anybody else. It literally unties your hands.

## Lead by example

It might be helpful to lead changes by example. This means you need to show your teammates how changes may be executed. It's absolutely unnecessary to have a "Lead" position to do this.

Not everybody will agree with changes, but if you did your planning well, it should be easy to "sell" them.

The next possible step might be selling these changes to your manager, or whoever decides what team should be working on.

After you're done with it, you might start with actual leading by example.

You need to take the first task from the backlog, and do it as you see it. It will be an example of how people can take steps towards a bright future.

The "Lead by example" strategy helped me a bunch of times where other strategies failed. Being skeptical for a programmer is pretty normal. But when you do not only say that it's possible to make things better, you actually DO it, and do it well, people start changing their minds.

They see that you've managed to do this, and it means that they can do it too. You gain trust, and future changes will go smoother.

## Teach

The "Lead by example" strategy is also a good opportunity to teach people. You can walk through your teammates over your solution and ideas, and show them improvements using Before/After contrast.

People always understand concepts better, having real-world examples rather than some abstract philosophic statements.

Make people feel comfortable to ask questions, share ideas, etc.

## Scale

Once you proved that your plan is good, and you're on the same page with the team, it's time to scale it out.

Recruit more team members to help you out. Guide them through this process. After a few iterations, everybody will see fruits of labor and be happy to help more.

## Clean the code in small and quick iterations

It should not be necessary to say why you would need to execute refactoring in small iterations, but yet.

1. Large refactoring is hard to review
1. If large refactoring got declined by the team, a lot of manhours be wasted. Doing small iterations is much less risky
1. More you spend time on refactoring, the more complex merge will be for you and your teammates. You might find yourself solving conflicts over and over, and something will likely break
1. We are bad at estimations, so if a refactoring slips the deadline, you might likely be forced to cancel it
1. Focused changes are always easier to deliver
1. Small changes have fewer risks to break something and are easier to test
1. Never mix the code refactoring with the feature development. You will have a huge mess in this case. You won't be able to release a feature without finishing refactoring before it, or rollback refactoring separately.

Focus is the most important part. It's so easy to deep dive in the shit, and start cleaning it from the bottom.

But you should force yourself to stop and limit the scope only to what's is relevant for the current iteration.

If you do, the team will be happy to work that way, and eventually, you'll get to the final point.

If you don't, well... massive refactoring won't be finished at all, or it will break too many things.

## Document the code as you refactor

Refactoring is also a good opportunity to clarify things. I rarely see a documented code, but often find myself questioning parts of the code, as it's hard to tell what this code is doing and why.

If you managed to find out business requirements or some details about it, document it! This will help you or anybody else who will get back to this part later.

Also, it's helpful to document your thoughts on your vision on the refactoring approach.

For example, I add code comments advising what can be done next to improve this or that part, and how to do it better. So if my colleagues stumble on it, they understand how to move forward.

## Write tests

You're lucky if the subject of the refactoring has any tests at all. But most likely it's not.

Ideally, before refactoring, you should write tests, to make sure, that after refactoring behavior remained the same.

But we're not in the ideal world. Often there's no test infrastructure at all.

Here what I usually do:

1. Provide testability for the new "clean" code first.
1. Test all of the new features which should be clean.
1. Then you can start bringing testability to the legacy code, step by step, small chunks, remember?

## Any decent programmer should be able to do both at the same time

Though this is true, and I didn’t say that the one shouldn’t, but I personally, find it a bad idea, if the refactoring is not tiny. In this article I meant huge refactoring activities, which can’t be done in a single day and by a single person.

The point of the article is just to show a structured and predictable way of cleaning up the code, that everybody can understand.

As a programmer, you see what needs to be done, a pool of tasks. As a manager, you understand that refactoring can be mixed into the daily work, and you won’t be spending development resources for weeks with no visible result.


## Final thoughts

Reworking a legacy code is a tough and long task. But it's possible. It's easy to say that we need to rewrite everything from scratch. But structured and planned refactoring is a much better way.

Refactoring has a cumulative effect. With each iteration, it will be easier and easier to work with the code. So be the leader, take the hardest steps, show how this can be done.

--

What works for me, might not work for you, but still, I believe you might give it a try.