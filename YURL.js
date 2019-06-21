
'use strict';

if (typeof(URL) === 'undefined') {
  throw new Error(`
    Missing URL implementation: https://developer.mozilla.org/en-US/docs/Web/API/URL

    Consider using a polyfill or including https://www.npmjs.com/package/whatwg-url
    in your project.
  `);
}

const resolvePathname = require('./lib/resolvePathname');

function nilToEmptyString(v) {
  return (typeof(v) === 'undefined' || v === null || v === '') ? '' : v;
}

class YURL {

  constructor(str, base) {
    this.parts = str instanceof YURL
      ? this.parts = new URL(str.parts)
      : new URL(str, base instanceof YURL ? base.parts : base);
    this._searchParamsToQuery();
  }

  get(key) {
    if (!this.parts.hasOwnProperty(key) || typeof(this.parts[key] === 'function')) {
      throw new Error(`Invalid URL part: ${key}`);
    }
    return this.parts[key];
  }

  clone() {
    return new YURL(this);
  }

  toString() {
    return this.parts.toString();
  }

  toJSON() {
    return this.parts.toJSON();
  }

  format() {
    return this.toString();
  }

  static parse(str, base) {
    return new YURL(str, base);
  }

  host(host) {
    this.parts.host = host;
    return this;
  }
  
  hostname(hostname) {
    this.parts.hostname = nilToEmptyString(hostname);
    return this;
  }
  
  port(port) {
    this.parts.port = nilToEmptyString(port);
    return this;
  }
  
  pathname(to) {
    if (!to) {
      this.parts.pathname = '/';
    } else {
      this.parts.pathname = resolvePathname(
        to,
        this.parts.pathname || '/',
      );
    }
    return this;
  }
  
  path(path) {
    const match = path.match(/((?:\/)[^?]*)(?:\?([^#]*))?(?:\#(.*))?/);
    this.parts.pathname = nilToEmptyString(match[1]);
    this.parts.search = nilToEmptyString(match[2]);
    this.parts.hash = nilToEmptyString(match[3]);
    this._searchParamsToQuery();
    return this;
  }
  
  search(search) {
    search.charAt(0) != '?' && (search = '?' + search);
    this.parts.search = nilToEmptyString(search);
    return this;
  }
  
  hash(hash) {
    hash.charAt(0) != '#' && (hash = '#' + hash);
    this.parts.hash = nilToEmptyString(hash);
    return this;
  }
  
  auth(auth) {
    this.password(null);
    this.username(auth);
    return this;
  }

  username(username) {
    this.parts.username = nilToEmptyString(username);
    return this;
  }

  password(password) {
    this.parts.password = nilToEmptyString(password);
    return this;
  }
  
  _searchParam(key, value) {
    if (value === null || value === undefined) {
      this.parts.searchParams.delete(key);
    } else {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i += 1) {
          this.parts.searchParams.append(key, value[i]);
        } 
      } else {
        this.parts.searchParams.append(key, value);
      }
    }
  }

  _searchParams(paramsOrKey, value) {
    if (!paramsOrKey) {
      for (const key in this.parts.query) {
        this.parts.searchParams.delete(key);
      }
    } else {
      if (typeof(paramsOrKey) === 'string') {
        this._searchParam(paramsOrKey, value);
      }
      if (typeof(paramsOrKey) === 'object' && paramsOrKey !== null) {
        for (const key in paramsOrKey) {
          this._searchParam(key, paramsOrKey[key]);
        }
      }
    }
    this._searchParamsToQuery();
    return this;
  }

  _searchParamsToQuery() {
    this.parts.query = {};
    for (const pair of this.parts.searchParams) {
      if (!this.parts.query[pair[0]]) {
        this.parts.query[pair[0]] = []; 
      }
      this.parts.query[pair[0]].push(pair[1]);
    }
    return this;
  }

  query() {
    this._searchParams(...arguments);
    return this;
  }

  protocol(protocol) {
    this.parts.protocol = nilToEmptyString(protocol);
    return this;
  }
  
}

module.exports = YURL;
