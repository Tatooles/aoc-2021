import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

const inputHeight = arr.length;
const width = arr[0].length

let maxScore = -1;

const checkTree = (y, x) => {
  // console.log('checking', x, y, arr[y][x]);
  // Check all 4 directions
  let height = arr[y][x];
  let leftScore = 0;
  let rightScore = 0;
  let topScore = 0;
  let bottomScore = 0;

  // Check left
  for (let i = x - 1; i >= 0; i--) {
    leftScore++;
    if (arr[y][i] >= height) {
      // console.log('not visible left');
      break;
    }
  }

  // Check right
  for (let i = x + 1; i < width; i++) {
    rightScore++;
    if (arr[y][i] >= height) {
      // console.log('not visible right');
      break;
    }
  }

  // Check top
  for (let i = y - 1; i >= 0; i--) {
    topScore++;
    if (arr[i][x] >= height) {
      // console.log('not visible top');
      break;
    }
  }

  // Check bottom
  for (let i = y + 1; i < inputHeight; i++) {
    bottomScore++;
    if (arr[i][x] >= height) {
      // console.log('not visible bottom');
      break;
    }
  }

  // console.log(x, y);

  let score = leftScore * rightScore * topScore * bottomScore;
  if (score > maxScore) maxScore = score;
  // console.log('tree', y, x, 'score', score);
}


// Can still ignore the outer edge, will always be 0
for (let i = 1; i < arr.length - 1; i++) {
  for (let j = 1; j < arr[0].length - 1; j++) {
    // Now gotta check if this tree is visible
    checkTree(i, j);
  }
}

console.log('answer:', maxScore);