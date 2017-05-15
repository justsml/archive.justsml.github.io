---
layout: post
title:  "Higher Order Programming"
date:   2015-09-22
modified:   2015-11-13
categories: programming
tags: [programming, patterns, models, source code, organization]
image:
  feature: abstract-5.jpg
  credit:
---

# Array- or Set-based Coding Style

## An Anti-Pattern?

This is an exploration of advantages gained when you **code everything as an array.** (Using Jedi concepts from SmallTalk)

Here's some guiding principles:

1. All input is array-like. Even if an array of 1.
1. Higher level functions should generally accept AND return arrays. (Except for callback methods for loops: map/reduce/each/filter)
1. 99 out of 100 devs code suffers from what I call `acute schema surplusage` syndrome -based models.
1. Yes, beware `fat clASS-backed models` - with all the predictable trappings: fragile `instance state` - so many levers and knobs to mess with, DB transactions, sql locks, async/mutexing (that always works first time), using idiomatic `property getter/setters`, and your `public/private/final/etc` usage is solid, right?

1. So let me take a common problem and *shoehorn* ~~~add~~~ some set-based musings.
  1. A hypothetical Blog Site has lots of Articles, and has even more Posts (Comments).
  1. Let's add a `delete` method (below) - but with support for both singular OR arrays.

```java
package net.danlevy.why.java___why.you.got.all.the.dots____it.must.be.all.the.factories;

public class Post {
  public String   title;
  public Date     created;
  public String   message;

  public Post(String title, String message) {
    this.title    = title;
    this.message  = message;
    this.created  = new Date();
  }

  public Date isArchived() {
    return this.created < new Date(2015, 0, 1);
  }

  // Post.delete` can be called w/ a singular Post or an array of Post[]
  public static int delete(Post post) {
    Post<List> posts = new Post<List>(post);
    return delete(posts)
  }

  public static int delete(Post<List> posts) {
    return posts.map(DB.cleanupPost);
  }
}



```

> Forgive me if my Java is a little rusty.




### _Work-in-progress (updated Nov. 2015)_



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

