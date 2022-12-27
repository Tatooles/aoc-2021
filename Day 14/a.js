import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

/**
 * Prints out the grid in a legible format
 */
const printGrid = () => {
  // This is where we want to start from on the X axis
  const startX = 470;

  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].slice(startX).join(' '));
  }
  console.log();
}

const dropGrain = () => {
  // Run this grain until it reaches rest
  // Start at starting point
  let x = 500;
  let y = 0;

  // TODO: It's piling up on the edge, should just fall off!!

  // Drop straight down
  while (y < maxY) {
    if (grid[y + 1][x] === '.') {
      // Can go down
      y++;
    } else if (grid[y + 1][x - 1] === '.') {
      y++;
      x--;
    } else if (grid[y + 1][x + 1] === '.') {
      y++;
      x++;
    }
    else {
      grid[y][x] = 'o';
      return true;
    }
  }
  return false;
}

const points = arr
  .map(line => line.split(' -> '))
  .map(item => item.map(s => s.split(',').map(i => parseInt(i))))

// Find largest values so we can determine grid size
let maxX = 0;
let maxY = 0;
points.forEach(line => {
  line.forEach(point => {
    if (point[0] > maxX) maxX = point[0];
    if (point[1] > maxY) maxY = point[1];
  })
});

// Create grid
const grid = Array(maxY + 1).fill('.').map(() => Array(maxX + 1).fill('.'));

// Now add lines to the grid
points.forEach(path => {
  // Need to create lines between each point in this path, can only be vertical or horizontal
  for (let i = 0; i < path.length - 1; i++) {
    const [x1, y1] = path[i];
    const [x2, y2] = path[i + 1];

    let small = 0;
    let big = 0;

    let horizontal = false;
    if (y1 === y2) {
      horizontal = true;
      if (x1 < x2) {
        small = x1;
        big = x2;
      } else {
        small = x2;
        big = x1;
      }
    } else {
      if (y1 < y2) {
        small = y1;
        big = y2;
      } else {
        small = y2;
        big = y1;
      }
    }

    for (let i = small; i <= big; i++) {
      if (horizontal) {
        // console.log('placing #', y1, i);
        grid[y1][i] = '#';
      } else {
        // console.log('placing #', i, x1);
        grid[i][x1] = '#';
      }
    }
  }
});

// Place start point
grid[0][500] = '+';

let count = 0;

console.log(maxX, maxY);

while (dropGrain()) {
  // printGrid();
  count++;
}

printGrid();
console.log(maxX, maxY, grid[0].length, grid.length);

// for (let i = 0; i < 40; i++) {
//   dropGrain();
//   printGrid();
// }

console.log('answer', count);
