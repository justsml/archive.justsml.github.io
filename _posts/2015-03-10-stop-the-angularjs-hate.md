---
layout: post
title:  "AngularJS Tricks"
date:   2015-02-26 11:22:33
categories: angularjs
tags: [angularjs, development, performance, tuning]
---

# AngularJS CAN BE Fast!

> Lot's of developers are discovering that their large AngularJS apps are buckling under the weight of all those ```$watch's```.

## 2-way data binding: 2-way Sword

2-way binding alone makes coming from other frameworks like Backbone, well, __frickin amazeballs__.

The problem is: many sites **chronically overuse** Angular's design patterns.
This leads to directive sprawl and a ```$scope/rootScope``` which easily clings to huge objects preventing any hope of effective garbage collection.
You know where this is going: an exhausted browser! Forever doomed to work at a __frantic pace__ executing endless and redundant UI/DOM re-compiles.

Does your ```<current-user-status-label>``` directive really need to be, well, a directive at all?


# Alternatives & Solutions

## ReactJS from Facebook

For content that is not going to change often:
If you have tons of small UI bits - you might want to evaluate a framework more appropriate:

* Add ReactJS to your project
	* Has a different philosophy to UI/DOM implementation
	* You can use ReactJS alongside AngularJS, Ember, Backbone - pretty much anything.
	* NOT built around the $scope/$watch ADHD digest pattern of Angular


## [Polymer Project](http://www.Polymer-Project.org/) from Google

## Pure-er JS Approach

* I typically try to do ONE-TIME creation of these fragments **in my controller ```link()``` function**. By the way,  here's where I try create framework agnostic code (+1 testability, +1 reuse)
		1. Use plain javascript class to load data (AJAX/JSONP/Embedded in page, et al.)
		1. Use mustache templating to create HTML strings (or DOM directly)
		1. Cache rendered content in localStorage if you can
		1. (Optional) Now add an event listener to re-render the content. I have standardized on the event name ```refresh.<class-name>```



