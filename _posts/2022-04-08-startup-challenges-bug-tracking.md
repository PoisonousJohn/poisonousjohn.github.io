---
title: 'Startup challenges: Lost bugs, anxiety and burnout'
date: 2022-04-23T00:00:00+03:00


guid: /en/startup-challenges/ensuring-the-quality-appium.html
permalink: /en/startup-challenges/ensuring-the-quality-appium.html
header:
  teaser: /assets/images/bug-prioritization-matrix.png
  overlay_image: /assets/images/bug-prioritization-matrix.png
  overlay_filter: 0.8
categories:
  - Processes
tags:
  - Management
  - Processes
excerpt: >
  Bugs in your company get lost in the chat, users leave, management blames engineers, engineers feel guilty and anxious, get burned out? We've been there. Here's what we learned.
---

## First, here's the solution that worked for us (TL; DR;)

1. Start by creating a doc on the QA process
1. Split the process of registering bugs and fixing them
1. Create a dedicated role for registering bug reports
1. Assign duty schedule for the role
1. Start registering ALL of the bugs in the task tracker, even if engineers are unhappy with it
1. Each bug should be assigned a priority depending on the criticality level
1. Track metrics with your task tracker

## Reasons to change the process

We've run a performance review that uncovered a bunch of issues in our development processes.

The major issue raised by devs was the inability to stay in the flow due to constant distractions on bug reports.

They had to change focus during the feature development to identify the bug, its priority, etc. There was no specific duty process, so people dealt with the bugs sporadically.

As a result, devs said they were in a constant anxiety state. The feeling that something is wrong with the product. The urge to fix it instantly as the bug arrives.

The planned release date also slipped due to these issues.

And devs didn't feel right to tell the team they were working on the bugs instead of the feature.

## A doc on the QA process

We didn't have any doc on how to handle bug reports. People did it differently. Creating a doc and keeping it up-to-date helped to align the process between teams and people. Everybody acts the same. Not to mention people onboarding now goes much faster.

## Split the process of registering bugs and fixing them

QA department in mature companies usually keeps track of all bug reports by registering them in a task tracking system. In our startup, we believe the devs own the quality of their outcome, so the responsibility to track bugs is on them.

We didn't have the former process documented. Devs usually started fixing the bug as soon as they had time for that.

Devs spent much time fixing minor issues while critical stuff awaited in the queue.

We split the former process into two phases. The first one is to register the bug in the task tracker. The second one is the fixing itself.

The most important part of the registration process is assigning bug priority. If it's not critical, a developer puts the bug into the queue.

A developer should fix critical bugs ASAP.

On the next planning iteration, devs get bugs from the queue to fix according to priority. They plan what bug to fix in the current iteration, considering the workload.

Everybody's now happy to know that they can reduce distractions on bug reports and plan their work.

## Create a dedicated role for registering bug reports

In our company, we call it "Bug Hunter." Devs are wearing the hat of this role. But in any other company, it can be, for instance, QA.

Having a dedicated person dealing with bug reports keep others focused on their job. They don't feel anxiety anymore since they know somebody is on duty.

## Assign duty schedule for the role

The duty schedule is really important. We let people self-organize to decide who's on duty. But the general recommendations are:

- make sure the team passes the torch since nobody wants to be the "Bug Hunter" forever
- for mobile devs, it's enough to check bug reports one or two times a day. The possibility of missing the critical bug is quite low. Besides mobile app release cycle is pretty slow. The person wearing the "Bug Hunter" hat is not 100% consumed by that role, so it's possible to do other tasks as well
- organize the process of passing the context between the last duty person and the current one. It can be some unfinished tasks, actions, etc.

## Start registering ALL of the bugs in the task tracker, even if engineers are unhappy with it

Unless you have all bugs registered, you have no idea how good or bad your product quality is.

Having the broader picture helps to make the right decisions. For example, you can have a lot of minor bugs and a few critical ones. It's reasonable to start fixing critical ones first.

The other insight might be discovering a cluster of bugs. For example, having a bunch of bugs in the authorization module might mean there's a technical debt to pay. It's better to plan a refactoring instead of applying minor patches.

We asked our devs to choose the "Bug Hunter" and start registering all the problems they observe in the task tracker. We provided the template for bug tickets to unify and simplify the process.

At first, our devs were not happy about it. But after a month, they saw the benefit. They identified parts of the system needing more attention and care and adjusted plans for technical improvements accordingly.

By bounding all PRs to tickets, we've got another benefit. Besides the standard commit message, git blame could tell you the complete story. **The test case** of the problem, **expected result** and **actual result** before the fix.

## Each bug should be assigned a priority depending on the criticality level

The next challenge is to deal with the growing queue of bugs. We've adopted the standard way of prioritizing issues via the matrix, where the X-axis is the bug severity, Y-axis is the number of users affected. The resulting value is the ticket's priority. W/F stands for "Won't fix"

![Bug prioritization matrix](/assets/images/bug-prioritization-matrix.png)

The matrix is easily adjustable for the company's needs.

Our bug severities are:

1. The security issue
1. Problem with onboarding where CX can't help manually and requires effort from devs (otherwise it should be severity 7).

    The bug affects a primary feature. But only if (all of below true):

      - a bug appeared in recent releases
      - customer have no alternative ways to do the action or can't be sorted out by the Customer Support team and devs (otherwise it should be Severity 7)

    **If it was in prod for a long time** (a few weeks or more), then it should be Severity 3
1. The "Severity 2" bug existing in prod for a long time (a few weeks or more)  but has been discovered recently
1. Application crash
1. The client cannot perform secondary functions (all but severity 2), but the Customer Support  team or devs can't help resolve it manually, or there is no alternative way to do it (otherwise it should be Severity 7)
1. UI is not correct, or UX problem
1. There's a bug not covered by previous severities, but the Customer Support team can resolve it manually or with little to no effort from devs
1. The speed of the application suffers
1. The application does not support phone model

## Track metrics with your task tracker

In our task tracker, we use tags to assign a priority. Each month we look at the report and see the trends. For example, you should expect the high-priority bugs queue to be processed faster than others.

We didn't set any concrete numbers as a target metric for the team. Instead, we expect a declining trend in the bugs queue.