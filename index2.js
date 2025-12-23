//Memoization in js
// 1️⃣ What is Memoization?

// Memoization is an optimization technique where we cache the result
// of a function call and return the cached result when the same inputs occur again.

// 📌 In short:
// “Don’t recompute if you already know the answer.”

//Simple Example (Without Memoization ❌)
function square(n) {
  console.log("Calculating...");
  return n * n;
}

square(5); // Calculating... → 25
square(5); // Calculating... → 25 (again)

//Same Example With Memoization ✅
function memoizedSquare() {
  const cache = {};

  return function (n) {
    if (cache[n]) {
      console.log("From cache");
      return cache[n];
    }

    console.log("Calculating...");
    cache[n] = n * n;
    return cache[n];
  };
}

const square = memoizedSquare();

square(5); // Calculating... → 25
square(5); // From cache → 25

// 📝 Quick Revision Notes

// Memoization = cache + closure

// Improves performance

// Used in recursion & React

// Space-time tradeoff

// Beware of memory leaks