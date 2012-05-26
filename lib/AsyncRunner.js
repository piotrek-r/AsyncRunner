/**
 * Created with JetBrains PhpStorm.
 * User: Piotr Rybałtowski <piotrek@rybaltowski.pl>
 * Date: 5/26/12
 * Time: 1:07 PM
 */

var AsyncRunner = module.exports = exports = function(options) {
  var that = this,
    fns = [],
    fnsLeft,
    running = false,
    returned = false,
    callback;

  options = options || {};

  that.add = function(fn) {
    fns.push(fn);
  };

  that.run = function(cb) {
    callback = cb || function(err) {};

    if(running) {
      callback(new Error('The queue has already been started...'));
    }
    running = true;

    fnsLeft = fns.length;

    fns.forEach(function(fn) {
      process.nextTick(function() {
        fn(function(err) {
          if(returned) return;
          if(err) {
            returned = true;
            return callback(err);
          }
          --fnsLeft;
          finish();
        });
      });
    })

  };

  function finish() {
    if(1 > fnsLeft) {
      callback();
    }
  }

};