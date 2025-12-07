import { readFile } from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputFilePath = path.join(__dirname, 'input.txt');

const data: string = await readFile(inputFilePath, 'utf-8');

const [upper, lower] = data.trim().split('\n\n');

if (!upper || !lower) {
  throw new Error('Invalid input format');
}

const ranges: [number, number][] = upper
  .trim()
  .split('\n')
  .map((line) => {
    const range = line.split('-').map((val) => parseInt(val, 10));
    if (range.length !== 2) {
      throw new Error('Invalid range');
    }
    return range as [number, number];
  });

const available = lower
  .trim()
  .split('\n')
  .map((val) => parseInt(val, 10));

console.log(`${ranges.length} ranges, ${available.length} available`); // 187, 1000

console.log('\n---- Part 1 ----');

let iterations = 0;
let fresh = 0;
for (const ingredient of available) {
  for (const [left, right] of ranges) {
    iterations++;
    if (ingredient >= left && ingredient <= right) {
      fresh++;
      break;
    }
  }
}

console.log('iterations:', iterations); // 131238
console.log('Fresh ingredients (answer):', fresh); // 558
