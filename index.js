
var url = require('url');
var path = require('path');
var assert = require('assert');

function extend(a, b) {
  assert(typeof(a) === 'object', '`a` is not an object.');
  assert(typeof(b) === 'object', '`b` is not an object.');
  var keys = Object.keys(b);
  var key = null;
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    a[key] = b[key];
  } 
  return a;
}

function YURL(parts, parse, slashes) {
  if (!(this instanceof YURL)) {
    return new YURL(parts, parse, slashes);  
  }
  this._parse = parse !== false;
  this._slashes = slashes !== false;
  switch(typeof(parts)) {
    case 'string':
      this._parts = url.parse(parts, this._parse, this._slashes);
    break;
    case 'object':
      this._parts = extend({}, parts);
    break;
    default: 
      throw new Error('Unsupported url format.');
    break;
  }
}

module.exports = YURL;

YURL.prototype.set = function(parts) {
  assert(typeof(parts) === 'object', '`parts` is not an object.');
  extend(this._parts, parts);
  return this;
}

YURL.prototype.format = function() {
  return url.format(this._parts);  
}

YURL.prototype.clone = function() {
  return new YURL(this._parts);  
}

YURL.prototype.parts = function() {
  return url.parse(url.format(this._parts), this._parse, this._slashes);
}


YURL.prototype.host = function(host) {
  if (host === false) {
    return this.clone().set({host: null, hostname: null, port: null, href: null});
  }
  assert(typeof(host) === 'string', '`host is not a string.');
  return this.clone().set({host: host, hostname: null, port: null, href: null});  
}

YURL.prototype.hostname = function(hostname) {
  if (hostname === false) {
    return this.clone().set({hostname: null, host: null, href: null});  
  }
  assert(typeof(hostname) === 'string', '`hostname` is not a string.');
  return this.clone().set({hostname: hostname, host: null, href: null});
}

YURL.prototype.protocol = function(protocol) {
  if (protocol === false) {
    return this.clone().set({protocol: null, href: null});
  }
  assert(typeof(protocol) === 'string', '`protocol` is not a string.');
  return this.clone().set({protocol: protocol, href: null});  
}

YURL.prototype.slashes = function(slashes) {
  assert(typeof(slashes) === 'boolean', '`slashes` is not a boolean value.');
  return this.clone().set({slashes: slashes, href: null});  
}

YURL.prototype.port = function(port) {
  if (port === false) {
    return this.clone().set({port: null, host: null, href: null});  
  }
  assert(typeof(port) === 'number', '`port` is not a number.');
  return this.clone().set({port: port, host: null, href: null});  
}

YURL.prototype.pathname = function(pathname) {
  if (pathname === false) {
    return this.clone().set({pathname: null, path: null, href: null});
  }
  var args = Array.prototype.slice.call(arguments);
  args.unshift(this._parts.pathname || '/');
  return this.clone().set({pathname: path.posix.resolve.apply(path.posix, args), path: null, href: null});
}

YURL.prototype.path = function(path) {
  if (path === false) {
    return this.clone().set({pathname: null, path: null, href: null});
  }
  assert(typeof(path) === 'string', '`path` is not a string.');
  return this.clone().set({path: path, pathname: null, query: null, href: null});  
}

YURL.prototype.search = function(search) {
  if (search === false) {
    return this.clone().set({search: null, query: null, href: null});
  }
  assert(typeof(search) === 'string', '`search` is not a string.');
  search.charAt(0) != '?' && (search = '?' + search);
  return this.clone().set({search: search});  
}

YURL.prototype.hash = function(hash) {
  if (hash === false) {
    return this.clone().set({hash: null, href: null});
  }
  assert(typeof(hash) === 'string', '`hash` is not a string.');
  hash.charAt(0) != '#' && (hash = '#' + hash);
  return this.clone().set({hash: hash, href: null});  
}

YURL.prototype.auth = function(auth) {
  if (auth === false) {
    return this.clone().set({auth: null, href: null});
  }
  assert(typeof(auth) === 'string', '`auth` is not a string.');
  return this.clone().set({auth: auth, href: null});
}

YURL.prototype.query = function(args) {
  if (args === false) {
    return this.clone().set({query: {}, href: null});
  }
  assert(typeof(args) === 'object', '`args` is not an object.');
  return this.clone().set({query: extend(this._parts.query, args), search: null});
}

