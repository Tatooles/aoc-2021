import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\r?\n/);

let count = 0;

for (const line of arr) {
  // console.log(line);

  let split = line.split('-');

  const firstStart = parseInt(split[0]);
  const secondEnd = parseInt(split[2]);

  split = split[1].split(',');

  const firstEnd = parseInt(split[0]);
  const secondStart = parseInt(split[1]);

  // console.log(`first: ${firstStart}-${firstEnd}, second: ${secondStart}-${secondEnd}`);

  // second is within first
  if (secondStart >= firstStart && secondEnd <= firstEnd) {
    console.log("first", line);
    count += 1;
  }
  // first is within second
  else if (secondStart <= firstStart && secondEnd >= firstEnd) {
    console.log("second", line);
    count += 1;
  }
}

console.log('count', count);