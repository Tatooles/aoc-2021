import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

let visible = 0;
const inputHeight = arr.length;
const width = arr[0].length

// Count outer edge
visible += 2 * inputHeight + 2 * width - 4;

// Check all 4 directions
const checkTree = (y, x) => {
  let height = arr[y][x];
  let visibleLeft = true;
  let visibleRight = true;
  let visibleTop = true;
  let visibleBottom = true;

  // Check left
  for (let i = 0; i < x; i++) {
    if (arr[y][i] >= height) visibleLeft = false;
  }

  // Check right
  for (let i = x + 1; i < width; i++) {
    if (arr[y][i] >= height) visibleRight = false;
  }

  // Check top
  for (let i = 0; i < y; i++) {
    if (arr[i][x] >= height) visibleTop = false;
  }

  // Check bottom
  for (let i = y + 1; i < inputHeight; i++) {
    if (arr[i][x] >= height) visibleBottom = false;
  }

  if (visibleLeft || visibleRight || visibleTop || visibleBottom) visible++;
}

// Can ignore the outer edge
for (let i = 1; i < arr.length - 1; i++) {
  for (let j = 1; j < arr[0].length - 1; j++) {
    // Now gotta check if this tree is visible
    checkTree(i, j);
  }
}

console.log('answer:', visible);