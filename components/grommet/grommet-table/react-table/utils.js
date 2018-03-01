/* eslint-disable no-param-reassign,no-nested-ternary */
import React from 'react';
//

// ########################################################################
// Non-exported Helpers
// ########################################################################

function isArray(a) {
  return Array.isArray(a);
}

function flattenDeep(arr, newArr = []) {
  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (let i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}


function makePathArray(obj) {
  return flattenDeep(obj)
    .join('.')
    .replace(/\[/g, '.')
    .replace(/]/g, '')
    .split('.');
}

function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  const pathObj = makePathArray(path);
  let val;
  try {
    val = pathObj.reduce((current, pathPart) => current[pathPart], obj);
  } catch (e) {
    // continue regardless of error
  }
  return typeof val !== 'undefined' ? val : def;
}

function set(obj = {}, path, value) {
  const keys = makePathArray(path);
  let keyPart;
  let cursor = obj;
  // eslint-disable-next-line no-cond-assign
  while ((keyPart = keys.shift()) && keys.length) {
    if (!cursor[keyPart]) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function range(n) {
  const arr = [];
  for (let i = 0; i < n; i += 1) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs, indexKey) {
  return arr.sort((rowA, rowB) => {
    for (let i = 0; i < funcs.length; i += 1) {
      const comp = funcs[i];
      const desc = dirs[i] === false || dirs[i] === 'desc';
      const sortInt = comp(rowA, rowB);
      if (sortInt) {
        return desc ? -sortInt : sortInt;
      }
    }
    // Use the row index for tie breakers
    return dirs[0]
      ? rowA[indexKey] - rowB[indexKey]
      : rowB[indexKey] - rowA[indexKey];
  });
}

function remove(a, b) {
  return a.filter((o, i) => {
    const r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function clone(a) {
  try {
    return JSON.parse(
      JSON.stringify(a, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        }
        return value;
      }),
    );
  } catch (e) {
    return a;
  }
}

function getFirstDefined(...args) {
  for (let i = 0; i < args.length; i += 1) {
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
  }
  return undefined;
}

function sum(arr) {
  return arr.reduce((a, b) => (
    a + b
  ), 0);
}


function groupBy(xs, key) {
  return xs.reduce((rv, x, i) => {
    const resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function asPx(value) {
  value = Number(value);
  return Number.isNaN(value) ? null : `${value}px`;
}


function splitProps({ className, style, ...rest }) {
  return {
    className,
    style,
    rest: rest || {},
  };
}

function compactObject(obj) {
  const newObj = {};
  if (obj) {
    Object.keys(obj).map((key) => {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        obj[key] !== undefined &&
        typeof obj[key] !== 'undefined'
      ) {
        newObj[key] = obj[key];
      }
      return true;
    });
  }
  return newObj;
}

function isSortingDesc(d) {
  return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}

function normalizeComponent(Comp, params = {}, fallback = Comp) {
  return typeof Comp === 'function'
    ? Object.getPrototypeOf(Comp).isReactComponent
      ? <Comp {...params} />
      : Comp(params)
    : fallback;
}

export default {
  get,
  set,
  orderBy,
  range,
  remove,
  clone,
  getFirstDefined,
  sum,
  groupBy,
  isArray,
  splitProps,
  compactObject,
  isSortingDesc,
  normalizeComponent,
  asPx,
};
