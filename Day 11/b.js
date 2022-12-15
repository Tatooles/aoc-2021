import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

// First create the starting position based on the input
const monkeys = {};
let monkeyCount = 0;

const divisors = [];
let globalDivisor = 0;

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

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

      current = current % globalDivisor;

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
  divisors.push(monkey.test);

  // Handle true case
  monkey.trueMonkey = parseInt(arr[i * 7 + 4].slice(29));

  // Handle false case
  monkey.falseMonkey = parseInt(arr[i * 7 + 5].slice(30));

  monkeys[i] = monkey;
}


globalDivisor = divisors.reduce(lcm);


// Run this thing for 20 rounds
for (let i = 0; i < 10000; i++) {
  executeIteration();
}

// Find and multiply the two highest inspected counts
const counts = [];
for (const monkey in monkeys) {
  counts.push(monkeys[monkey].inspected);
}
const top = counts.sort((a, b) => b - a).splice(0, 2);

console.log('answer', top[0] * top[1]);