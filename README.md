
YURL
====

`yurl` is a simple URL manipulation library for `nodejs`. It is a wrapper 
around the native `url` and `path` modules that adds support for daisy 
chaining, pathname resolution and query args manipulation.


Status
------

First experimental release, under development according to my own needs for it. 
Requests and PRs are more than welcome.


Install
-------

    npm install yurl


Usage
-----

`yurl` provides daisy-chainable methods for all the url components handled by
`url.parse()`/`url.format()`.

    var YURL = require('yurl');

    YURL('http://example.com/foo/bar')     // Wrap url
      .pathname('..', 'baz')               // Sets pathname to /foo/baz
      .port(8888)                          // Changes port to 8888
      .format()                            // Serializes to string

    // ==> http://example.com:8888/foo/baz
    

Test
----

    npm run test


License
-------

MIT

