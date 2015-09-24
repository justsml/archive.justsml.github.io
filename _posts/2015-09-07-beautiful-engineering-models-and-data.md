---
layout: post
title:  "Beautiful Engineering: Models & Data"
date:   2015-09-14
modified:   2015-09-26
categories: programming
tags: [programming, basics, class design, field naming, source code, organization]
image:
  feature: abstract-5.jpg
  credit:
---

#### _Work-in-progress (updated Sep. 2015)_


### The issue at hand is deceptively simple & subtle: **Naming**

> I want to avoid the super-fancy-tech-lingo for this article; and hopefully I can illustrate the issue in a more useful fashion.

> While covered in exhausting detail before, the subject matter often gets too technical for the novice programmer to draw any practical understanding. You probably don't need to read this if the following makes sense: `No-Sql denormalization strategy`, or `Boyce Codd Normal Forms`

> Recommended reading includes:
>
1. Book: Code Complete
2. [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3. [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)


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


Let's examine some of the subtle issues (probably familiar):

=======

Why is naming a field `agentEmailPrimary` the worst?
For starters, you are **not** creating an entirely new object unto the universe. Over-specificity has some traps:

1. 'Locked' into highly specific name, means `agentEmailPrimary` probably make your views and related code **0% reusable**, and featuring annoyingly recurring bugs like:
    - Data not syncing between tables (not obvious if `user.email` needs to propagate to `agent.agentEmail` or vice-versa - nevermind complexity of manually implementing where & how to enforce this 'logic' ...)
    - Validation rules/logic are likely duplicated & inconsitent.
    - Increasingly, your project will resemble a shaky Jenga tower.
    - Fragility piles up with every single new file, as an extremely high attention to detail is required for even trivial changes

I know, you probably feel something like...

![fuck this][fuck_this]


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
1. Try keep **all field names** to a **single word/noun/pro-noun**.
  1. There is **no such thing** as `Agent.agentEmail` or `Agent.agentPhonePrimary`. Period.
  1. By using Highly Specific Names, you cast-in-stone a specific level of `code-reusability` and `durability`, well, specifically **ZERO %**.
  1. Don't think you are doing yourself any favors with crap like this `User.profileSummaryEmail` (where 'profile' could include contact details for a personal ads site) . This is probably a good point to create a new table, say `Profiles` which includes `Profiles.email`.




<!-- ![schema refactor][schema_refactor] -->

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

