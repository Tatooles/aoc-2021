import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);


// TODO: This does not work with 2 digit numbers!!
const parsePacket = (inputString) => {
  // Case: [0, [0, [0, [0, 1], [1, 2]]]]
  return JSON.parse(inputString);
  // const packet = [];
  // const parentArray = [];
  // let currentArray = packet;

  // for (const c of inputString) {
  //   if (c === ',') continue; // Ignore commas
  //   else if (c === '[') {
  //     // Store current in parent array
  //     parentArray.push(currentArray);

  //     // Start a new array
  //     currentArray = [];
  //   }
  //   else if (c === ']') {
  //     // End the array
  //     // Set new parent array from end of parent array
  //     let parent = parentArray.pop();

  //     // Push to the parent array
  //     parent.push(currentArray);
  //     currentArray = parent;
  //   } else {
  //     // Add to array
  //     currentArray.push(parseInt(c));
  //   }
  // }
  // return packet;
}

const checkOrder = (left, right) => {
  console.log('call with left:', left, "right:", right);
  while (left.length != 0) { // TODO: Need a different length check
    if (right.length === 0) return false;
    let leftVal = left[0];
    let rightVal = right[0];
    console.log('loop with left:', leftVal, "right:", rightVal);
    if (typeof leftVal === 'number' && typeof rightVal === 'number') {
      if (leftVal < rightVal) {
        // Correct order
        return true;
      } else if (leftVal === rightVal) {
        // console.log('hit shift')
        left.shift();
        right.shift();
      } else {
        return false;
      }
    }
    else if (typeof leftVal !== 'number' && typeof rightVal !== 'number') {
      // console.log('hit both array');
      // Both arrays, iterate through the arrays
      // Try recursive lol
      let result = checkOrder(leftVal, rightVal);
      if (result === false) return false; // Otherwise continue
      if (result === true) return true;
      left.shift();
      right.shift();
      // console.log(left, right, result);
    }
    else {
      // One is an array
      if (typeof leftVal === 'object') {
        console.log('left is array');
        // Left is an array
        let result = checkOrder(leftVal, [rightVal]);
        if (result === false) return false; // Otherwise continue
        if (result === true) return true;
      }
      else {
        console.log('right is array');
        let result = checkOrder([leftVal], rightVal);
        if (result === false) return false; // Otherwise continue
        if (result === true) return true;
      }
    }
  }
  if (right.length > 0) {
    return true;
  }
  return 0; // Can't say
}

let sum = 0;

// Want to read pairs of lines together
for (let i = 0; i < arr.length / 3; i++) {
  // First convert the input string into a nested array
  const left = parsePacket(arr[i * 3]);
  const right = parsePacket(arr[i * 3 + 1]);
  console.log(left);
  console.log(right);

  // console.log(left);
  // TODO: Determine if they are in the right order
  // Prob want another function
  const value = checkOrder(left, right);
  if (value) {
    sum += i + 1; // This is wrong
    console.log(value, i + 1);
  }
}

console.log('answer', sum);