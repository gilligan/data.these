
## data.these

[![Build Status](https://travis-ci.org/gilligan/data.these.svg?branch=master)](https://travis-ci.org/gilligan/data.these)
[![Dependencies](http://img.shields.io/david/gilligan/data.these.svg?style=flat)](https://david-dm.org/gilligan/data.these)

This is a javascript adaptation of the haskell package [these](https://github.com/isomorphism/these) which provides
a data structure containing either a value `a` or a value `b` or both, values `a` and `b` :
```haskell
data These a b = This a
               | That b
               | These a b
```

### API

#### Constructors
```js
var t = These.This(1)
t instanceof These // => true
```
Creates an instance containing the `this` value `1`.
```js
var t = These.That(2)
t instanceof These // => true
```
Creates an instance containing the `that` value `2`.
```js
var t = These(1, 2)
t instanceof These // => true
```
Creates an instance containg the `this` value `1` and `that` value `2`.

#### isThis
```js
These.This(1).isThis // => true
These.That(1).isThis // => false
These.These(1).isThis // => false
```
The `isThis` property is true for `This` instances and false otherwise.

#### isThat
```js
These.This(1).isThat // => false
These.That(1).isThat // => true
These.These(1).isThat // => false
```
The `isThat` property is true for `That` instances and false otherwise.

#### isThese
```js
These.This(1).isThese // => false
These.That(1).isThese// => false
These.These(1).isThese // => true
```
The `isThese` property is true for `These` instances and false otherwise.

#### get
```js
These.This('foo').get() // => 'foo'
These.That('bar').get() // => 'bar'
These.These('foo', 'bar') // => { _this: 'foo', _that: 'bar' }
```
The `get` function returns the wrapped value(s). In case of `These` the values are wrapped in an object.

#### these
```js
These.This(val).these(f, g, h) // => f(val)
These.That(val).these(f, g, h) // => g(val)
These.These(val).these(f, g, h) // => h(val)
```
The `these` function accepts 3 functions - one for each case - and applies the correct function to the wrapped value.

#### fromThese
```js
These.This('today').fromThese('sometime', 'somewhere') // => [ 'today', 'somewhere' ]
These.That('beijing').fromThese('sometime', 'somewhere') // => [ 'sometime', 'beijing' ]
These.These('today', 'beijing').fromThese('sometime', 'somewhere') // => [ 'today', 'beijing' ]
```
The `these` function accepts two values as default values and combines them with the value(s) provided by the `These` instance.

#### merge
```js
var add = function(x,y) { return x + y };
These.This(1).merge(add) // => 1
These.That(1).merge(add) // => 1
These.These(1,2).merge(add) // => 3
```
The `merge` function accepts a binary to combine values from `These` instances. The wrapped value is returned as-is for `This` and `That`.

### mapThese
```js
var inc = function(x) { return x + 1 };
var dec = function(x) { return x - 1 };
These.This(1).mapThese(inc, dec) // => This { 2 }
These.That(2).mapThese(inc, dec) // => That { 1 }
These.These(1, 2).mapThese(inc, dec) // => These { 2, 1 }
```
The `mapThese` acts as a bi-functor accepting two functions, which are applied accordingly.

[
  ![](https://raw.github.com/pufuwozu/fantasy-land/master/logo.png)
](https://github.com/pufuwozu/fantasy-land)

fantasy land compatible
