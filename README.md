
YURL
====

A URL manipulation library that offers support for daisy chaining, pathname resolution and query args manipulation.


Install
-------

    npm install yurl


Usage
-----

`yurl` provides daisy-chainable methods for all url parts handled by the `URL` class. 

    var YURL = require('yurl');

    YURL('http://example.com/foo/bar?a=24')   // Wraps url
      .pathname('..', 'baz')                  // Sets pathname to /foo/baz
      .port(8888)                             // Changes port to 8888
      .query({a: null, b: 24})                // Drops and sets query params
      .format()                               // Serializes to string

    // ==> http://example.com:8888/foo/baz?b=24

These methods mutate the `YURL` instance they're called upon. Use `.clone()` first to duplicate the original instance and mutate the copy.
    

Test
----

    npm run test


License
-------

MIT
