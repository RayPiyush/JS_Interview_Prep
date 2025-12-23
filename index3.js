// 2️⃣ Debouncing (Concept)
// 🔹 Definition

// Debouncing ensures a function runs only after a certain delay 
// once the event stops firing.

// 📌 “Wait → then execute”

// 🧠 Real-World Analogy

// 👉 Elevator door

// Button pressed multiple times

// Elevator moves only after people stop pressing

// 3️⃣ Debouncing Example (Search Input)
// ❌ Without Debounce
input.addEventListener("input", (e) => {
  fetchResults(e.target.value); // API call every keystroke
});

// ✅ With Debounce
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}


// Usage:

// const debouncedSearch = debounce(fetchResults, 500);
// input.addEventListener("input", (e) => {
//   debouncedSearch(e.target.value);
// });

// 🔍 What’s Happening?

// Every keystroke resets timer

// Function executes only after user stops typing


//------------In React.js------------------

//Method-1-Using useState and useEffect

import React,{useState,useEffect} from 'react';

function Search(){
    const [query,setQuery]=useState("");
    const [debouncedQuery,setDebouncedQuery]=useState("");

    useEffect(()=>{
        const timer=setTimeout(()=>{
            setDebouncedQuery(query);
        },500)

        return ()=>{
            clearTimeout(timer)
        }
    },[query])

    useEffect(()=>{
        console.log("Api call"+ query);
    },[debouncedQuery])

    return(
        <>
            <input 
                type="text" placeholder="Search..."
                onChange={(e)=>setQuery(e.target.value)}>

            </input>
        </>
    );
}
//explanation-
// “When the user types, query state updates immediately. 
// A useEffect listens to query changes and starts a timer.
//  If the user types again before the delay, the cleanup function clears
//   the previous timer. When the user stops typing for 500ms, 
//   debouncedQuery is updated. A second useEffect listens to debouncedQuery 
//   and triggers the API call.
//  This ensures only one API call after typing stops.”



//✅ Method 2: Debouncing using useRef (Cleaner & Interview-Friendly)

import {useRef,useState} from 'react';

function search(){
    const [query,setQuery]=useState("");
    const timer=useRef(null);

    const handleChange=(e)=>{
        const value=e.target.value;
        setQuery(value);

        clearTimeout(timer);

        timer.current=setTimeout(()=>{
            console.log("API call"+ value);
        },500)
    }
    return(
        <>
            <input onChange={handleChange}></input>
        </>
    );
}

// ❓ What if component unmounts?

// ⚠️ Add cleanup (BEST PRACTICE)

useEffect(() => {
  return () => clearTimeout(timerRef.current);
}, []);

// 🎤 1-Minute Interview Answer (Memorize)

// “On every input change, we first clear the previous timeout stored in
//  useRef. Then we start a new setTimeout and store its ID in timerRef.current. 
//  If the user types again before the delay, the previous timer is cancelled. 
//  When the user stops typing for 500ms, the timer completes and the API call
// is triggered. useRef is used because it persists across renders without causing re-render.”



// ✅ Method 3: Debouncing using lodash.debounce (Production Ready)
// 🔹 Install lodash
// npm install lodash

// 🔹 Example
import { useCallback } from "react";
import debounce from "lodash/debounce";

function Search() {
  const handleSearch = (value) => {
    console.log("API Call:", value);
  };

  const debouncedSearch = useCallback(
    debounce(handleSearch, 500),
    []
  );

  return (
    <input
      type="text"
      onChange={(e) => debouncedSearch(e.target.value)}
    />
  );
}

export default Search;

// ⚠️ Important Cleanup (Interview Trap)
useEffect(() => {
  return () => {
    debouncedSearch.cancel();
  };
}, [debouncedSearch]);


// 🚀 Best Practice (Production Recommendation)

// ✔ Use useRef for small projects
// ✔ Use lodash.debounce for large apps
// ✔ Always cancel debounce on unmount
// ✔ Delay: 300–500ms