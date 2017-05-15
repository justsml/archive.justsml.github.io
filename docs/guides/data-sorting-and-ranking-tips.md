# Data Sorting & Ranking Tips

I came across a particular problem when dealing with a 3+ layer dataset.

What I mean is best explained by some examples:

Say we have an API for a business selling Ice Cream.

### Product Schema API

The hierarchy of the relationships between tables are: (see sample data below)

* Base Flavor
    * Topping
        * Unit Size(s) Available

The REST API was shaped like so:

```
GET All Base Flavors: 
  /
GET Toppings: 
  /vanilla/
GET Sizes:
  /vanilla/choc-chips/
```

### Sample Data / API Results

|Base      |
|----------|
Vanilla   
Chocolate 

Base      | Topping         
----------|-----------------
Vanilla   | None, Chocolate Chips 
Chocolate | Sprinkles, Chocolate Chips, Mint Chips      

Base      | Topping         | Sizes
----------|-----------------|-------
Vanilla   | None            | XL, L, M
Vanilla   | Chocolate Chips | L, M, S
Chocolate | Sprinkles       | S
Chocolate | Chocolate Chips | L
Chocolate | Mint Chips      | L, M, XS


---------------------

Before long the client needed to return a flat results list to align with Excel/reporting tools.

The problem that arises here is very subtle.

Relying on sorting of keys whose meaning may change is a very brittle pattern.
As soon as new sizes are added (e.g. XXL, XXXL, XXS, GIFT, or whatever) we will 'break' how our sort is displayed.
We need results sequence to be deterministic, reliable, repeatable, and dependable into the future.

Possible solutions include:

1. Apply A Ranking BG Task (at data import or on product changes)
    1. Use math, dividing the space: Store a composed decimal value, roughly like so: `<baseId>.<currentToppingId> + <currentSizeId>`
    1. Use binary flags: A bitwise field is limited to 256 options, per 64bit int. Easily supports multiple combined values, each of which can be 'extracted'. The 256-range likely covers our current 'Ice Cream' product depth. But will it in 1 year, 5 years?
1. Apply Progressively (on demand in app)
    1. Sort only if data changes demand a re-ranking. Expensive operation to do after user/client updates.

> Most solutions will have some sort of lookup table with an integer rank assigned to each Size. Assume that is implemented in the UI/import.


--------------------------


### A Solution: Dividing your Space Infinitely*

Let's divide the 'space' up according to the following:

* Up to 3-segment input
* limits: baseId <= 25, toppingCount <= 50, sizeCount <= 10.

```js
const getProductRank = getSpaceRanking([25, 50, 10])
getProductRank(1)         === 1.000000
getProductRank(1, 1)      === 1.004000
getProductRank(1, 1, 1)   === 1.002010
getProductRank(1, 1, 10)  === 1.002100
getProductRank(1, 50, 10) === 1.100100
getProductRank(1, 50, 9)  === 1.100090
getProductRank(2, 10)     === 2.020000
```

The following assumes we know up-front the maximal # of items in each 'layer', not necessarily required however as you can likely guess safe ranges.

```js

/**

Let's write a function to compute this decimal 'rank'.

`getSpaceRanking` accepts an int array. Each int defines the maximum size of the 'segment/level/layer'

@example 

Usage:
Sample code to using my Rank Helper function: (Assuming the following true: baseId < 25, toppingCount < 50, sizeCount < 10)
const getProductRank = getSpaceRanking([25, 50, 10])
getProductRank(1)         === 1.000000
getProductRank(1, 1)      === 1.004000
getProductRank(1, 1, 1)   === 1.002010
getProductRank(1, 1, 10)  === 1.002100
getProductRank(1, 50, 10) === 1.100100
getProductRank(1, 50, 9)  === 1.100090
getProductRank(2, 10)     === 2.020000
*/

function getSpaceRanking(segments = [1000]) {
  return (...indicies) => {
    return segments
    .map((segmentLimit, segmentIndex) => {
      indicies[segmentIndex] = 'undefined' === typeof indicies[segmentIndex] ? 0 : indicies[segmentIndex];
      if (indicies[segmentIndex] < 0) { throw new Error(`Out of acceptable range: ${indicies[segmentIndex]}`) }
      if (indicies[segmentIndex] > segmentLimit) { throw new Error(`Out of acceptable range: ${indicies[segmentIndex]}`) }
      let rank = (indicies[segmentIndex] / segmentLimit).toFixed(segmentLimit.toString().length)
      return rank.toString().replace(/\./, ''); // remove decimal
    })
    .reduce((numStr, segmentRank) => {
      numStr = numStr === '' ? `${parseInt(indicies[0], 10)}.` : `${numStr}${segmentRank}`;
      return numStr;
    }, '')
  }
}

```


You may have noticied the rank may not fit in JS' `Number` data type; after a few segments, it **overflows the precision available (15-16 # places).**

However, if you preserve the returned rank String, **sorting will still work on the returned value** as alphanum sort rules apply.
Essentially, be careful of automatic rounding in your db or language when you convert to store a decimal (recommended if possible).

There are many methods to solve this, however they require a bit more math than we need currently.

> Hint/Homework: To fix this problem, IIRC, there's a square root technique to reduce the length of the mantissa (aka remainder). 
Lower the significance of each successive segment, then sum them up, roughly like this code:

```js
let compressedRank = segments
  .map((segmentRank, segmentIndex) => Math.sqrt(segmentRank / (1 + segmentIndex)))
  .reduce((a, b) => a + b, 0)
```

-------------------


> Naturally project scope only does one thing: creep.

