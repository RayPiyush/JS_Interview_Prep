//Throttling
// 4️⃣ Throttling (Concept)
// 🔹 Definition

// Throttling ensures a function runs at most once in a specified interval,
//  no matter how many times the event fires.

// 📌 “Execute → wait → execute”

// 🧠 Real-World Analogy

// 👉 Water tap

// No matter how fast you open/close

// Water flows at a fixed rate

// 5️⃣ Throttling Example (Scroll Event)
// ❌ Without Throttle
window.addEventListener("scroll", () => {
  console.log("Scrolling...");
});

//✅ With Throttle
function throttle(fn, limit) {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}


//Usage:

const throttledScroll = throttle(handleScroll, 1000);
window.addEventListener("scroll", throttledScroll);


//------------------In react.js-------------------------

// ✅ Method 1: Throttling using useRef (Most Recommended)
// 🔹 Example: Scroll Throttling
import { useRef, useEffect } from "react";

function ScrollComponent() {
  const isThrottled = useRef(false);

  const handleScroll = () => {
    if (isThrottled.current) return;

    console.log("Scroll event handled");

    isThrottled.current = true;

    setTimeout(() => {
      isThrottled.current = false;
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div style={{ height: "200vh" }}>Scroll Me</div>;
}

export default ScrollComponent;

// 🧠 Why useRef?

// Stores throttle flag across renders

// Doesn’t cause re-render

// Best for timers & flags

// 🔁 Execution Flow (Method 1)

// Scroll event fires

// If isThrottled.current === false

// Function executes

// Lock is applied for 500ms

// Further scroll events ignored

// After 500ms → unlock

// ✅ Method 2: Throttling using a Utility Function (Reusable)
// 🔹 Throttle function
function throttle(fn, limit) {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// 🔹 Use in React
import { useEffect } from "react";

function ScrollComponent() {
  const handleScroll = () => {
    console.log("Scroll API Call");
  };

  const throttledScroll = throttle(handleScroll, 500);

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  return <div style={{ height: "200vh" }}>Scroll Me</div>;
}

// ⚠️ Interview Trap (IMPORTANT)

// ❌ This is WRONG:

const throttledScroll = throttle(handleScroll, 500);


// inside render → recreated on every render ❌

// ✅ Fix using useRef or useCallback

const throttledScroll = useRef(throttle(handleScroll, 500));

// ✅ Method 3: Throttling using lodash.throttle (Production-Ready)
// 🔹 Install
// npm install lodash

// 🔹 Usage
import { useEffect, useCallback } from "react";
import throttle from "lodash/throttle";

function ScrollComponent() {
  const handleScroll = () => {
    console.log("Scroll handled");
  };

  const throttledScroll = useCallback(
    throttle(handleScroll, 500),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);

    return () => {
      throttledScroll.cancel(); // important
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [throttledScroll]);

  return <div style={{ height: "200vh" }}>Scroll Me</div>;
}

// 🧠 Why lodash?

// Handles edge cases

// Supports leading / trailing

// .cancel() method

//✅ Method 4: Custom Hook (useThrottle) – Interview Bonus ⭐
import { useRef } from "react";

function useThrottle(fn, delay) {
  const lastRun = useRef(0);

  return (...args) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      fn(...args);
      lastRun.current = now;
    }
  };
}

// Usage
const throttledScroll = useThrottle(handleScroll, 500);

// | Feature      | Throttle             | Debounce         |
// | ------------ | -------------------- | ---------------- |
// | Execution    | Every fixed interval | After user stops |
// | Missed calls | Yes                  | No (last only)   |
// | Best for     | Scroll, resize       | Search input     |
// | UX           | Continuous updates   | Final update     |



// 🎤 1-Minute Interview Answer

// “In React, throttling is handled by limiting how often a function executes
//  using timers and persistent references like useRef. We block repeated 
//  executions for a fixed interval, commonly used for scroll and resize events. 
//  useRef is preferred because it stores throttle state without triggering 
//  re-renders. For production apps, 
// lodash.throttle is often used due to better control and cleanup.”