import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = [...data];

const buffer = arr.splice(0, 4);
let count = 4;

for (const char of arr) {
  const set = new Set(buffer);
  if (set.size == 4) { // Found key
    break;
  } else {
    count++;
  }
  buffer.shift();
  buffer.push(char);
}

console.log(count);