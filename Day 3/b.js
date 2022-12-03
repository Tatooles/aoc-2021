import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\r?\n/);

let total = 0;

for (let i = 0; i < arr.length; i += 3) {
  for (const char of arr[i]) {
    let priority = 0;
    // Check for this item in next two elves' packs
    if (arr[i + 1].includes(char) && arr[i + 2].includes(char)) {
      // We found the badge
      if (char === char.toLowerCase()) {
        priority = char.charCodeAt(0) - 96;
      } else {
        priority = char.charCodeAt(0) - 38;
      }
      total += priority;
      break;
    }
  }
}

console.log("total", total);