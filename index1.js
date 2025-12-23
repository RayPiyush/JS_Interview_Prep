/*
function increment() {
    let count = 0
    return function() {
        count = count + 1
        return count
    }
}
const myInc = increment()
console.log(myInc())
console.log(myInc())
console.log(myInc())
*/


// 1️⃣ What is a Closure? (Simple Definition)

// A closure is created when a function “remembers” variables from its outer (lexical) 
// scope even after the outer function has finished executing.

// In simple words:

// Inner function remembers outer function’s variables

// Even when the outer function is gone from call stack


function outer(){
    let count=0;
    function inner(){
        count++;
        console.log(count);
    }
    return inner;
}

const func=outer();
func()

// 🔍 What’s Happening Internally?

// outer() runs → creates count

// inner() is returned

// outer() finishes execution ❌

// BUT count is still alive ✅ because inner() needs it

// 👉 This memory retention = Closure

//--Closure with parameter-------
function multiply(x){
    return function(y){
        return x*y;
    }
}
const mul=multiply(5);
console.log(mul(2));

//---------Closures with SetTimeout
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// Output: 4 4 4
//-----why this?
// The reason you see 4 4 4 instead of 1 2 3 comes down to two main factors: the behavior of the var keyword and the timing of the setTimeout callback.

// 1. The Variable Scope (var)
// When you use var, the variable i is function-scoped (or global, in this case). It is not scoped to the individual loop iteration. This means there is only one instance of i in memory. By the time the loop finishes, the value of i has been incremented to 4 (the condition that breaks the loop).

// 2. The Task Queue (Event Loop)
// setTimeout is asynchronous. Even though the delay is set to 1000ms, the callback function doesn't run until the main execution thread is empty.

// The loop runs instantly and completes.

// The i variable is updated to 4.

// A second later, the three setTimeout callbacks execute.

// They all look at that single i variable, which is now 4.

//---How to fix this
// There are two primary ways to get the expected 1 2 3 output:

// Option A: Use let (Recommended)
// The let keyword is block-scoped. When you use let in a for loop, JavaScript creates a new "binding" for i for every single iteration.
//  Each setTimeout closure captures its own unique version of i.

// JavaScript

for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// // Output: 1 2 3
// Option B: Use an IIFE (The "Old School" Way)
// Before ES6 (and let), developers used an 
// *Immediately Invoked Function Expression* to create a new scope and "lock in" the current value of i.

// JavaScript

for (var i = 1; i <= 3; i++) {
  (function(currentI) {
    setTimeout(() => {
      console.log(currentI);
    }, 1000);
  })(i);
}
// Output: 1 2 3

// 📝 Quick Revision Notes

// Closure = Function + Lexical Environment

// Used for data hiding

// Created automatically

// Stored in heap

// Common in async JS