var mochaAdapter = require('fantasy-check/src/adapters/mocha');
var applicative = require('fantasy-check/src/laws/applicative');
var functor = require('fantasy-check/src/laws/functor');

var Theese = require('../lib/these');
var These = Theese.These;
var This = Theese.This;
var That = Theese.That;

var run = function(m) {
  return m.get();
}

var obey = function(title, testFactory, factoryArgs, skipped) {
  var test = skipped ? it.skip : it;
  test(`${title}`, function() {
    testFactory(mochaAdapter).apply(null, factoryArgs)()
  })
}

obey.skip = function(title, testFactory, factoryArgs) {
  obey(title, testFactory, factoryArgs, true);
}

describe('Fantasy-Check', function() {
  describe('#This', function() {
    // Functor tests
    obey('All (Functor)', functor.laws, [This, run])
    obey('Identity (Functor)', functor.identity, [This, run])
    obey('Composition (Functor)', functor.composition, [This, run])
    
    // Applicative Functor tests
    obey('All (Applicative)', applicative.laws, [This, run])
    obey('Identity (Applicative)', applicative.identity, [This, run])
    obey('Composition (Applicative)', applicative.composition, [This, run])
    obey('Homomorphism (Applicative)', applicative.homomorphism, [This, run])
    obey('Interchange (Applicative)', applicative.interchange, [This, run])
  });

  describe('#That', function() {
    // Functor tests
    obey('All (Functor)', functor.laws, [That, run])
    obey('Identity (Functor)', functor.identity, [That, run])
    obey('Composition (Functor)', functor.composition, [That, run])
    
    // Applicative Functor tests
    obey('All (Applicative)', applicative.laws, [That, run])
    obey('Identity (Applicative)', applicative.identity, [That, run])
    obey('Composition (Applicative)', applicative.composition, [That, run])
    obey('Homomorphism (Applicative)', applicative.homomorphism, [That, run])
    obey('Interchange (Applicative)', applicative.interchange, [That, run])
  });

  describe('#These', function() {
    // Functor tests
    obey('All (Functor)', functor.laws, [These, run])
    obey('Identity (Functor)', functor.identity, [These, run])
    obey('Composition (Functor)', functor.composition, [These, run])
    
    // Applicative Functor tests
    obey('All (Applicative)', applicative.laws, [These, run])
    obey('Identity (Applicative)', applicative.identity, [These, run])
    obey('Composition (Applicative)', applicative.composition, [These, run])
    obey('Homomorphism (Applicative)', applicative.homomorphism, [These, run])
    obey('Interchange (Applicative)', applicative.interchange, [These, run])
  });
});

