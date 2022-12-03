import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\r?\n/);

// const char = 'b'
// if(char === char.toLowerCase()) {
//   console.log(char.charCodeAt(0) - 96);
// } else {
//   console.log(char.charCodeAt(0) - 38);
// }

let total = 0;

arr.forEach(item => {
  const length = item.length;

  const firstHalf = item.substring(0, length / 2);
  const secondHalf = item.substring(length / 2, length);

  for (const char of firstHalf) {
    if (secondHalf.includes(char)) {
      // found misplaced item
      // calculate priority
      let priority;
      if (char === char.toLowerCase()) {
        // Already lowercase
        priority = char.charCodeAt(0) - 96;
      } else {
        priority = char.charCodeAt(0) - 38;
      }
      total += priority;
      break;
    }
  }
})

console.log("total", total);