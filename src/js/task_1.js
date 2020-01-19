"use strict";

// Задание 1:

// Написать функцию, которая принимает на вход строку и возвращает самую длинную подстроку с неповторяющимися символами.
// Например:
// abcabcbb -> abc
// bbbbb -> b
// pqqkeq -> qke

// =========================================================================================================
// BAD SOLUTION

// function getMaxSubStr(str) {
//   let subStr = [];
//   let objSubStr = {};
//   let maxSubStr = 0;
  
//   for(let letter of str) {

//     if(subStr.includes(letter)) {
//       objSubStr[subStr.length] = subStr.join("");
//       subStr.length = 0;
//     }
    
//     subStr.push(letter);
//   }

//   for(let key in objSubStr) {
//     if(key > maxSubStr) maxSubStr = key;
//   }

//   return objSubStr[maxSubStr];
// }

// =========================================================================================================
// GOOD SOLUTION

// function getMaxSubStr(str) {
//   let maxSubStr = "";
//   let currentSubStr = "";

//   for(let letter of str) {
//     let index = currentSubStr.indexOf(letter);

//     if(~index && maxSubStr.length <= currentSubStr.length) {
//       maxSubStr = currentSubStr;
//       currentSubStr = currentSubStr.slice(index + 1);
//     }
//     currentSubStr += letter;
//   }
//   return maxSubStr;
// }

// =========================================================================================================
// BETTER SOLUTION

function getMaxSubStr(str) {
  let maxSubStr = "";
  let currentSubStr = "";
  let objLetter = {};

  for(let letter of str) {

    if(objLetter[letter] === true) {
      currentSubStr = "";
    }

    objLetter[letter] = true;
    currentSubStr += letter;

    if(maxSubStr.length < currentSubStr.length) {
      maxSubStr = currentSubStr;
    }
  }
  return maxSubStr;
}

export {getMaxSubStr};