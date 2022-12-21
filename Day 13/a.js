import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

const checkOrder = (left, right) => {
  while (left.length != 0) {
    if (right.length === 0) return false;
    let leftVal = left[0];
    let rightVal = right[0];
    if (typeof leftVal === 'number' && typeof rightVal === 'number') {
      if (leftVal < rightVal) return true; // Correct order
      else if (leftVal === rightVal) {
        left.shift();
        right.shift();
      }
      else return false; // Wrong order
    }
    else if (typeof leftVal !== 'number' && typeof rightVal !== 'number') {
      // Both arrays, iterate through the arrays
      let result = checkOrder(leftVal, rightVal);
      if (result !== 0) return result; // Otherwise continue
      left.shift();
      right.shift();
    }
    else {
      // One is an array
      if (typeof leftVal === 'object') {
        // Left is an array
        let result = checkOrder(leftVal, [rightVal]);
        if (result !== 0) return result; // Otherwise continue
      }
      else {
        let result = checkOrder([leftVal], rightVal);
        if (result !== 0) return result; // Otherwise continue
      }
    }
  }
  if (right.length > 0) return true;
  return 0; // Can't say
}

let sum = 0;

// Want to read pairs of lines together
for (let i = 0; i < arr.length / 3; i++) {
  // First convert the input string into a nested array
  const left = JSON.parse(arr[i * 3]);
  const right = JSON.parse(arr[i * 3 + 1]);

  // Determine if they are in the right order
  const value = checkOrder(left, right);
  if (value) {
    sum += i + 1;
  }
}

console.log('answer', sum);