/**
 * Created with JetBrains PhpStorm.
 * User: piotrek
 * Date: 5/26/12
 * Time: 1:24 PM
 */

var AsyncRunner = require('../lib/AsyncRunner');

var as = new AsyncRunner();

var input = [1,2,3,4,5,6,7,8,9,10];

input.forEach(function(n) {
  as.add(function(done) {
    setTimeout(function() {
      var err;
      console.log('Finished function for', n);
//      if(5 === n)
//        err = new Error('Test error');
      done(err);
    }, Math.round(Math.random() * 5000 + 100));
  });
  console.log("Added function for", n);
});

as.run(function(err) {
  if(err) {
    return console.log('One function finished with error:', err, 'Other functions might be still running!');
  }
  console.log('All functions finished correctly!');
});

console.log('The last line of the script...');