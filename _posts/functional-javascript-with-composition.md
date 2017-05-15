# Write Faster JavaScript, Faster
#### Disclaimer: feat. Dan's heretical musings

## Part 1: The Zen of Single Purpose Functions

One of the most important ideas in software development is: keep it simple.

The problem is, every developer believes all they write is simple (& beautiful) code.
... I'm going to avoid wading into the tarpit of defining "Simple Code."

Instead I'll show 2 'rules' which have helped me write more testable & adaptable code. (Which I feel are key to Simple code)

1. Restrict functions to single-purpose. (Single Responsibility Principle)
2. Restrict functions to single-argument (or 2 when using NodeJS/Express callback (err, value) style). So, your 3 parameter function should instead accept a single array with your 3 params.
**Single parameter functions are not limiting** - use Arrays and Objects as your argument appropriately.

If you are wondering how single-purpose functions ever amount to anything except code sprawl, well, let me introduce you to my friend, **Higher Order Components**, or HOCs. Which is really a fancy way of saying `Function`, `Controller`, `Class`, etc. 
The goal is to have your code feel like using LEGO™ building blocks. 

----------

## Part 2: Four Composition Techniques with Examples

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
  const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
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
  n = parseInt(n) + 5  
  return n // required
}
const half = n => {
  n = (parseInt(n) * 0.5).toFixed(2)
  return n
}
const square = n => {
  n = parseInt(n * n).toFixed(2)
  return n
}


```

With this technique, you **no longer have to fight the Framework Wars**. I don't have time for it.

Hip to Lodash? 
Great, use `_.flow`. 

Using Promises? 
Cool, **just another plugable pattern.**


There are so many choices for gluing your functions together! Stick to my 2 rules (above) and keep reading for more real-world examples.



## Part 3: More Complex Example: Chat App Snippet

Let's say we're given requirements:

1. User clicks [login] button.
2. Modal opens, prompts for fields `user` and `pass`.
    2a. User submits form.
    2b. User clicks 'forgot password'.
3. Upon success, load app+msg data for logged-in user.
    3a. Cache ajax data for offline use.
    3b. Update user status to 'online'
4. Upon failure, plunge into fire pit.
5. Show appropriate UI messaging


Using bluebird's unique take on "Promises," I'll show the code in *almost* as many lines as the (terse) requirements above.

```js
chatApp.login = () => openLoginModal()
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


That looks pretty clean, but it has some subtle weaknesses.

Namely - **coupled code** - see those `.then(fn)` functions with 2 lines are shoving 2 distinct things together. 


---------------



## Part 4: Summary with Further Optimized Code

#### Soon you'll see your Code (almost) organizing itself.

Let's discuss 2 guiding principles which have helped me WRITE LESS CRAP(TM).

1. Eschew nested logic - it's a sign you are mixing 2+ different things. It's also a sign of untestable/high dimensionality.
2. More than 2 lines per function? Stop and think, or ask your nearest dev: "Is it really related? Can you test on its own?"

Ok, I'm being a bit of a troll about the '2 line limit.' 

Here is what I'm getting at - we can gain more testable code if we refactor like so:

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

## Part 5: Conclusion 

It's better. :)

Here's why: it's flatter & therefore more (unit) testable.

`chatApp.getUserData` is testable because it's not hidden inside the `login()` and tied to the status update.
"Partitioned" into 2 "flows" - `.then/.tap`, and then `.catch()`'s. 
Errors can be **filtered by type** with Bluebirds `.catch(<type>, <error>)` interface.

This creates a clear declaration of how your code ought to behave.

Another measure for code readability is: how many english nouns and verbs does it have per line?
This may seem obvious, or even counterintuitive to a many developers.

Either a .catch() function fired, or you get the result RETURNED from the final `.then()`. 

> **Bluebird Promises Pro Tip**: Structure your Promises so you can capture/intercept different `Errors` (i.e. form field validation (user) vs. network down (temporary) vs. corrupt data (hard fail)). The techniques are very different from traditional JS. I'll write another article soon on `Error` handling in Promises, it's worth learning, even if it only to saves you the agony of dealing with someone elses broken Promises. :P


-------------

> In university I had been taught "code reuse" simply means liberally copy & pasting.
I'm discovering what it *really* means. At a more deeper & more holistic level.




===================


### CREDITS & LINKS

* [Eric Elliot](https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d)
* [Promises Concept](http://www.2ality.com/2016/10/understanding-promises.html)
* [Super Promises/Bluebird](http://bluebirdjs.com/docs/api-reference.html)
* https://medium.com/@_ericelliott/there-are-a-few-simple-rules-that-make-mixins-safer-a6ffd82c1d8e
* http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript



If I forgot to give credit, please send a PR, or let me know twitter.com/@justsml
