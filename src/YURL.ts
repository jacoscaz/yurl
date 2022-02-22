
import { URL, URLProps } from './URL';
import { nilToEmptyString, searchParamsToObj } from './utils';
import { resolvePathname } from './resolvePathname';

export class YURL {

  private readonly parts: URL;

  constructor(str: YURL | string, base?: YURL | string) {
    this.parts = str instanceof YURL
      ? this.parts = new URL(str.parts)
      : new URL(str, base instanceof YURL ? base.parts : base)
    ;
  }

  get(key: 'path'): string;
  get(key: 'query' | 'searchParams'): Record<string, string | string[]>;
  get(key: URLProps): string;
  get(key: 'path' | 'query' | 'searchParams' | URLProps): Record<string, string | string[]> | string {
    switch (key) {
      case 'path':
        return `${this.parts.pathname}${this.parts.search}`;
      case 'query':
      case 'searchParams':
        return searchParamsToObj(this.parts.searchParams);
      case 'hash':
      case 'host':
      case 'hostname':
      case 'href':
      case 'origin':
      case 'password':
      case 'pathname':
      case 'port':
      case 'protocol':
      case 'search':
      case 'username':
        return this.parts[key];
      default:
        throw new Error(`Invalid URL part: ${key}`);
    }
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
    return this.parts.toString();
  }

  static parse(str: string, base?: string) {
    return new YURL(str, base);
  }

  host(host: string) {
    this.parts.host = host;
    return this;
  }

  hostname(hostname?: string | null) {
    this.parts.hostname = nilToEmptyString(hostname);
    return this;
  }

  port(port?: string | number | null) {
    this.parts.port = nilToEmptyString(port) + '';
    return this;
  }

  pathname(to?: string | null) {
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

  path(path: string) {
    const match = path.match(/((?:\/)[^?]*)(?:\?([^#]*))?(?:\#(.*))?/);
    if (!match) {
      throw new Error('Invalid pathname');
    }
    return this
      .pathname(match[1])
      .search(match[2])
    ;
  }

  search(search?: string | null) {
    if (search) {
      if (search.charAt(0) !== '?') {
        this.parts.search = `?${search}`;
      } else {
        this.parts.search = search;
      }
    } else {
      this.parts.search = '';
    }
    return this;
  }

  hash(hash?: string | null) {
    if (hash) {
      if (hash.charAt(0) !== '#') {
        this.parts.hash = `#${hash}`;
      } else {
        this.parts.hash = hash;
      }
    } else {
      this.parts.hash = '';
    }
    return this;
  }

  auth(auth?: string | null) {
    return this
      .password(null)
      .username(auth)
    ;
  }

  username(username?: string | null) {
    this.parts.username = nilToEmptyString(username);
    return this;
  }

  password(password?: string | null) {
    this.parts.password = nilToEmptyString(password);
    return this;
  }

  searchParam(key: string, value?: '' | string | string[] | null) {
    if (value === null || value === undefined || value === '') {
      this.parts.searchParams.delete(key);
    } else {
      if (Array.isArray(value)) {
        for (let i = 0, l = value.length; i < l; i += 1) {
          this.parts.searchParams.append(key, value[i]);
        }
      } else {
        this.parts.searchParams.append(key, value);
      }
    }
  }

  searchParams(): YURL;
  searchParams(paramsOrKey: Record<string, string | string[]>): YURL;
  searchParams(paramsOrKey: string | Record<string, string | string[]> | undefined, value?: string | string[] | null | undefined): YURL;
  searchParams(paramsOrKey?: string | Record<string, string | string[]>, value?: string | string[] | null) {
    if (paramsOrKey) {
      if (typeof(paramsOrKey) === 'string') {
        this.searchParam(paramsOrKey, value);
      }
      if (typeof paramsOrKey === 'object') {
        for (const key in paramsOrKey) {
          this.searchParam(key, paramsOrKey[key]);
        }
      }
    } else {
      const { searchParams } = this.parts;
      for (const key of Array.from(searchParams.keys())) {
        searchParams.delete(key);
      }
    }
    return this;
  }

  query(): YURL;
  query(paramsOrKey: Record<string, string | string[]>): YURL;
  query(paramsOrKey: string, value?: string | string[] | null): YURL;
  query(paramsOrKey?: string | Record<string, string | string[]>, value?: string | string[] | null) {
    return this.searchParams(paramsOrKey, value);
  }

  protocol(protocol?: string | null) {
    this.parts.protocol = nilToEmptyString(protocol);
    return this;
  }

}
