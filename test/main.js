
var YURL = require('..');

var mocha = require('mocha');
var should = require('should');

describe('YURL()', function() {
  it('Should parse and format to the same string', function() {
    var a = 'http://user:pass@example.com:111/path/to?foo=bar#baz';
    YURL(a).format().should.equal(a);
  });
});

describe('YURL.prototype.pathname()', function() {
  
  it('Should resolve absolute urls', function() {

    var a = 'http://www.example.com/path/to/something';
    var b = 'http://www.example.com/a/different/path';

    YURL(a).pathname('/a', 'different', 'path').format().should.equal(b);
    YURL(a).pathname('/', 'a/different', 'path').format().should.equal(b);
    YURL(a).pathname('/a/different/path').format().should.equal(b);
    
  });

  it('should resolve relative urls', function() {
    
    var a = 'http://www.example.com/path/to/something';
    var b = 'http://www.example.com/path/to/some/other';

    YURL(a).pathname('..', 'some', 'other').format().should.equal(b);
    YURL(a).pathname('../some/other').format().should.equal(b);

  });
  
});

describe('YURL.prototype.query()', function() {

  it('Should support multiple query params', function() {
  
    var a = 'http://www.example.com/?a=foo';
    var b = 'http://www.example.com/?a=foo&b=bar';

    YURL(a).query({b: 'bar'}).format().should.equal(b);

  }); 

});

describe('YURL.prototype.path()', function() {

  it('Should set all path elements', function() {
  
    var a = 'http://www.example.com';
    var p = '/foo/bar?thenaswer=42&magicnumber=17#frag';
    var b = a + p;

    YURL(a).path(p).format().should.equal(b);

  });
  
});
