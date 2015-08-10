---
layout: post
title:  "Polyglot Redux"
date:   2015-06-12 09:21:12
modified:   2015-06-14 01:00:01
categories: languages
tags: [programming, languages, lua, haskell, scala, rust, smalltalk, go, javascript, python]
image:
  feature: abstract-11.jpg
  credit:
---

# Programming Languages Notes

### _Work-in-progress (updated June 15th 2015)_

### I'm sure my Miscellaneous Observations have been made before, but here is my list of most interesting languages:


## JavaScript

For years I foolishly had nothing but scorn, derision and hatred for what is now, **easily my favorite language**.

ES5 may be old, and ES6 is brand new, but it's officially a real standard now!



#### [io.js](http://iojs.org/)
#### [Node.JS](http://nodejs.org/)



## Rust

#### [Official Site](http://www.rust-lang.org/)

* __Pros__
	- Imagine if there was a language as powerful as C or C++, yet without the complexity/pitfalls that usually trap even the most skilled devs.
	- In fact I'd guess Rust is roughly as complex as the ES6 draft, with a ton of extra bonuses:
		1. Essentially Rust transpiles from semi-dynamic syntax into __pure C code__!
		1. Including **__all the best practices__** in C you would probably screw up on, I ~~eventually~~ always do.
			* Automatically you get:
			* Auto Memory management (no need for a slow garbage collector!)
			* Perfectly scoped Object ownership/locking (mutexting & context switching minimized)
			* Object lifetimes (automatically implemented*, and auto coded like you knew every edge case)
			* Prevent virtually all run time errors (seriously, your code-paths become explicit: you just can't overlook a code-path)
	- Oh yeah, it throws in true language extensibility with a sensible 'macro' feature.
		- Need Comprehensions? [Scala style? Done](https://gist.github.com/hanny24/5749688), and [Like Python? Done](https://gist.github.com/JeffBelgum/5e762761cd63c796e803).
		1. Too good to be true? Nah, It gets better:
			* Bleeding edge indicators (github.com stats) reveal Rust is highly competitive or even beating Go (Google's hot-newish language)
				- About 4K More Stars than Go (currently around 12,200)
				- More total Contributors ( 2x! - 1,071 vs. Go's 479 )
				- More forks ( 3X! - 2,343 vs. 765 )
				- Number of Open Issues, Loses by a hair ( 2,000 vs 1,730 from Go )
				- Pull Requests (Rust 70+ vs. Go's 1)
			* I had to triple check the numbers too.
	- Other libraries are very stable due to the constructs & rules of rust.
	- Threading model usable by mere mortals

* __Cons__
	- Decent **web frameworks** are relatively new, untested, and usually undocumented (though they are __getting__ very impressive - as of March 2015).
	- Lots of early pre-1.0 breaking changes



## Python

* __Pros__
	- Overwhelmingly complete assortment of algorithms are already implemented in Python ( see: scilearnkit, numpy, matplotlib, pil/pillow, etc. )
	- Very Fun to write! Comprehensions and Decomposition are great features and make other languages seem just bloated!

~~~python
# dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
# Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
# Now we can call pixel
~~~

	- Tuples and arbitrary sets are so easy

* __Cons__
	- Annoyingly, Python 2.x and 3.x are incompatible. The Great Schism continues, so many years later.



## Haskell

* __Pros__
	- Very rewarding when you finally memorize enough syntax to whip up comprehensions-based expressive patterns
	- You will learn mind-bending code patterns - often somewhat applicable to other languages.
* __Cons__
	- Syntax & Patterns can be hard to get used to.
	-



## SmallTalk-80

* __Pros__
	- Incredibly simple compilers (original especially)
	- Great resources: [Smalltalk MVC Translated to JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
* __Cons__
	- You will likely never use this language for anything. Zero projects. However it will have more of an impact on your coding style, faster than other functional languages... This should be in the pros list)


