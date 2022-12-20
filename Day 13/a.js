import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'test.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);


const parsePacket = (inputString) => {
  // Case: [0, [0, [0, [0, 1], [1, 2]]]]
  const packet = [];
  const parentArray = [];
  // TODO: Store all the parent arrays, probably in another array where we pop off the end
  let currentArray = packet;

  for (const c of inputString) {
    if (c === ',') continue; // Ignore commas
    else if (c === '[') {
      // Store current in parent array
      parentArray.push(currentArray);

      // Start a new array
      currentArray = [];
    }
    else if (c === ']') {
      // End the array
      // Set new parent array from end of parent array
      let parent = parentArray.pop();

      // Push to the parent array
      parent.push(currentArray);
      currentArray = parent;
    } else {
      // Add to array
      currentArray.push(c);
    }
  }
  return packet;
}

// Want to read pairs of lines together
for (let i = 0; i < arr.length; i += 3) {
  const firstPacket = arr[i];
  const secondPacket = arr[i + 1];

  const second = [];

  // First convert the input string into a nested array
  const first = parsePacket(firstPacket.slice(1, -1));
  console.log(first);

  // TODO: Determine if they are in the right order
  // Prob want another function
}