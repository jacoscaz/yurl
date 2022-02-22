
const _URL = URL;

if (typeof _URL === 'undefined') {
  throw new Error(`
    Missing URL implementation: https://developer.mozilla.org/en-US/docs/Web/API/URL

    Consider using a polyfill or including https://www.npmjs.com/package/whatwg-url
    in your project.
  `);
}

export { _URL as URL };

export type URLProps = 'hash'
  | 'host'
  | 'hostname'
  | 'href'
  | 'origin'
  | 'password'
  | 'pathname'
  | 'port'
  | 'protocol'
  | 'search'
  | 'username'
  ;
