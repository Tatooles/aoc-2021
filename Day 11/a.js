import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

// First create the starting position based on the input
const monkeys = {};
let monkeyCount = 0;

const executeIteration = () => {
  // Go through each monkey
  for (let i = 0; i < monkeyCount; i++) {
    let currentMonkey = monkeys[i];
    // GO through each value for this monkey
    for (const value of currentMonkey.items) {
      currentMonkey.inspected++;
      let operator = currentMonkey.operationValue;
      if (currentMonkey.operationValue === -2) {
        operator = value;
      }
      let current = 0;
      if (currentMonkey.operation === '*') {
        current = value * operator;
      } else {
        current = value + operator;
      }
      current = Math.floor(current / 3);

      if (current % currentMonkey.test === 0) {
        monkeys[currentMonkey.trueMonkey].items.push(current);
      } else {
        monkeys[currentMonkey.falseMonkey].items.push(current);
      }
    }
    // This monkey's array will be empty after we go thru it
    currentMonkey.items = [];
  }
}

// It's separated into groups of 7 lines
for (let i = 0; i < arr.length / 7; i++) {
  monkeyCount++;
  const monkey = { items: [], operation: '', operationValue: -1, test: -1, trueMonkey: -1, falseMonkey: -1, inspected: 0 };
  console.log(arr[i * 7]);

  // Handle starting items
  const items = arr[i * 7 + 1].substring(18).split(',');
  for (const item of items) {
    monkey.items.push(parseInt(item));
  }


  // Handle operation (only * or +)
  monkey.operation = arr[i * 7 + 2].charAt(23);
  const val = arr[i * 7 + 2].slice(25);
  if (val === 'old') {
    monkey.operationValue = -2;
  } else {
    monkey.operationValue = parseInt(val);
  }


  // Handle test
  monkey.test = parseInt(arr[i * 7 + 3].slice(21));

  // Handle true case
  monkey.trueMonkey = parseInt(arr[i * 7 + 4].slice(29));

  // Handle false case
  monkey.falseMonkey = parseInt(arr[i * 7 + 5].slice(30));

  monkeys[i] = monkey;
}

// Run this thing for 20 rounds
for (let i = 0; i < 20; i++) {
  executeIteration();
}
// executeIteration();
console.log(monkeys);

// Find two highest
let first = 0;
let second = 0;

for (let i = 0; i < monkeyCount; i++) {
  let numInspected = monkeys[i].inspected
  if (numInspected > first) {
    second = first;
    first = numInspected;
  }
}

console.log('answer', first * second);