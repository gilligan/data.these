// These a b = This a
//           | That b
//           | These a b

'use strict';

var FL = {
    equals: 'fantasy-land/equals',
    map: 'fantasy-land/map',
    ap: 'fantasy-land/ap',
    of: 'fantasy-land/of',
    reduce: 'fantasy-land/reduce'
};

function Theese() {}

function This(a) {
    this._this = a;
}
This.prototype = Object.create(Theese.prototype);

function That(b) {
    this._that = b;
}
That.prototype = Object.create(Theese.prototype);

function These(a, b) {
    this._this = a;
    this._that = b;
}
These.prototype = Object.create(Theese.prototype);

// constructors

Theese.This = function (a) {
    return new This(a);
};

Theese.That = function (b) {
    return new That(b);
};

Theese.These = function (a, b) {
    return new These(a, b);
};

// predicates

Theese.prototype.isThis = false;
Theese.prototype.isThat = false;
Theese.prototype.isThese = false;

This.prototype.isThis = true;
That.prototype.isThat = true;
These.prototype.isThese = true;

// get

This.prototype.get = function () {
    return this._this;
};
That.prototype.get = function () { return this._that; };
These.prototype.get = function () { return { _this: this._this, _that: this._that }; };

// Setoid : equals

This.prototype.equals = function (obj) {
    return obj instanceof Theese && obj.isThis && obj.get() === this.get();
};
That.prototype.equals = function (obj) {
    return obj instanceof Theese && obj.isThat && obj.get() === this.get();
};
These.prototype.equals = function (obj) {
    return obj instanceof Theese && obj.isThese
        && obj._this === this._this
        && obj._that === this._that;
};

This.prototype[FL.equals] = This.prototype.equals;
That.prototype[FL.equals] = That.prototype.equals;
These.prototype[FL.equals] = These.prototype.equals;

// Functor : map

This.prototype.map = function (f) { return new This(f(this.get())); };
That.prototype.map = function (f) { return new That(f(this.get())); };
These.prototype.map = function (f) {
    return new These(this._this, f(this._that));
};

This.prototype[FL.map] = This.prototype.map;
That.prototype[FL.map] = That.prototype.map;
These.prototype[FL.map] = These.prototype.map;

// Apply : ap

This.prototype.ap = function (x) { return x.map(this._this); };
That.prototype.ap = function (x) { return x.map(this._that); };
These.prototype.ap = function (x) { return x.map(this._that); };

This.prototype[FL.ap] = This.prototype.ap;
That.prototype[FL.ap] = That.prototype.ap;
These.prototype[FL.ap] = These.prototype.ap;

// Applicative : of

Theese.of = function (x) {
    return new That(x);
};

Theese[FL.of] = Theese.of;
Theese.prototype.of = These.of;
Theese.prototype[FL.of] = Theese.prototype.of;

This.prototype.of = Theese.This.of = function (x) { return new This(x); };
That.prototype.of = Theese.That.of = function (x) { return new That(x); };
These.prototype.of = Theese.These.of = function (x) { return new These(undefined, x); };

This.prototype[FL.of] = This.prototype.of;
That.prototype[FL.of] = That.prototype.of;
These.prototype[FL.of] = These.prototype.of;

// Foldable : reduce

This.prototype.reduce = function (f, x) { return x; };
That.prototype.reduce = function (f, x) { return f(x, this._that); };
These.prototype.reduce = function (f, x) { return f(x, this._that); };

This.prototype[FL.reduce] = This.prototype.reduce;
That.prototype[FL.reduce] = That.prototype.reduce;
These.prototype[FL.reduce] = These.prototype.reduce;

// these :: (a -> c) -> (b -> c) -> (a -> b -> c) -> These a b -> c

This.prototype.these = function (f, g, h, x) {
    return f(this._this);
};
That.prototype.these = function (f, g, h, x) {
    return g(this._that);
};
These.prototype.these = function (f, g, h, x) {
    return h(this._this, this._that);
};

// fromThese :: a -> b -> These a b -> [a, b]

This.prototype.fromThese = function (a, b) {
    return [ this._this, b ];
};
That.prototype.fromThese = function (a, b) {
    return [ a, this._that ];
};
These.prototype.fromThese = function (a, b) {
    return [ this._this, this._that ];
};

// merge :: (a -> a -> a) -> These a a -> a

This.prototype.merge = function (f) {
    return this._this;
};
That.prototype.merge = function (f) {
    return this._that;
};
These.prototype.merge = function (f) {
    return f(this._this, this._that);
};

// mapThese :: (a -> c) -> (b -> d) -> These a b -> These c d

This.prototype.mapThese = function (f, g) {
    return new This(f(this._this));
};
That.prototype.mapThese = function (f, g) {
    return new That(g(this._that));
};
These.prototype.mapThese = function (f, g) {
    return new These(f(this._this), g(this._that));
};

module.exports = Theese;
