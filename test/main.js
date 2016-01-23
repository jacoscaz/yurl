
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
