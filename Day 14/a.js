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
  const startX = 495;

  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].slice(startX).join(' '));
  }
}

const points = arr
  .map(line => line.split(' -> '))
  .map(item => item.map(s => s.split(',').map(i => parseInt(i))))

console.log(points);

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
const grid = Array(maxY).fill('.').map(() => Array(maxX).fill('.'));

printGrid();