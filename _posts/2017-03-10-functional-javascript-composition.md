---
layout: post
title:  "Guide 2017: Write Better JavaScript, Faster"
date:       2017-03-10
modified:   2017-06-02
categories: programming
tags: [programming, patterns, source-code, functional-js]
image:
  feature: abstract-6.jpg
  credit:
---

### A 4-part Crash Course in Composable JavaScript

## Preface

#### Disclaimer: includes Dan Levy's ~~heretical musings~~ thought-leadering.

> If you want more complete examples, see my project [`escape-from-callback-mountain`](https://github.com/justsml/escape-from-callback-mountain/).
> [![Build Status](https://travis-ci.org/justsml/escape-from-callback-mountain.svg?branch=master)](https://travis-ci.org/justsml/escape-from-callback-mountain)

------------------


## Part 1
### Code Nirvana through 4 Key Rules 

One of the most important ideas in software development is: keep it simple.

The funny thing is, every developer believes: **they write simple & beautiful** code, the **real problem** is _those other developers_.

Don't worry, I'm not wading into the tarpit defining "Simple Code."

Instead I'll list 4 general rules, each which have helped me write more **readable, testable & adaptable** code.

1. Restrict functions to single-purpose. See [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle).
1. Restrict functions to single-argument (or 2 when using NodeJS/Express callback (err, value) style). So, your 3 parameter function `(a, b, c) => {}` should instead accept `([a, b, c]) => {}`. Helps you with [Dependency inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle), [Interface segregation](https://en.wikipedia.org/wiki/Interface_segregation_principle).
1. Never use `prototype` if possible. (Confession: I only used once, by necessity, in [`escape-from-callback-mountain`](https://github.com/justsml/escape-from-callback-mountain/) errors module.) Composition is a pure embrace of the [Open/closed principle](https://en.wikipedia.org/wiki/Open/closed_principle).
1. Build functions without nesting/variable hoisting. Mitigate with ImmutableJS, else you can [pass needed values]() as arguments. (Factory patterns are ok if state sharing is avoided or centralized. Examples in `callback-mountain` project.)

Let me emphasize: **Single parameter functions are not restricting** - simply use an Array or Object for your function argument.

If you are wondering how single-purpose functions ever amount to anything except code sprawl, well, let me introduce you to my friend, **Higher Order Components**, or HOCs. Which is really a fancy way of saying `Function`, `Controller`, `Class`, etc. 
The goal is to have your code feel like using LEGO™ building blocks. 

> Side note: See [Alternative Theories](#alternative-theories) for an interesting alternative approach.

#### Let's look at some code...

----------

## Part 2
### Four JavaScript Composition Examples

Let's wire up a few functions to do some simple math.

Composable JS Example Includes:

1. Pure ES6
1. Lodash
1. Array.reduce (built-ins)
1. Promises

```js
/*
@author: Dan Levy <Dan@DanLevy.net>
Twittering: @justsml
*/
const test = require('tape')

// Demo of 4 techniques to 'glue' functions together (Higher Order Components)
// we'll do some simple math:  5+5==10,  half(10)==5,  5*5==25.0

test('Pure JS/ES6: math functions', t => {
  // compose accepts a list of functions, to be executed in order when the returned function (_run) is called with a value.
  const compose = (...fns) => x => fns.reduce((v, f) => f(v), x)
  const add5HalfSquare = compose(add5, half, square)
  t.equals(add5HalfSquare(5), '25.00', 'I can caz maths?')
  t.end()
})

test('Lodash: math functions', t => {
  const {flow} = require('lodash');
  const add5HalfSquare = flow(add5, half, square);
  t.equals(add5HalfSquare(5), '25.00', 'I can caz maths?');
  t.end();
})

test('Promises Chain: math functions', t => {
  const add5HalfSquare = n => Promise
    .resolve(n)
    .then(add5)
    .then(half)
    .then(square);

  add5HalfSquare(5).then(answer => {
    t.equals(answer, '25.00', 'I can promise maths?');
    t.end();
  });
})

test('Array.reduce: math functions', t => {
  const add5HalfSquare = n => [add5, half, square]
    .reduce((val, fn) => fn && fn(val), n);
  t.equals(add5HalfSquare(5), '25.00', 'I can reduce maths?');
  t.end();
})


// Example/Util Math Methods:
// Pure-at-heart functions (https://en.wikipedia.org/wiki/Pure_function)
const add5 = n => {
  n = parseFloat(n) + 5  
  return n // required
}
const half = n => {
  n = (parseFloat(n) * 0.5).toFixed(2)
  return n
}
const square = n => {
  n = parseFloat(n * n).toFixed(2)
  return n
}
```

With this technique, you **no longer have to fight the Framework Wars**. I don't have time for it.

#### Hip to Lodash? 
Great, use `_.flow`, or `.chain()`. 

#### Using Promises?
Cool, **it's just another pluggable pattern.**


There are so many choices for gluing your functions together! Just make sure to insulate yourself by [sticking to my 4 rules](#part-1) (in Part 1).


#### Let's look at a more real-world example...


## Part 3
### Example Login Pattern

Let's say we're given requirements:

1. User clicks [login] button.
2. Modal opens, prompts for fields `user` and `pass`.
    * User submits form.
    * User clicks 'forgot password'.
3. Upon success, load app+msg data for logged-in user.
    * Cache ajax data for offline use.
    * Update user status to 'online'
4. Upon failure, plunge into fire pit.
5. Show appropriate UI messaging


Using bluebird's unique take on "Promises," I'll show the code in *almost* as many lines as the (terse) requirements above.

```js
login = () => openLoginModal()
  .then({user, pass}) => ajaxLogin({user, pass}))
  .then(user => {
      setUserStatus('online') // < non blocking, as result is irrelevant.
      return [getContacts(user), getRooms(user), getMessages(user)]
  })
  .then(([contacts, rooms, messages]) => {
      alertOnNew({contacts, messages})
      return this.cache({contacts, rooms, messages})
  })
  .catch(UserCancel, hideModal)
  .catch(ForgotPassword, () => showUserMessage({message: 'think harder'}))
  .catch(LoginError, compose(hideModal, initFirePit, destroyApp))
  .catch(err => showUserMessage({message: 'Something truly unexpected happened, congratulations.'}))
```


That looks like some solid Functional JavaScript, however it still has some subtle weaknesses.

Namely - **coupled code** - see those anonymous arrow functions in `.then(fn)`? Are 2 distinct things happening here? This needs more attention, the call to `setUserStatus` doesn't seem to relate to the returned new array structure. Let's see if single responsibility can help us fix this up a little.


---------------


#### Let's look at a refactored example...

## Part 4
### Summary with Further Optimized Code

Here's how I applied rules #1 and #2 to refactor:

* Avoid nested logic - it's a sign you are mixing 2+ different things. It's also a sign of untestable/high dimensionality.
* More than 2 lines per function? Stop and think, or ask yourself/nearest dev: "Is it really related? Why is this together? Is there a better order to chain methods?"

Ok, I'm being a bit of a troll about an 'absolute 2 line limit.' 

Here is what I'm getting at: **separate your code into distinct logical functions.**

```js
chatApp.getUserData = user => {
    return [getContacts(user), getRooms(user), getMessages(user)]
}
chatApp.login = () => openLoginModal()
    .then({user, pass}) => ajaxLogin({user, pass}))
    .tap(() => setUserStatus('online'))
    .then(chatApp.getUserData)
    .tap(([contacts, rooms, messages]) => alertOnNew({contacts, messages}))
    .then(this.cache)
    .catch(UserCancel, hideModal)
    .catch(ForgotPassword, () => showUserMessage({message: 'think harder'}))
    .catch(LoginError, compose(hideModal, initFirePit, destroyApp))
    .catch(err => showUserMessage({message: 'Something truly unexpected happened, congratulations.'}))
```

Here's why it's better: it's flatter & therefore more (unit) testable.

`chatApp.getUserData` is testable because it's not hidden inside the `login()` and tied to the status update.
"Partitioned" into 2 "flows" - `.then/.tap`, and then `.catch()`'s. 
Errors can be **filtered by type** with Bluebirds `.catch(<type>, <error>)` interface.

My goal is code which reads like a story.

> **Bluebird Promises Pro Tip**: Structure your Promises so you can capture/intercept different `Errors` - i.e. form field validation (user) vs. network down (temporary) vs. corrupt data (hard fail). The techniques can seem very different from what you are used to, [see my example pattern of a 'Finite State Machine' using the `Error` handling in Bluebird Promises](https://github.com/justsml/escape-from-callback-mountain/blob/master/examples/typed-errors/auth.js#L29-L33).


## Alternative Theories

While I differ in approach & reasoning, I highly recommend reading [Best practices for JavaScript function parameters
](https://codeutopia.net/blog/2016/11/24/best-practices-for-javascript-function-parameters/) on [codeutopia.net](https://codeutopia.net).

-------------

### CREDITS & LINKS

* [Eric Elliot](https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d)
* [Promises Concept](http://www.2ality.com/2016/10/understanding-promises.html)
* [Super Promises/Bluebird](http://bluebirdjs.com/docs/api-reference.html)
* [Simple rules that make mixins safer](https://medium.com/@_ericelliott/there-are-a-few-simple-rules-that-make-mixins-safer-a6ffd82c1d8e)
* [Smalltalk translated to JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)



If I forgot to give credit, please [send a PR](https://github.com/justsml/escape-from-callback-mountain/pulls), or let me know twitter.com/justsml
