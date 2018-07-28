
const YURL = require('..');

const mocha = require('mocha');
const should = require('should');

describe('new YURL()', () => {
  it('Should parse and format to the same string', () => {
    const a = 'http://user:pass@example.com:111/path/to?foo=bar#baz';
    new YURL(a).format().should.equal(a);
  });
});

describe('new YURL.prototype.pathname()', () => {
  
  it('Should reset the pathname', () => {
    const a = 'http://www.example.com/path/to/something';
    const b = 'http://www.example.com/';
    new YURL(a).pathname(null).format().should.equal(b);
  });

  it('Should resolve absolute urls', () => {
    const a = 'http://www.example.com/path/to/something';
    const b = 'http://www.example.com/a/different/path';
    new YURL(a).pathname('/a', 'different', 'path').format().should.equal(b);
    new YURL(a).pathname('/', 'a/different', 'path').format().should.equal(b);
    new YURL(a).pathname('/a/different/path').format().should.equal(b);
  });

  it('should resolve relative urls', () => {
    const a = 'http://www.example.com/path/to/something';
    const b = 'http://www.example.com/path/to/some/other';
    new YURL(a).pathname('..', 'some', 'other').format().should.equal(b);
    new YURL(a).pathname('../some/other').format().should.equal(b);
  });
  
});

describe('new YURL.prototype.query()', () => {

  it('Should reset query params', () => {
    const a = 'http://www.example.com/?a=foo&b=bar';
    const b = 'http://www.example.com/';
    new YURL(a).query().format().should.equal(b);
  }); 

  it('Should reset a single query param', () => {
    const a = 'http://www.example.com/?a=foo&b=bar';
    const b = 'http://www.example.com/?b=bar';
    new YURL(a).query('a', null).format().should.equal(b);
  });

  it('Should append a single query param multiple times using multiple calls', () => {
    const a = 'http://www.example.com/';
    const b = 'http://www.example.com/?a=foo&a=bar';
    new YURL(a).query('a', 'foo').query('a', 'bar').format().should.equal(b);
  }); 

  it('Should append a single query param multiple times using arrays', () => {
    const a = 'http://www.example.com/';
    const b = 'http://www.example.com/?a=foo&a=bar';
    new YURL(a).query('a', ['foo', 'bar']).format().should.equal(b);
  }); 

  it('Should append multiple query params', () => {
    const a = 'http://www.example.com/?a=foo';
    const b = 'http://www.example.com/?a=foo&b=bar';
    new YURL(a).query({b: 'bar'}).format().should.equal(b);
  }); 

});

describe('new YURL.prototype.path()', () => {

  it('Should set all path elements', () => {
  
    const a = 'http://www.example.com';
    const p = '/foo/bar?thenaswer=42&magicnumber=17#frag';
    const b = a + p;

    const y = new YURL(a).path(p);
    y.parts.pathname.should.equal('/foo/bar');
    y.format().should.equal(b);

  });
  
});

describe('new YURL.prototype.port()', () => {

  it('Should set the port', () => {
    const a = 'http://www.example.com/';
    const b = 'http://www.example.com:8080/';
    new YURL(a).port(8080).format().should.equal(b);
  });

  it('Should remove the port', () => {
    const a = 'http://www.example.com:8080/';
    const b = 'http://www.example.com/';
    new YURL(a).port().format().should.equal(b);
  });
  
});

