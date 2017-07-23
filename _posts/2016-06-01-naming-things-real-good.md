---
layout: post
title:  "Naming things real good"
date:   2016-06-01
modified:   2017-07-22
categories: programming
tags: [programming, patterns, naming, source code, organization]
image:
  feature: abstract-5.jpg
  credit:
---

## Let's tackle something deceptively simple & subtle: **Naming**

> I want to avoid the super-fancy-tech-lingo for this article; and hopefully I can illustrate the issue in a more useful fashion.

> While covered in exhausting detail before, the subject matter often gets too technical for the novice programmer to draw any practical understanding. _You probably don't need to read this if the following makes sense `Boyce Codd Normal Forms`_

## The Problem - by Example

Have you ever designed a `data model` (in code, Sql, or excel worksheets)?
Does the following look familiar?

```
*** anti-pattern - don't copy-paste ***
* User
  - id
  - avatarUrl
  - email
  - passwordHash

* Agent
  - id
  - primaryPhoto
  - agentName
  - agentEmail
  - agentPhoneMain
  - agentEmailPrimary
  - agentPhonePrimary
  - agentAddressLine1
  - agentCompanyName
  - agentCompanyAddress
  - *userEmail* - 'Pointer' to User table ^^^
```

If this is familiar to you, I'll bet you:

1. Feel any change to your app will necessitate hours of arduous debugging.
1. Fear ANY Changing Requirements

![schema refactor][schema_refactor]



## The Cost of Bad (Naming) Habits

Why is naming a field `User.agentEmailPrimary` _the worst_?

For starters, you are **not** creating an entirely new object unto the universe. I hope you meant something like `agent.emails[0]` or `user.displayEmail`...

Over-specificity & entangled code has some consequences:

1. Strong hint there's some bad schemas, modular design or seperation of logical objects.
1. When you are commited to highly specific name, it means way less reusable code, with annoyingly recurring bugs like:
  - Mismatched names can occur frequently in templates and code, leading to a frustrating team experience.
  - Awkward 3-part names are a strong red flag that fields may have been arbitrarily added to tables/schemas.
  - Validation rules/logic somehow manage to be used both repetitivly and inconsitently.
  - Fragility piles up with every single new file, as an extremely high attention to detail is required for trivial changes.
1. `agentEmailPrimary` could mean a few different things. Avoid ambiguity with **shorter names**.
  * Watch out for silly excess wording. `Primary`? Just leads to more questions: Is there a Secondary? Is it for their Primary Next-of-kin?
  * Use a new object `agent`, so something like `agent.emails[0]`. Or give more meaning in the context of a `user` with `user.displayEmail`


Hang in there, we're almost to a suggested solution...


## A Solution

```
// Dan's Recommended Schema Consolidation:

User
  - id
  - role: ['agent', 'lead', 'admin']
  - name
  - phone
  - address
  - email
  - passwordHash
  - company
    - name
    - address

```

I removed the `Agent` table, as it didn't contain fields which were uniquely related to Agents.

All changes were made with these general ideas in mind:

1. Eliminate unessesary tables. If you have a few dozen tables, this step is mandatory.
  1. Try merge related tables. **Important if you are coming from a SQL background to No-SQL**
  1. Delete redundant data collection (e.g. remove `ActivityLogs` table if replaced by Google Analytics)
1. Try keeping **all field names** to a **single word/noun/pro-noun**.
  1. There is **no such thing** as `Agent.agentEmail` or `Agent.agentPhonePrimary`. Period.
  1. By using Highly Specific Names, you cast-in-stone a specific level of `code-reusability` and `durability`, well, specifically **ZERO %**.
  1. Don't think you are doing yourself any favors with crap like this `User.profileSummaryEmail` (where 'profile' could include contact details for a personal ads site) . This is probably a good point to create a new table, say `Profiles` which includes `Profiles.email`.


#### And if you think I've just got crazy ideas, hopefully this will help:

![fuck this][fuck_this]



> Recommended reading includes:
>
1. Book: Code Complete
2. [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3. [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)



[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
[not_a_fan]: https://res.cloudinary.com/ddd/image/upload/timeout-expired.gif
[teamwork]: https://res.cloudinary.com/ddd/image/upload/teamwork__tumblr_n2df80cPZa1s373hwo1_400_ghv4xn.gif
[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
[new_feature]: https://res.cloudinary.com/ddd/image/upload/simba-toss-error.gif
[drinking]: http://res.cloudinary.com/ddd/image/upload/v1442175801/system-maint-anon.gif
[cat_outfit]: http://res.cloudinary.com/ddd/image/upload/v1441143858/cat-bee-fail.gif
[cat_loops]: http://res.cloudinary.com/ddd/image/upload/v1441143869/cat-loops.gif
[cat_bowl]: http://res.cloudinary.com/ddd/image/upload/v1441143883/kitten_bowl.gif
[cat_wtf]: http://res.cloudinary.com/ddd/image/upload/v1441143878/cat-wtf.gif
[endless_loop]: http://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif

