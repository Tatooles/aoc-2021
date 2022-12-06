import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\r?\n/);

let bottomIndex;
let stackCount;
let stacks = [];

// Find bottom of the initial state
for (let i = 0; i < arr.length; i++) {
  if (arr[i].charAt(1) === '1') { // Found row we are looking for
    bottomIndex = i - 1;
    stackCount = arr[i].charAt(arr[i].length - 2);
    break;
  }
}

// Initialize array of arrays
for (let i = 0; i < stackCount; i++) {
  stacks.push([]);
}

// Work from the bottom up for each stack
for (let i = bottomIndex; i >= 0; i--) {
  // Gonna have to use charAt
  for (let j = 0; j < stackCount; j++) {
    let crate = arr[i].charAt(j * 4 + 1);
    if (crate !== ' ') { // Push to queue
      stacks[j].push(crate);
    }
  }
}

// Go through the rest of the input
let commands = arr.slice(bottomIndex + 3);
commands.forEach(command => {
  let split = command.split(' ');
  // Only care about indicies 1, 3, and 5
  let count = parseInt(split[1]);
  let from = parseInt(split[3]) - 1;
  let to = parseInt(split[5]) - 1;

  // Execute the actual crate moving
  for (let i = 0; i < count; i++) {
    stacks[to].push(stacks[from].pop());
  }
})

// Create answer string from final crate config
let answer = '';
for (let stack of stacks) {
  answer = answer.concat(stack.pop());
}

console.log('answer', answer);