import { promises as fsPromises } from 'fs';
import { resourceUsage } from 'process';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

let cycle = 1;
let register = 1;

// Initialize display
const display = [];
for (let i = 0; i < 6; i++) {
  display.push(new Array(40).fill('.'));
}

// const specialCycles = [20, 60, 100, 140, 180, 220];

// Check our values if this is an important cycle
const checkCycle = () => {
  let row = Math.floor(cycle / 40);
  let column = cycle % 40 - 1;

  if (column === -1) { // Factor in offset
    column = 39;
    row--;
  }

  console.log(row, column);
  // Check if we fall within tolerance
  if (register === column - 1 || register === column || register === column + 1) {
    display[row][column] = '#';
  }
}

const printDisplay = () => {
  for (let row of display) {
    let line = '';
    for (let char of row) {
      line = line.concat(char);
    }
    console.log(line);
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

printDisplay();