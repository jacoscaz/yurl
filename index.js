
var url = require('url');
var path = require('path');
var assert = require('assert');

function extend(target) {
  var sources = Array.prototype.slice.call(arguments);
  var source, s, keys, key, k;
  for (s = 0; s < sources.length; s++) {
    source = sources[s];
    keys = Object.keys(source);
    for (k = 0; k < keys.length; k++) {
      key = keys[k];
      if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

function deepCopy(source) {
  var copy = source;
  var keys, key, k;
  if (source && typeof source === 'object') {
    if (Array.isArray(source)) {
      copy = [];
      for (k = 0; k < source.length; k++) {
        copy[k] = deepCopy(source[k]);
      }
    } else {
      copy = {};
      keys = Object.keys(source);
      for (k = 0; k < keys.length; k++) {
        key = keys[k];
        copy[key] = deepCopy(source[key]);
      }
    }
  }
  return copy;
}

function YURL(urlString, parse, slashes) {
  if (!(this instanceof YURL)) {
    return new YURL(urlString, parse, slashes);
  }
  assert(typeof(urlString) === 'string', 'urlString is not an object.');
  this._parse = parse !== false;
  this._slashes = slashes !== false;
  this._parts = url.parse(urlString, this._parse, this._slashes);
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
  return new YURL(this.format(), this._parse, this._slashes);
}

YURL.prototype.host = function(host) {
  if (host === false) {
    return this.set({host: null, hostname: null, port: null, href: null});
  }
  assert(typeof(host) === 'string', '`host is not a string.');
  return this.set({host: host, hostname: null, port: null, href: null});
}

YURL.prototype.hostname = function(hostname) {
  if (hostname === false) {
    return this.set({hostname: null, host: null, href: null});
  }
  assert(typeof(hostname) === 'string', '`hostname` is not a string.');
  return this.set({hostname: hostname, host: null, href: null});
}

YURL.prototype.protocol = function(protocol) {
  if (protocol === false) {
    return this.set({protocol: null, href: null});
  }
  assert(typeof(protocol) === 'string', '`protocol` is not a string.');
  return this.set({protocol: protocol, href: null});
}

YURL.prototype.slashes = function(slashes) {
  assert(typeof(slashes) === 'boolean', '`slashes` is not a boolean value.');
  return this.set({slashes: slashes, href: null});
}

YURL.prototype.port = function(port) {
  if (port === false) {
    return this.set({port: null, host: null, href: null});
  }
  assert(typeof(port) === 'number', '`port` is not a number.');
  return this.set({port: port, host: null, href: null});
}

YURL.prototype.pathname = function(pathname) {
  if (pathname === false) {
    return this.set({pathname: null, path: null, href: null});
  }
  var args = Array.prototype.slice.call(arguments);
  args.unshift(this._parts.pathname || '/');
  return this.set({pathname: path.posix.resolve.apply(path.posix, args), path: null, href: null});
}

YURL.prototype.path = function(path) {
  if (path === false) {
    return this.set({pathname: null, path: null, href: null});
  }
  assert(typeof(path) === 'string', '`path` is not a string.');
  return this.set({path: path, pathname: null, query: null, href: null});
}

YURL.prototype.search = function(search) {
  if (search === false) {
    return this.set({search: null, query: null, href: null});
  }
  assert(typeof(search) === 'string', '`search` is not a string.');
  search.charAt(0) != '?' && (search = '?' + search);
  return this.set({search: search});
}

YURL.prototype.hash = function(hash) {
  if (hash === false) {
    return this.set({hash: null, href: null});
  }
  assert(typeof(hash) === 'string', '`hash` is not a string.');
  hash.charAt(0) != '#' && (hash = '#' + hash);
  return this.set({hash: hash, href: null});
}

YURL.prototype.auth = function(auth) {
  if (auth === false) {
    return this.set({auth: null, href: null});
  }
  assert(typeof(auth) === 'string', '`auth` is not a string.');
  return this.set({auth: auth, href: null});
}

YURL.prototype.query = function(args) {
  if (args === false) {
    return this.set({query: {}, href: null, search: null})
  }
  return this.set({query: extend(this._parts.query || {}, args), href: null, search: null});
}

