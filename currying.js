// Currying is a functional programming technique where a function that takes multiple arguments is transformed into a sequence of functions that each take one argument (or a subset of arguments).

// Use case	                       |     Benefit
// Partial application	           |     Preconfigure functions easily
// React event handlers	           |     Cleaner, reusable callbacks
// Function composition	           |     Declarative, pipeline-like transformations
// API / Config functions	         |     Encapsulate shared parameters cleanly

// https://bigfrontend.dev/problem/implement-curry

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  // your code here
  return function curriedFun(...args){
    if (args.length >= fn.length){
      return fn(...args);
    }

    return (...next) => curriedFun(...args, ...next);
  }
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6


// https://bigfrontend.dev/problem/implement-curry-with-placeholder

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
  const placeholder = curry.placeholder;

  function curried(...args) {
    const ready = args.length >= fn.length && !args.slice(0, fn.length).includes(placeholder);
    if(ready) return fn(...args);
    return (...nextArgs) => {
      const mergedArgs = args.map(arg =>
        arg === placeholder && nextArgs.length ? nextArgs.shift() : arg
      );
      return curried(...mergedArgs, ...nextArgs);
    };
  }

  return curried;
}

curry.placeholder = Symbol()

const  join = (a, b, c) => {
   return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
const _ = curry.placeholder
curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(_, 2)(1, 3) // '1_2_3'
curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'
