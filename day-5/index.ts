import { readFile } from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputFilePath = path.join(__dirname, 'input.txt');

const data: string = await readFile(inputFilePath, 'utf-8');

const [upper, lower] = data.trim().split('\n\n');

if (!upper || !lower) {
  throw new Error('Invalid input format');
}

const sortedRanges: [number, number][] = upper
  .trim()
  .split('\n')
  .map((line) => {
    const range = line.split('-').map((val) => parseInt(val, 10));
    if (range.length !== 2) {
      throw new Error('Invalid range');
    }
    return range as [number, number];
  })
  .sort((a, b) => {
    const diff = a[0] - b[0];
    if (!diff) {
      return a[1] - b[1];
    }
    return diff;
  });

let last = sortedRanges[0];
if (!last) throw new Error('Empty list of ranges');
const compressedRanges: [number, number][] = [last];

for (const range of sortedRanges) {
  const [left, right] = range;
  if (left <= last[1]) {
    last[1] = Math.max(last[1], right);
  } else {
    last = range;
    compressedRanges.push(range);
  }
}

const available = lower
  .trim()
  .split('\n')
  .map((val) => parseInt(val, 10));

console.log(
  `${sortedRanges.length} ranges (${compressedRanges.length} compressed), ${available.length} available`,
); // 187 (91), 1000

console.log('\n---- Part 1 ----');

let iterations = 0;
let fresh = 0;
for (const ingredient of available) {
  for (const [left, right] of compressedRanges) {
    iterations++;
    if (ingredient >= left && ingredient <= right) {
      fresh++;
      break;
    }
  }
}

console.log('iterations:', iterations); // 131238 -> 64498 (compressed)
console.log('Fresh ingredients (answer):', fresh); // 558
