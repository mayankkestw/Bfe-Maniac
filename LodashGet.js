// get like lodash
const obj = {
  a: {
    b: {
      c: [1,2,3]
    }
  }
}

function get(obj, path) {
  if (!path) return undefined;

  const keys = Array.isArray(path)
    ? path
    : path
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean);

  let current = obj;

  for (const key of keys) {
    if (current == null || !(key in current)) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}


console.log(get(obj, 'a.b.c'));
console.log(get(obj, 'a.b'));
console.log(get(obj, 'a.b.c.0'));
console.log(get(obj, ['a','b','c','0']));
console.log(get(obj, 'a.b.c[1]'));
