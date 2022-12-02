import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\r?\n/);

// Rock     - A - 1
// Paper    - B - 2
// Scissors - C - 3

// X - Lose
// Y - Draw
// Z - Win

let total = 0;

// Key is opponent move, value is the value of what beats it
const win = {
  'A': 2, 'B': 3, 'C': 1
}

// Key is opponent move, value is the value of what loses to it
const lose = {
  'A': 3, 'B': 1, 'C': 2
}

// Value of the equivalent piece
const draw = {
  'A': 1, 'B': 2, 'C': 3
}

arr.forEach(item => {
  let gameTotal = 0;
  // console.log(`opponent: ${item.charAt(0)}, me: ${item.charAt(2)}`);
  let opp = item.charAt(0);
  let outcome = item.charAt(2);

  if (outcome === 'Y') { // Draw
    gameTotal += 3;
    gameTotal += draw[opp];
  } else if (outcome === 'Z') { // Win
    gameTotal += 6;
    gameTotal += win[opp];
  } else { // Loss
    gameTotal += lose[opp];
  }

  total += gameTotal;
  // console.log(`game total: ${gameTotal}`);
});

console.log(total);