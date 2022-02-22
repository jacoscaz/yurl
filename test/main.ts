
import { YURL } from '..';
import { strictEqual, deepEqual } from 'assert'

describe('YURL', () => {

  describe('new YURL()', () => {

    it('Should parse and format to the same string', () => {
      const a = 'http://user:pass@example.com:111/path/to?foo=bar#baz';
      strictEqual(new YURL(a).format(), a);
    });

    it('Should parse and format to the same string (trailing slash)', () => {
      const a = 'http://user:pass@example.com:111/path/to/?foo=bar#baz';
      strictEqual(new YURL(a).format(), a);
    });

  });

  describe('new YURL.prototype.pathname()', () => {

    it('Should reset the pathname', () => {
      const a = 'http://www.example.com/path/to/something';
      const b = 'http://www.example.com/';
      strictEqual(new YURL(a).pathname(null).format(), b);
    });

    it('Should support absolute pathnames', () => {
      const a = 'http://www.example.com/path/to/something';
      const b = 'http://www.example.com/a/different/path';
      strictEqual(new YURL(a).pathname('/a/different/path').format(), b);
    });

    it('should support relative pathnames', () => {
      const a = 'http://www.example.com/path/to/something';
      const b = 'http://www.example.com/path/some/other';
      strictEqual(new YURL(a).pathname('../some/other').format(), b);
    });

    it('should support pathnames with a trailing slash', () => {
      const a = 'http://www.example.com/path/to/something/';
      const b = 'http://www.example.com/path/to/some/other/';
      strictEqual(new YURL(a).pathname('../some/other/').format(), b);
    });

  });

  describe('new YURL.prototype.query()', () => {

    it('Should reset query params', () => {
      const a = 'http://www.example.com/?a=foo&b=bar';
      const b = 'http://www.example.com/';
      strictEqual(new YURL(a).query().format(), b);
    });

    it('Should reset a single query param', () => {
      const a = 'http://www.example.com/?a=foo&b=bar';
      const b = 'http://www.example.com/?b=bar';
      strictEqual(new YURL(a).query('a', null).format(), b);
    });

    it('Should append a single query param multiple times using multiple calls', () => {
      const a = 'http://www.example.com/';
      const b = 'http://www.example.com/?a=foo&a=bar';
      strictEqual(new YURL(a).query('a', 'foo').query('a', 'bar').format(), b);
    });

    it('Should append a single query param multiple times using arrays', () => {
      const a = 'http://www.example.com/';
      const b = 'http://www.example.com/?a=foo&a=bar';
      strictEqual(new YURL(a).query('a', ['foo', 'bar']).format(), b);
    });

    it('Should append multiple query params', () => {
      const a = 'http://www.example.com/?a=foo';
      const b = 'http://www.example.com/?a=foo&b=bar';
      strictEqual(new YURL(a).query({b: 'bar'}).format(), b);
    });

  });

  describe('new YURL.prototype.path()', () => {

    it('Should set the pathname', () => {
      const a = 'http://www.example.com';
      const p = '/foo/bar';
      const b = a + p;
      strictEqual(new YURL(a).path(p).format(), b);
    });

    it('Should set the query', () => {
      const a = 'http://www.example.com';
      const p = '/';
      const q = '?foo=bar'
      const b = a + p + q;
      strictEqual(new YURL(a).path(p).query({foo: 'bar'}).format(), b);
    });

    it('Should set the fragment', () => {
      const a = 'http://www.example.com';
      const p = '/';
      const f = '#frag'
      const b = a + p + f;
      strictEqual(new YURL(a).path(p).hash('frag').format(), b);
    });

    it('Should set the pathname and search elements', () => {
      const a = 'http://www.example.com';
      const p = '/foo/bar?thenaswer=42&magicnumber=17';
      const b = a + p;
      strictEqual(new YURL(a).path(p).format(), b);
    });

  });

  describe('new YURL.prototype.port()', () => {

    it('Should set the port', () => {
      const a = 'http://www.example.com/';
      const b = 'http://www.example.com:8080/';
      strictEqual(new YURL(a).port(8080).format(), b);
    });

    it('Should remove the port', () => {
      const a = 'http://www.example.com:8080/';
      const b = 'http://www.example.com/';
      strictEqual(new YURL(a).port().format(), b);
    });

  });


  describe('new YURL.prototype.protocol()', () => {

    it('Should change the protocol', () => {
      const a = 'http://www.example.com/';
      const b = 'https://www.example.com/';
      strictEqual(new YURL(a).protocol('https').format(), b);
    });

  });

  describe('new YURL.prototype.get()', () => {

    const protocol = 'http:';
    const hostname = 'example.com';
    const port = 1717;
    const pathname = '/path/to';
    const search = '?foo=bar';
    const hash = '#frag';
    const href = `${protocol}//${hostname}:${port}${pathname}${search}${hash}`;

    const yurl = new YURL(href);

    it('Should get the protocol', () => {
      strictEqual(yurl.get('protocol'), protocol);
    });

    it('Should get the host', () => {
      strictEqual(yurl.get('host'), `${hostname}:${port}`);
    });

    it('Should get the hostname', () => {
      strictEqual(yurl.get('hostname'), hostname);
    });

    it('Should get the port', () => {
      strictEqual(yurl.get('port'), port + '');
    });

    it('Should get the path', () => {
      strictEqual(yurl.get('path'), `${pathname}${search}`);
    });

    it('Should get the pathname', () => {
      strictEqual(yurl.get('pathname'), pathname);
    });

    it('Should get the search', () => {
      strictEqual(yurl.get('search'), search);
    });

    it('Should get the search params / query', () => {
      deepEqual(yurl.get('searchParams'), { foo: 'bar' });
      deepEqual(yurl.get('query'), { foo: 'bar' });
    });

    it('Should get the hash', () => {
      deepEqual(yurl.get('hash'), hash);
    });

    it('Should get the href', () => {
      deepEqual(yurl.get('href'), href);
    });

  });


  describe('new YURL.prototype.username()', () => {
    it('Should set the username', () => {
      const a = 'http://www.example.com/';
      const b = 'http://foobar@www.example.com/';
      strictEqual(new YURL(a).username('foobar').format(), b);
    });
  });

  describe('new YURL.prototype.password()', () => {
    it('Should set the password', () => {
      const a = 'http://www.example.com/';
      const b = 'http://:foobar@www.example.com/';
      strictEqual(new YURL(a).password('foobar').format(), b);
    });
  });

  describe('new YURL.prototype.auth()', () => {
    it('Should set the auth', () => {
      const a = 'http://www.example.com/';
      const b = 'http://foobarfoobarfoobar@www.example.com/';
      strictEqual(new YURL(a).auth('foobarfoobarfoobar').format(), b);
    });
  });

});
