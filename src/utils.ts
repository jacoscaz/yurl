
export interface nilToEmptyStringFn {
  (v: undefined): '';
  (v: null): '';
  (v: ''): '';
  <T>(v: T): Exclude<T, undefined | null | ''>;
}

export const nilToEmptyString: nilToEmptyStringFn = (v: any) => {
  return (typeof v === 'undefined' || v === null || v === '') ? '' : v;
};

export const searchParamsToObj = (params: URLSearchParams): Record<string, string | string[]> => {
  const obj: Record<string, string | string[]> = Object.create(null);
  for (const [key, value] of params) {
    if (typeof obj[key] === 'string') {
      if (Array.isArray(obj[key])) {
        (<string[]>obj[key]).push(value);
      } else {
        obj[key] = [<string>obj[key]];
        (<string[]>obj[key]).push(value);
      }
    } else {
      obj[key] = value;
    }
  }
  return obj;
};
