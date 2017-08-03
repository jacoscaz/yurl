
'use strict';

const _ = require('lodash');
const url = require('url');
const path = require('path');
const assert = require('assert');

class _YURL {

  constructor(urlString, parse, slashes) {
    assert(_.isString(urlString), 'urlString is not an object.');
    this._parse = parse !== false;
    this._slashes = slashes !== false;
    this._parts = url.parse(urlString, this._parse, this._slashes);
  }

  set(parts) {
    assert(_.isObject(parts), '`parts` is not an object.');
    _.extend(this._parts, parts);
    return this;
  }

  format() {
    return url.format(this._parts);
  }

  clone() {
    return new _YURL(this.format(), this._parse, this._slashes);
  }

  host(host) {
    if (host === false) {
      return this.set({host: null, hostname: null, port: null, href: null});
    }
    assert(_.isString(host), '`host is not a string.');
    return this.set({host: host, hostname: null, port: null, href: null});
  }

  hostname(hostname) {
    if (hostname === false) {
      return this.set({hostname: null, host: null, href: null});
    }
    assert(_.isString(hostname), '`hostname` is not a string.');
    return this.set({hostname: hostname, host: null, href: null});
  }

  protocol(protocol) {
    if (protocol === false) {
      return this.set({protocol: null, href: null});
    }
    assert(_.isString(protocol), '`protocol` is not a string.');
    return this.set({protocol: protocol, href: null});
  }

  slashes(slashes) {
    assert(typeof(slashes) === 'boolean', '`slashes` is not a boolean value.');
    return this.set({slashes: slashes, href: null});
  }

  port(port) {
    if (port === false) {
      return this.set({port: null, host: null, href: null});
    }
    assert(typeof(port) === 'number', '`port` is not a number.');
    return this.set({port: port, host: null, href: null});
  }

  pathname(pathname) {
    if (pathname === false) {
      return this.set({pathname: null, path: null, href: null});
    }
    const args = Array.prototype.slice.call(arguments);
    args.unshift(this._parts.pathname || '/');
    return this.set({pathname: path.posix.resolve.apply(path.posix, args), path: null, href: null});
  }

  path(path) {
    if (path === false) {
      return this.set({pathname: null, path: null, href: null});
    }
    assert(_.isString(path), '`path` is not a string.');
    const parts = url.parse(path, true);
    return this.set({
      path: parts.path,
      href: parts.href,
      search: parts.search,
      query: parts.query,
      hash: parts.hash,
      pathname: parts.pathname
    });
  }

  search(search) {
    if (search === false) {
      return this.set({search: null, query: null, href: null});
    }
    assert(_.isString(search), '`search` is not a string.');
    search.charAt(0) !== '?' && (search = '?' + search);
    return this.set({search: search});
  }

  hash(hash) {
    if (hash === false) {
      return this.set({hash: null, href: null});
    }
    assert(_.isString(hash), '`hash` is not a string.');
    hash.charAt(0) !== '#' && (hash = '#' + hash);
    return this.set({hash: hash, href: null});
  }

  auth(auth) {
    if (auth === false) {
      return this.set({auth: null, href: null});
    }
    assert(_.isString(auth), '`auth` is not a string.');
    return this.set({auth: auth, href: null});
  }

  query(args) {
    if (args === false) {
      return this.set({query: {}, href: null, search: null})
    }
    return this.set({query: _.extend(this._parts.query || {}, args), href: null, search: null});
  }

}

module.exports = function YURL(urlString, parse, slashes) {
  return new _YURL(urlString, parse, slashes);
};
