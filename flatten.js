// Flattening an array means turning a nested array into a single-level array, i.e., removing all inner array structures while keeping the order of elements.

// https://bigfrontend.dev/problem/implement-Array-prototype.flat

/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */

function flat(arr, depth = 1) {
  let res = [];

  for (let i=0; i<arr.length; i++) {
    if (!(i in arr)) continue;
    if (Array.isArray(arr[i]) && depth > 0){
      res = res.concat(flat(arr[i], depth === Infinity ? Infinity : depth - 1));
    } else {
      res.push(arr[i]);
    }
  }

  return res;
}

const arr = [1, [2], [3, [4]]];

flat(arr)
// [1, 2, 3, [4]]
flat(arr, 1)
// [1, 2, 3, [4]]
flat(arr, 2)
// [1, 2, 3, 4]

// sparse array
flat([1,2,empty,empty,undefined,[3,4,[5,6,[7,8,[9,10]]]]], Infinity) 
