---
title: 'Startup challenges: Case 1, Untamed UI'
date: 2999-01-19T00:00:00+03:00


guid: /en/management/how-to-clean-a-legacy-code-stop-complaining-start-doing.html
permalink:
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
  A retrospective of some troublesome case, which was a threat to our startup.
---

I've spent half of my career developing games. UI there is complicated: non-standard elements, animations, effects, etc. Sometimes it was quite a challenge.

When I joined [ANNA](https://anna.money), I thought a mobile banking app interface should be easy to develop. I expected some complicated business logic for the forms to be the main challenge for developers. But the team was struggling and slowing down when a task had some visual-related parts.

That felt unusual.

## TL;DR;

What could kill our startup:
1. No design system on the Design department side
1. No reusability on the Developers department side
1. No proper communication between departments
1. No leadership to take this under control

## No design system

To understand the problem, I needed to have some insights from within the team. So I took a random task from the backlog to experience development flow myself.

During my first quest, I uncovered a bunch of problems.

Before starting my work on the new screen, I identified some parts to reuse from other screens.

I noticed they were slightly different from the ones provided by designers. I checked other screen mockups, and the difference was there too.

For some reason, designers didn't reuse the existing UI element as is. They just copied them with slight changes instead, for instance, different spacing, typography, color.

So I reached out to the design team and asked them why is it so? There were just doing great design, but didn't have any system to keep everything in order.

Well, they were aware about design system, but just didn't adopt that practice. Startup way, you know. A lack of order is quite common for startups, right?

It was not a problem at first, but it showed up as the app grew, team also grew, and it got out of control.

And led to another problem.

## No reusability of UI components in the code

Since designers were producing non-reusable UI (remember, there were slight changes here and there), developers could not create reusable code for the UI.

There were proper reuse of basic things like typography styles, colours, some paddings, buttons and text input, but that's it.

Those were the only stable things in their life.

Of course, new implemented screens were done almost from the scratch. When designers tried new UI live in the app, they spotted mistakes here and there, over and over again. That increased lead time of the tasks dramatically.

## No proper communication between departments

We are an international company. Our developers are mostly in Russia, and designers in UK.

Due to language barrier, cultural differences, there were no common language between departments.

Developers were trying to explain that the app UI needs a system, but failed. Lack of trust and understanding.

## No leadership to take this under control

There were nobody in the company to take the situation under control. Both parties were suffering. Designers were unhappy because they could not do much changes in UI, since tasks development were really slow. Developers were unhappy because there were no system in designs produced, which slowed everybody down.

At this point, one usually step-up and take a lead to help everybody have a common ground.

In ANNA this continued quite a while, so CTO decided to hire someone to help with it, and that was me, yay!

## What actions did I take to address the situation

### Have a beer to build a trust

First priority point to me was to build a trust with the design department. So I paid a visit to them for a couple of weeks and started discussing problems of both parties.

Designers were quite skeptic and closed, but few pints of beer after the working day helped us a lot to understand each other. A recommended way of building trust!

### Developers problems: showcase

I tried to explain why development is slow. But with some visual illustrations of the problem. I showed them how developers build UI. And what exactly is a pain in the ass. They demonstrated some of their pain points.

Having all of the problems in mind, we came up with few ways of addressing them.

### Solution

We weren't going to invent the wheel, so we just agreed that we need to have a design system and to follow some rules. So we decided to try an [Atomic design system](https://atomicdesign.bradfrost.com/).

We did few exercises of breaking down our app's interface according to the new approach.

![Atomic design exercise](/assets/images/atomic-design-exercise.png)

It worked out quite well, so we agreed to run few more experiments within our teams. We came up with the following roadmap:

![A roadmap of the Design System journey](/assets/images/design-system-roadmap.png)


