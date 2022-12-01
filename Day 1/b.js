import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';

const data = await fsPromises.readFile(filename, 'utf-8');

const arr = data.split(/\r?\n/);

let currentElfCalories = 0; // Amount of calorues for the current elf

let maxElfCalories = -1;

let elfTotal = [];

for (let i = 0; i < arr.length; i++) {
  // Nested for loop that separates between 
  if (arr[i] == '') {
    elfTotal.push(currentElfCalories);
    currentElfCalories = 0;
  } else {
    currentElfCalories += parseInt(arr[i]);
  }
}

elfTotal.sort((a, b) => {
  return a - b;
}).reverse();

console.log(elfTotal);
console.log(elfTotal[0] + elfTotal[1] + elfTotal[2]);