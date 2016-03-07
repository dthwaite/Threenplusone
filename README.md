## threenplusone.js

[![Build Status](https://secure.travis-ci.org/dthwaite/Threenplusone.png)](http://travis-ci.org/dthwaite/Threenplusone)

Counts the number of steps to iterate an arbitrary large number, N, down to 1 using the following algorithm:

* If N is even then let N=N/2 (DOWN step)
* If N is odd then let N=(3*N+1)/2 (UP step)

Strange as it may seem it has not been proved that all positive integers iterate to 1 when the above rules are applied.

This implementation attempts to be as fast as possible (given the constraints of javascript) in counting the number of
UP and DOWN steps. It can generally count the steps of a number of around 10,000 digits long (that's quite big) in under
one second.

I originally developed a program to count the steps when I was a boy using machine code on an 8080 processor (on a ZX80, I think)
and used up all its memory to hold my number! I think that it could do a similar size of number as this implementation.

What is interesting about very large numbers is that the number of UP and DOWN steps remain exactly the same for many
consecutive numbers. In other words, seeing the pattern of UP and DOWN counts is mildly perplexing.

I've never met a number that did not reach 1. If anyone can supply a mathematical proof, please let me know!

* Install:
npm install git://github.com/dthwaite/Threenplusone

* Test:
npm test threenplusone

* Uninstall:
npm uninstall threenplusone

Usage:

in node:
```javascript
    var ThreeNplus1 = require('threenplusone');

    var n=new ThreeNplus1(100);
    console.log(n.ups); // 7
    console.log(n.downs); // 11

    var one=new ThreeNplus1(1);
    n.add(one);  // Add 1 to 100
    
    console.log(n.ups); // 7
    console.log(n.downs); // 11
    
    n.add(one);  // n is now 102
    
    console.log(n.toString()); // 'Digits: 3(102) Ups: 7 Downs: 11'
    console.log(n.add(one)); // 'Digits: 3(103) Ups: 31 Downs: 25'
```

in the browser (loading from CDN):
```javascript
    <script src="https://cdn.rawgit.com/dthwaite/Threenplusone/master/lib/threenplusone.min.js"></script>
```

### API
Supported methods: `random`, `add`

###### random
```javascript
    var n=new ThreeNplus1().random(1000) // Creates a random number of about 1000 decimal digits
    console.log(n.tostring()); // prints out the number of ups and downs
```

###### add
```javascript
    var n=new ThreeNplus1(1000);
    n.add(1000); // n is now equal to 2,000
    console.log(n.tostring()); // prints out the number of ups and downs to iterate 2,000 to 1
```