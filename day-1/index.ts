import { readFile } from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputFilePath = path.join(__dirname, 'input.txt');

const data: string = await readFile(inputFilePath, 'utf-8');
const rotations = data.split(/\s+/).filter((line) => !!line);

// The dial starts by pointing at 50
let position = 50;
let endingZeros = 0;

for (const rotation of rotations) {
  const dir = rotation[0];
  const dist = parseInt(rotation.slice(1), 10);

  switch (dir) {
    case 'L':
      position -= dist;
      break;
    case 'R':
      position += dist;
      break;
    default:
      throw new Error(`Invalid direction: ${dir}`);
  }

  position = position % 100;
  if (position < 0) {
    position += 100;
  } else if (position === 0) {
    endingZeros += 1;
  }
}

console.log(`Final position: ${position}`);
console.log(`Number of times dial stopped at zero: ${endingZeros}`);
