AsyncRunner
===========

A class for running multiple asynchronous functions in JavaScript. Tested in [node.js](http://nodejs.org/), should be working in browser as well.

## Using

  To run some functions asynchronously you need to create an object of the AsyncRunner class:

  ```javascript
  var as = new AsyncRunner();
  ```

  Then you can add all functions with `add` method.

  ```javascript
  as.add(function(done) {
    doSomethingHere();
    done();
  });
  ```

  Such function gets a single callback argument, usually named `done`, which must be run after the function has finished. This function can provided `done` callback with an error (string, `Error` object, etc.). See below.

  When all functions are added to a queue, call the `run` method from the `as` object:

  ```javascript
  as.run(function(err) {
    if(err) return somethingWentWrong();
    everythingWasOk();
  });
  ```

  The `run` method takes a single argument with a callback to be run after all functions were finished.

  If any of functions passes an error to a `done` function, the callback will be run immediately and the error will be passed as an argument. All other callback would be ignored.

### Warning

  If any of functions will return an error the callback will be called immediately but all already running functions **will run normally and won't be interrupted**! Using multiple parallel asynchronous functions is recommended for receiving/fetching data only!

## Example

  Simple example is shown in the `examples` directory. You can uncomment two lines in the middle to see how error handling works (it simulates an error on functions 5).

  More examples will be added (probably).

## TODO

  - Simultaneous running functions count limit (with this equal to 1 it could run functions in sequence)
  - Add more examples (e.g. data fetching for [Express](http://expressjs.com/) running web application)

