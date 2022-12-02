import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\r?\n/);

// Rock     - a - x - 1
// Paper    - b - y - 2
// Scissors - c - z - 3

let total = 0;

arr.forEach(item => {
  let gameTotal = 0;
  // console.log(`opponent: ${item.charAt(0)}, me: ${item.charAt(2)}`);
  let opp = item.charAt(0);
  let me = item.charAt(2);

  if ((opp === 'A' && me === 'X') || (opp === 'B' && me === 'Y') || (opp === 'C' && me === 'Z')) { // Draw
    gameTotal += 3;
  }
  else if ((opp === 'A' && me === 'Y') || (opp === 'B' && me === 'Z') || (opp === 'C' && me === 'X')) { // Win
    gameTotal += 6;
  }

  if (me === 'X') {
    gameTotal += 1;
  } else if (me === 'Y') {
    gameTotal += 2;
  } else if (me === 'Z') {
    gameTotal += 3;
  }

  total += gameTotal;
  // console.log(`game total: ${gameTotal}`);
});

console.log(total);