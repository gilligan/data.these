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



// Setoid : equals

This.prototype.equals = function (obj) {
    return obj instanceof Theese && obj.isThis && obj.get() === this.get();
};

module.exports = Theese;
