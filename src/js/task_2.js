"use strict";

// Задание 2:

// Написать функцию, которая принимает положительное число и возвращает число из цифр в обратной последовательности. Задача должна быть выполнена без преобразования чисел в строку.
// Например:
// 15 -> 51
// 123 -> 321
// 3012 -> 2103
// 20 -> 2

function reverseNumber(num) {
  let reverseNum = 0;
  while(num > 0) {
    reverseNum = reverseNum * 10 + num % 10;
    num = ~~(num / 10);
  }
  return reverseNum;
}

export {reverseNumber};