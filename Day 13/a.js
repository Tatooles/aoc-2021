import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'test.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);


const parsePacket = (inputString) => {
  // Case: [0, [0, [0, [0, 1], [1, 2]]]]
  const packet = [];
  const parentArray = [];
  // TODO: Store all the parent arrays, probably in another array where we pop off the end
  let currentArray = packet;

  for (const c of inputString) {
    if (c === ',') continue; // Ignore commas
    else if (c === '[') {
      // Store current in parent array
      parentArray.push(currentArray);

      // Start a new array
      currentArray = [];
    }
    else if (c === ']') {
      // End the array
      // Set new parent array from end of parent array
      let parent = parentArray.pop();

      // Push to the parent array
      parent.push(currentArray);
      currentArray = parent;
    } else {
      // Add to array
      currentArray.push(parseInt(c));
    }
  }
  return packet;
}

const checkOrder = (left, right) => {
  while (left.length != 0 && right.length != 0) { // TODO: Need a different length check
    let leftVal = left[0];
    let rightVal = right[0];
    if (!isNaN(leftVal) && !isNaN(rightVal)) {
      if (leftVal < rightVal) {
        // Correct order
        return true;
      } else if (leftVal == rightVal) {
        left.shift();
        right.shift();
      } else {
        return false;
      }
    }
    else if (isNaN(leftVal) && isNaN(rightVal)) {
      // Both arrays, iterate through the arrays
      // Try recursive lol
      return checkOrder(leftVal, rightVal);
    }
    else {
      // One is an array
    }
  }
  return false;
}

let sum = 0;

// Want to read pairs of lines together
for (let i = 0; i < arr.length; i += 3) {
  // First convert the input string into a nested array
  const left = parsePacket(arr[i].slice(1, -1));
  const right = parsePacket(arr[i + 1].slice(1, -1));

  // console.log(left);
  // TODO: Determine if they are in the right order
  // Prob want another function
  const value = checkOrder(left, right);
  if (value) sum += i; // This is wrong
  console.log(i, value);
}