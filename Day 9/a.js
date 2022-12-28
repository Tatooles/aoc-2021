import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'test.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/).map(line => line.split(' '));

/**
 * Print the grid in a user friendly format
 */
const printGrid = () => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(' '));
  }
  console.log();
}

/**
 * Update the grid for a single movement in one direction
 * @param {String} direction 
 */
const makeMove = (direction) => {

}

// Simply figure out what the max x and y are
// Or find the max distance we could be from the starting point in any direction
let leftMax = 0;
let rightMax = 0;
let upMax = 0;
let downMax = 0;

arr.forEach(element => {
  const direction = element[0];
  const distance = parseInt(element[1]);
  switch (direction) {
    case 'U':
      upMax += distance;
      break;
    case 'D':
      downMax += distance;
      break;
    case 'L':
      leftMax += distance;
      break;
    case 'R':
      rightMax += distance;
  }
});

console.log(leftMax, rightMax, upMax, downMax);

// Init array
const grid = Array(upMax + downMax + 1).fill('.').map(() => Array(leftMax + rightMax + 1).fill('.'));

// Init each piece
const s = [upMax, leftMax];
const h = [upMax, leftMax];
const t = [upMax, leftMax];
grid[s[0]][s[1]] = 'H';

// Now go through the movements
// Will probably have to do it one at a time
arr.forEach(element => {
  for (let i = 0; i < element[1]; i++) {
    makeMove(element[0]);
    printGrid();
  }
});
