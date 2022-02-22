
YURL
====

A daisy-chaining URL manipulation library. As of v4.0.0, the library has been
ported to TypeScript.

Usage
-----

Modern versions of Node.js ship with a native implementation of the
[WHATWG URL interface][u1] in the form of the `URL` class exported by the
[url](https://nodejs.org/api/url.html) module.

`yurl` builds upon such interface by implementing dedicated modifier methods
for each `URL` property, adding a few bits of useful logic here and there.

[u1]: https://developer.mozilla.org/en-US/docs/Web/API/URL

### Example

```typescript
import { YURL } from 'yurl';

new YURL('http://example.com/foo/bar?a=24')
    .pathname('..', 'baz')                  // Resolves pathname to /foo/baz
    .port(8888)                             // Changes port to 8888
    .query({a: null, b: 24})                // Drops param "a", sets param "b"
    .format()                               // Serialization

// ==> http://example.com:8888/foo/baz?b=24
```

### Installation

```shell
npm install yurl
```

```typescript
import { YURL } from 'yurl';
```

```javascript
const { YURL } = require('yurl');
```

### Parts

The backing instance of the `URL` class is available through the `parts` property.

```js
const example = new YURL('http://example.com');

example.parts.hostname === 'example.com';    // true
example.parts.protocol === 'http:';          // true
```

### Cloning

The `clone()` method returns a deep copy of the current `YURL` instance. All other methods are modifier methods and alter the instance they are called upon.

### Pathname resolution

The `pathname()` method supports trailing slashes and both absolute and relative pathnames.

```js
const example = new YURL('http://example.com');

example.parts.pathname === '/';               // true
example.pathname('/foo/bar');
example.parts.pathname === '/foo/bar';        // true
example.pathname('../baz');
example.parts.pathname === '/baz';            // true
example.pathname('/baz/');
example.parts.pathname === '/baz/';           // true
```

### Query params

Query params are set and removed via the `.query()` method.

```js
const example = new YURL('http://example.com');

example.query('answer', '42');
example.parts.query.answer[0] === '42';       // true
example.format();                             // ?answer=42

example.query({answer: null, hello: 'world'});
example.parts.query.answer;                   // undefined
example.parts.query.hello[0] === 'world';     // true
example.format();                             // ?hello=world

example.query('pets', ['cats', 'dogs']);
example.parts.query.pets[0] === 'cats';       // true
example.parts.query.pets[1] === 'dogs';       // true
example.format();                             // ?pets=cats&pets=dogs

example.query();                              // removes all params
```
   

Test
----

```
npm test
```


License
-------

MIT
