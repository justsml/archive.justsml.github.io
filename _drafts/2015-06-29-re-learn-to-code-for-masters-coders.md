---
layout: post
title:  "Re-learn some Coding' - For Experts!"
date:   2015-04-29
modified:   2015-08-21
categories: languages
tags: [programming, languages, strategy]
image:
  feature: abstract-11.jpg
  credit:
---

# Re-learn some Coding' - For Experts!


**Target Audience: Programmers who want to use > 1 CPU/Core.**

## **"Dan's Essential (And Random) Programming Rules (For API Devs*)"**

> As you adhere closer your software will ~~improve dramatically~~ shoot rainbows and kittens, immutable kittens. (YMMV).

My Focus, in order of significance:

1. Reliable, idempotent: Stable function input-output.
2. Human readable, fluent designs: `Function chaining`  +1
3. Infinite scalability (not limited by app design) 1-1000+ CPUs.
4. Errors MUST:
  1. NEVER leave an object in an invalid state.
  1. ALWAYS log reliably.
  1. NEVER use repetitive patterns, require special developer consideration. I mean, if I see another
If you thought "Hey Dan, My language doesn't have useful 'immutable types' and anyway, how useful is an app without re-writeable memory/pointers refs?" ...  And yes, I'm aware there's no such thing as 'read-only variables'.

Apps featuring little heirarchy (2 or 3 folder depth should cover all projects, except those poorly scoped)

 are flat, composed of single-purpose functions which work in isolation, other than their option parameters


1. Make EVERYTHING [Immutable][**Immutable**]: 'Variables', Functions, Classes & Config.
  1. The point is to get as close as possible to this as possible.
  1. This is not some arbitrary ~~constraint~~ *challenge* I endure 'ya know, for fun-sies'
    1. You will benefit from simpler implementations of complex business logic:
2. Treat all data as `Array-like`. Even if that will never happen  EVERYTHING

```js
// snippet
//
function cloudUserData(user) {
  var providers = require('cloud/providers');
  return Promise
    .resolve(user) // shortcut to start a promise chain with any single var as the val passed to
    .bind(user)     // set `this` to `user` **in all** subsequent `then(runc)` calls in this Promise chain
    .map(providers) // e.g. [providers.getMyAmazonS3, providers.getMyDropbox, providers.getMyFacebook]
    .settle(cacheResponse);
}
function getAllUserData(userIdQuery) {
  // if not found, throws err, e.g. throw new HttpError(404) - to be caught below
  return findUsersAsync(userIdQuery)
  .then(function(users) {
      return Promise
        .resolve(users)
        .map()

    })
}

```

   (`final`/`frozen`/`read-only`).
  1. It's only part of the way
  1. No real app is actually going to be read-only.
  2. Higher-level components/controllers which implements other child components naturally need shared state,


# Suckful Classes: You are doing functions all wrong

> Classes help us manage & implement real-world objects' and their representations through their various 'states':
> `Car(status=ok)`, or `Car(status=failed)`
> If `Car.drive()` throws EngineException, then youll need to call `Bank.empty().then(Car.repair(engine))` ... well, you get the idea.

