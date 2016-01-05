'use strict';

var expect = require('chai').expect;
var Theese = require('../lib/these');

describe('These', function () {
    describe('constructors', function () {
        it('has a "This" constructor', function () {
            expect(Theese.This).to.be.a('function');
            expect(Theese.This(1)).to.be.an.instanceof(Theese);
        });
        it('has a "That" constructor', function () {
            expect(Theese.That).to.be.a('function');
            expect(Theese.That(1)).to.be.an.instanceof(Theese);
        });
        it('has a "These" constructor', function () {
            expect(Theese.These).to.be.a('function');
            expect(Theese.These(1, 2)).to.be.an.instanceof(Theese);
        });
    });
    describe('predicates', function () {
        it('isThis', function () {
            expect(Theese.This(1).isThis).to.equal(true);
            expect(Theese.That(1).isThis).to.equal(false);
            expect(Theese.These(1, 2).isThis).to.equal(false);
        });
        it('isThat', function () {
            expect(Theese.This(1).isThat).to.equal(false);
            expect(Theese.That(1).isThat).to.equal(true);
            expect(Theese.These(1, 2).isThat).to.equal(false);
        });
        it('isThese', function () {
            expect(Theese.This(1).isThese).to.equal(false);
            expect(Theese.That(1).isThese).to.equal(false);
            expect(Theese.These(1, 2).isThese).to.equal(true);
        });
    });
    describe('Setoid', function () {
        it('equals', function () {
            expect(Theese.This(1).equals(Theese.This(1))).to.equal(true);
            expect(Theese.That(1).equals(Theese.That(1))).to.equal(true);
            expect(Theese.These(1, 2).equals(Theese.These(1, 2))).to.equal(true);
        });
    });
    describe('Functor', function () {
        var inc = function (x) { return x + 1; };

        it('map', function () {
            expect(Theese.This(1).map(inc).get()).to.equal(2);
            expect(Theese.That(1).map(inc).get()).to.equal(2);
            expect(Theese.These(1, 2).map(inc).get()).to.deep.equal({
                _this: 1,
                _that: 3
            });
        });
    });
    describe('Apply', function () {
        var inc = function (x) { return x + 1; };
        var nop = function () {};

        it('ap', function () {
            expect(Theese.This(inc).ap([ 1, 2 ])).to.deep.equal([ 2, 3 ]);
            expect(Theese.That(inc).ap([ 1, 2 ])).to.deep.equal([ 2, 3 ]);
            expect(Theese.These(nop, inc).ap([ 1, 2 ]));
        });
    });
    describe('Applicative', function () {
        it('of', function () {
            expect(Theese.of(1)).to.be.an.instanceof(Theese);
            expect(Theese.of(1).isThat).to.equal(true);
        });
    });
    describe('Foldable', function () {
        var add = function (x, y) { return x + y; };

        it('reduce', function () {
            expect(Theese.This(1).reduce(add, 0)).to.equal(0);
            expect(Theese.That(1).reduce(add, 1)).to.equal(2);
            expect(Theese.These(0, 1).reduce(add, 1)).to.equal(2);
        });
    });

    describe('utilities', function () {
        var inc = function (x) { return x + 1; };
        var dec = function (x) { return x - 1; };
        var add = function (x, y) { return x + y; };

        it('these', function () {
            expect(Theese.This(2).these(inc, dec, add)).to.equal(3);
            expect(Theese.That(2).these(inc, dec, add)).to.equal(1);
            expect(Theese.These(1, 2).these(inc, dec, add)).to.equal(3);
        });

        it('fromThese', function () {
            expect(Theese.This(666).fromThese(1, 2)).to.deep.equal([ 666, 2 ]);
            expect(Theese.That(666).fromThese(1, 2)).to.deep.equal([ 1, 666 ]);
            expect(Theese.These(42, 666).fromThese(1, 2)).to.deep.equal([ 42, 666 ]);
        });

        it('merge', function () {
            var f = function (x, y) { return x + y; };

            expect(Theese.This(1).merge(f)).to.equal(1);
            expect(Theese.That(1).merge(f)).to.equal(1);
            expect(Theese.These(1, 2).merge(f)).to.equal(3);
        });

        it('mapThese', function () {
            var f = function (x) { return x + 1; };
            var g = function (x) { return x - 1; };

            expect(Theese.This(1).mapThese(f, g).get()).to.equal(2);
            expect(Theese.That(1).mapThese(f, g).get()).to.equal(0);
            expect(Theese.These(1, 2).mapThese(f, g).get()).to.deep.equal({
                _this: 2,
                _that: 1
            });
        });
    });
});
