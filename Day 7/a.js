import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\n/);

// console.log(arr);

const executeCommand = (tokens) => {
  // Execute command
  if (tokens[1] === 'cd') {
    // Change directory (move curr)
    if (tokens[2] === '/') {
      curr = root;
    }
    if (tokens[2] === '..') {
      if (curr.parent === null) {
        console.log('ERROR: null parent');
      } else {
        // Go up a level
        curr = curr.parent;
      }
    } else {
      // Move into directory, find which child to switch into
      for (const child of curr.children) {
        if (child.name === tokens[2]) {
          curr = child;
          return;
        }
      }
    }
  }
  else if (tokens[1] === 'ls') {
    // I think we can just ignore ls, could maybe set a flag for read mode but that can be implied
  }
  else {
    console.log('ERROR: invalid command:', line)
  }
}

// root directory aka head of the tree
const root = { name: null, parent: null, children: [], size: 0 };

let curr = root; // Our current spot in the directory

for (const line of arr) {
  const tokens = line.split(' ');
  if (tokens[0] === '$') {
    executeCommand(tokens);
  }
  else if (tokens[0] === 'dir') { // We have a directory
    // Add directory to it's parent
    curr.children.push({ name: tokens[1], parent: curr, children: [], size: 0 });
  }
  else { // We have a file
    let size = parseInt(tokens[0])
    // Add file to it's directory
    curr.size += size;

    // Gotta also add to all parent directories
    let i = curr;
    while (i.parent != null) {
      i = i.parent;
      i.size += size;
    }
  }
}

let answer = 0;

// Do a full tree traversal to figure out this answer
const traverseTree = (root) => {
  if (root.size <= 100000) {
    answer += root.size;
  }
  // Base case
  // no children
  if (root.children.length === 0) {
    return;
  } else {
    for (const child of root.children) {
      traverseTree(child);
    }
  }
}

traverseTree(root);

console.log('answer', answer);