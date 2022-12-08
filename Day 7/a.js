import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

console.log(arr);

const executeCommand = (line) => {
  // Execute command
  if (line.charAt(2) === 'c') {
    // Change directory (move curr)
    if (line.charAt(5) === '/') {
      curr = root;
    }
    if (line.charAt(5) === '.') {
      if (curr.parent === null) {
        console.log('ERROR: null parent');
      } else {
        // Go up a level
        curr = curr.parent;
      }
    } else {
      // Move into directory, find which child to switch into
    }
  }
  else if (line.charAt(2) === 'l') {
    // I think we can just ignore ls, could maybe set a flag for read mode but that can be implied
  }
  else {
    console.log('ERROR: invalid command:', line)
  }
}

// root directory aka head of the tree
const root = { name: null, parent: null, children: [], size: -1 };

let curr = root; // Our current spot in the directory

for (const line of arr) {
  if (line.charAt(0) === '$') {
    executeCommand(line);
  }
  else if (line.charAt(0) === 'd') { // We have a directory
    // Add directory to it's parent
    // curr.children.push({ name: 'name', })
  }
  else { // We have a file
    // Add file to it's directory
  }
}