export type Dict<T> = {
  [k: string]: T | undefined;
};

// dict =
// Array.prototype.map, but for Dict
export function mapDict<T, S>(dict: Dict<T>, fn: (arg: T, idx: number) => S): Dict<S> {
  const out: Dict<S> = {};

  // iterate through the dictionary
  Object.keys(dict).forEach((key, idx) => {
    const thisItem = dict[key];
    if (typeof thisItem !== 'undefined') {
      out[key] = fn(thisItem, idx);
    }
  });
  return out;
}

const testDict = {
  typescript: ['ts'],
  html: ['html', 'htm']
};

mapDict(testDict, exts => exts.map(e => `*.${exts}`).join(', '));

// Array.prototype.reduce, but for Dict
export function reduceDict<T, S>(dict: Dict<T>, reducer: (acc: S, cur: T, idx: number) => S, initialVal: S) {
  let acc: S = initialVal;
  Object.keys(dict).forEach((key, idx) => {
    const thisItem = dict[key];
    if (typeof thisItem !== 'undefined') acc = reducer(acc, thisItem, idx);
  });

  return acc;
}
