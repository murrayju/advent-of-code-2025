import { readFile } from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputFilePath = path.join(__dirname, 'input.txt');

const data: string = await readFile(inputFilePath, 'utf-8');

const ranges = data
  .split(',')
  .map((range) => range.split('-').map((num) => parseInt(num, 10)));

const invalidIds = [];
for (const [start, end] of ranges) {
  if (!start || !end || start > end) {
    throw new Error(`Invalid range: ${start}-${end}`);
  }
  for (let i = start; i <= end; i++) {
    const numStr = i.toString();
    if (
      numStr.length % 2 === 0 &&
      numStr.slice(0, numStr.length / 2) === numStr.slice(numStr.length / 2)
    ) {
      invalidIds.push(i);
    }
  }
}

console.log(`Number of invalid IDs: ${invalidIds.length}`); // 768
const sum = invalidIds.reduce((acc, curr) => acc + curr, 0);
console.log(`Sum of invalid IDs: ${sum}`); // 15873079081
