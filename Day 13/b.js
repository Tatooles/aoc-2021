import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

const checkOrder = (left, right) => {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) return true; // Correct order
    else if (left > right) return false; // Wrong order
    else return 0;
  }
  else if (typeof left !== 'number' && typeof right !== 'number') {
    // Both arrays, iterate through the arrays
    for (let i = 0; i < left.length && i < right.length; i++) {
      const result = checkOrder(left[i], right[i]);
      if (result !== 0) return result;
    }

    if (left.length < right.length) return true;
    else if (left.length > right.length) return false;
    return 0;
  }
  else {
    // One is an array
    if (typeof left === 'object') {
      // Left is an array
      return checkOrder(left, [right]);
    }
    else {
      return checkOrder([left], right);
    }
  }
}

let all = [];

// Want to read pairs of lines together
for (let i = 0; i < arr.length / 3; i++) {
  // First convert the input string into a nested array
  all.push(JSON.parse(arr[i * 3]));
  all.push(JSON.parse(arr[i * 3 + 1]));
}

all.push([[2]]);
all.push([[6]]);

all.sort((a, b) => {
  if (!checkOrder(a, b)) return 1;
  return -1;
});

let twoIndex = 0;
let sixIndex = 0;

all.forEach((element, i) => {
  if (JSON.stringify(element) === '[[2]]') twoIndex = i + 1;
  if (JSON.stringify(element) === '[[6]]') sixIndex = i + 1;
});

console.log('anwer', twoIndex * sixIndex);