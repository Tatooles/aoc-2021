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

const checkTree = (y, x) => {
  // console.log('checking', x, y, arr[y][x]);
  // Check all 4 directions
  let height = arr[y][x];
  let visibleLeft = true;
  let visibleRight = true;
  let visibleTop = true;
  let visibleBottom = true;

  // Check left
  for (let i = 0; i < x; i++) {
    // Assume visible left
    if (arr[y][i] >= height) {
      // console.log('not visible left');
      visibleLeft = false;
    }
  }

  // Check right
  for (let i = x + 1; i < width; i++) {
    if (arr[y][i] >= height) {
      // console.log('not visible right');
      visibleRight = false;
    }
  }

  // Check top
  for (let i = 0; i < y; i++) {
    if (arr[i][x] >= height) {
      // console.log('not visible top');
      visibleTop = false;
    }
  }

  // Check bottom
  for (let i = y + 1; i < inputHeight; i++) {
    if (arr[i][x] >= height) {
      // console.log('not visible bottom');
      visibleBottom = false;
    }
  }

  // console.log(x, y);

  // console.log(visibleLeft, visibleRight, visibleTop, visibleBottom);

  if (visibleLeft || visibleRight || visibleTop || visibleBottom) {
    visible++;
    // console.log(y, x, 'is visible');
  }
}

// Can ignore the outer edge
for (let i = 1; i < arr.length - 1; i++) {
  for (let j = 1; j < arr[0].length - 1; j++) {
    // Now gotta check if this tree is visible
    checkTree(i, j);
  }
}

console.log('answer:', visible);