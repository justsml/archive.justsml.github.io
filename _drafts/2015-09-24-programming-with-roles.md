---
layout: post
title:  "Programming with Class"
date:   2015-09-07
modified:   2015-09-07
categories: programming
tags: [programming, basics, class design, field naming, source code, organization]
image:
  feature: abstract-5.jpg
  credit:
---

#### _Work-in-progress (updated Sep. 2015)_

# Beautiful Engineering: Models & Data

### The issue at hand is deceptively simple & subtle: **Naming**

> I want to avoid the super-fancy-tech-lingo for this article; and hopefully I can illustrate the issue in a more useful fashion.

> While covered in exhausting detail before, the subject matter often gets too technical for the novice programmer to draw any practical understanding. You probably don't need to read this if the following makes sense: `No-Sql denormalization strategy`, or `Boyce Codd Normal Forms`

> Recommended reading includes:
>
1. Book: Code Complete
2. [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3. [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)


1. ALL access to your app must be through the 'natural filters' which Roles-based designs provide
1
I'm sure you could reduce total # lines of code of ' in your app's database, I Trust me, you probably

Try to _**invent as little as possible**_ while coding. Use established libraries & patterns.

Even if you are the kind of psychopath who finds it **fun to hand-roll OAuth modules**... _Just Don't Do It_. (Answer: For Express NodeJS sites, use Passport JS)



In my homeland, Africa, there is an old proverb:

> You better have a fucking good reason to create 2- and 3- word field names

Ok, fine, maybe that's not a proverb.

It's critical. Naming fields predictably - email, password(Hash) - provides for **MASSIVELY** more **DURABLE** integration with other code/libraries.

Did I mention how much smoother integrating new, yet-to-be-imagined features becomes?







<!-- ![schema refactor][schema_refactor] -->

[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
[not_a_fan]: https://res.cloudinary.com/ddd/image/upload/timeout-expired.gif
[teamwork]: https://res.cloudinary.com/ddd/image/upload/teamwork__tumblr_n2df80cPZa1s373hwo1_400_ghv4xn.gif
[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
[new_feature]: https://res.cloudinary.com/ddd/image/upload/simba-toss-error.gif
[good_cry]: http://res.cloudinary.com/ddd/image/upload/drinking-desk_r0cknr.gif