> 1. Objects with public members/properties and,
> 2. Use multiple discreet functions
> 3. Track instance members or state (in ANY shared fashion: `this`, [wrapper function](#example_wrapper))

Let me try explain via 2 code examples:

> Side note: If you are not a fan of ES6 or Promises, **just consider the examples psuedo-code. ;)**

## Example: An OOP Account class
#### (NB: Only implemented methods to buy & transfer credits.)

**Notice: This is the `before` code. It sucks. Read on...**

<h3 class='example' id='example_wrapper'>Plugin: Class w/ Shared States</h3>
```javascript
var Promise = require("bluebird");
var AccountClass = function _AccountClass(user) {
  // privates
  var user = user;
  var credits = parseFloat(user.credits || 0);

  var purchase = function _purchase(amount) {
    return user
      .purchaseCreditsAsync(amount)
      .then(payment => { credits += payment.quantity })
  }.bind(this);

  var transfer = function _transfer(toUser, amount) {
    if ( credit >= amount ) {
      return UserAccounts
        .findByIdAsync(toUser)
        .then( receiver => {receiver.credits  += amount} )
        .then( ()       => {user.credits -= amount} )
        .then( ()       => {user.status   = 'Good'} )
    } else {
      user.status   = 'Failed'
    }
    return
  }.bind(this);

  return { // make stuff public
    purchase: purchase,
    transfer: transfer,
    user:     user,
    getCredits: () => credits
    // [Other methods]
  }
}
```

It may feel natural to think in _Object-oriented-patterns_, I once did **almost exclusively**.
It *feels*
The solution is compelling, and borrows the best patterns I've stolen from other languages and systems.

Let me give you 1 Minute of background:

Then one day I read something that changed everything.
_The original SmallTalk implementation_ - It's an exceptionally short read, and impressive that a 1970's language can seem modern (way, way ahead of it's time for concurrent/multi-thread safety).

This new paradigm left me so amazed, and empowered that I learned me some Haskell and Scala.


Ok, before I lose you, we're not going to get into esoteric languages in this post, I'm going to demonstrate my newfound superpower back in JavaScript.


> Nevermind that it's still about **10x better** than most code I've seen...

It suffers from a couple quality issues, however some are due to brevity (and are not my focus):
1. Issues which are too 'obvious' for this article include:
   1. MongoDB implied code wouldn't be easily reliable as it's not ACID/consistent store.
   2. Incomplete class, I know, not relevant, keep reading

* Actually Devious [Concurrency Bugs][Concurrency Bugs]
  1. Vulerable property persistance & initialization:
* Fragile mutable design
  1. `Account.transfer()` is too trusting of it's state.
  2. Sequence of changes needing a (write-safe) transaction.


Lets fix this by making our JS a bit closer to Haskell. (And no, first-class functions don't get you there on their own)

1. Decouple methods
2. Functions must receive all explicit references to needed 'instances'
3. Return POJOs (or promise to a POJO) [idempotently][idempotently]

```javascript
var Promise = require("bluebird");

var AccountClass = function _AccountClass(user) {
  // privates
  var user = user;
  var credits = parseFloat(user.credits || 0);

  var purchase = function _purchase(amount) {
    return user
      .purchaseCreditsAsync(amount)
      .then(payment => { credits += payment.quantity })
  }.bind(this);

  return { // make stuff public
    purchase: purchase,
    transfer: transfer,
    user:     user,
    getCredits: () => credits
    // [Other methods]
  }
  var transferCredits = function _transfer({fromUser, toUser, amount}) {
    return UserAccounts
      .findAsync(toIdQuery(fromUser, toUser)) // concurrency-trusted lookup (objects from same point in time)
      .bind({
        // THIS HELPS TO ELIMINATE SIDE-EFFECTS (OR AT LEAST DANGEROUS USES)
        updateValues: [],
        resetValues: []
      })
      .then( fromMatch, toMatch ) => {
        // save the fall-back values - could be avoided with durable transaction support
        this.resetValues = [
          { _id: fromMatch._id, credits: fromMatch.credits, status: 'Failed' },
          { _id: toMatch._id,   credits: toMatch.credits   }
        ];
        // Now set the desired credit chgs in this (effectively) syncronized function scope
        this.updateValues = [
          { _id: fromMatch._id, credits: fromMatch.credits -= amount, status: 'Good' },
          { _id: toMatch._id,   credits: toMatch.credits   += amount }
        ];
      })
      .then( receiver => {receiver.credits  += amount} )
      .then( ()       => {user.credits -= amount} )
      .then( ()       => {user.} )
      .catch(err => {
        // let's reset any values back to the way they were
        this.resetValues.map(User.save);
      })
    return
  }.bind(this);
}

```



> Morpheus: This is your last chance.
> After this, there is no turning back.
> _You take the blue pill_ - the story ends: return to writing bloatware to power Horse-drawn Carriages
> _You take the red pill_ - you stay in Functionaland: and learn to stop writing tonnes of flakey Jenga tower apps.

Does this sound familiar:

### Including the following:
 1. modify a global variable or static variable,
 1. modify any hoisted arguments
 1. raise an exception
 1. write data to a display or file
 1. Read data, or,
 1. call other side-effecting functions (HW device IO).

 In the presence of side effects, a program's behavior could become corrupted or invalid in ways that are maddening to debug. A very high level
   the order of evaluation matters. Understanding and debugging a function with side effects requires knowledge about the context and its possible histories.



was more of an under standing of [side effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science))

So many programmers couldn't tell you what **'side-effects'** are in any random code sample.

Including classically trained & highly experienced developer I


Credits: wikipedia: Side effects: [Concurrency Bugs]


[Concurrency Bugs]: https://en.wikipedia.org/wiki/Side_effect_(computer_science)#Example
[Immutable]: https://en.wikipedia.org/wiki/Immutable_object


