/**
 * User: Piotr Rybałtowski <piotrek@rybaltowski.pl>
 */

module.exports = function AsyncRunner() {
  var that = this
    , fns = []
    , fnsCount = 0
    , errored = false;

  that.add = function(fn) {
    fns.push(fn);
    ++fnsCount;
  };

  that.run = function(cb) {
    var fn;
    cb = cb || function(err) {};
    if (!fnsCount || !fns.length) cb(new Error('No functions added'));

    (function shortCircuit() {
      fn = fns.shift();
      if ('undefined' !== typeof fn) {
        fn(function(err) {
          --fnsCount;
          if (errored) return;
          if (err) { errored = true; return cb(err); }
          if (fnsCount <= 0) {
            cb();
          }
        });
        shortCircuit();
      }
    })();
  };

};
