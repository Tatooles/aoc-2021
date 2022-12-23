import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'test.txt';
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

let all = [];

// Want to read pairs of lines together
for (let i = 0; i < arr.length / 3; i++) {
  // First convert the input string into a nested array
  all.push(JSON.parse(arr[i * 3]));
  all.push(JSON.parse(arr[i * 3 + 1]));
}

all.push([[2]]);
all.push([[6]]);

console.log(all.length);

all.sort((a, b) => {
  const inorder = checkOrder(structuredClone(a), structuredClone(b));
  if (!inorder) {
    return 1;
  } else {
    return -1;
  }
});

let twoIndex = 0;
let sixIndex = 0;

all.forEach((element, i) => {
  console.log(element);
  if (JSON.stringify(element) === '[[2]]') {
    twoIndex = i;
  }
  if (JSON.stringify(element) === '[[6]]') {
    sixIndex = i;
  }
})

console.log('anwer', twoIndex * sixIndex);