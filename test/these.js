const expect = require('chai').expect;
const Theese = require('../lib/these');

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
});
