import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

let cycle = 1;
let register = 1;
let sum = 0;

const specialCycles = [20, 60, 100, 140, 180, 220];

// Check our values if this is an important cycle
const checkCycle = () => {
  if (specialCycles.includes(cycle)) {
    sum += cycle * register;
  }
}

for (const command of arr) {
  if (command === 'noop') {
    checkCycle();
    cycle++;
    continue;
  }

  // addx command
  checkCycle();
  cycle++;

  checkCycle();
  cycle++;
  register += parseInt(command.split(' ')[1]);
}

console.log('answer', sum);