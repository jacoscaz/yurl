
YURL
====

`yurl` is a simple URL manipulation library for `nodejs`.
It is a wrapper around the native `url` and `path` modules that adds support for daisy chaining,
pathname resolution and query args manipulation.


Status
------

First experimental release, under development according to my own needs for it. Requests and PR
are more than welcome.


Install
-------

    npm install yurl


Usage
-----

    var yurl = require('yurl');
    
    yurl('http://example.com/foo/bar').pathname('..', 'baz').format();  // http://example.com/foo/baz


Test
----

    npm run test


License
-------

MIT

