import { readFile } from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputFilePath = path.join(__dirname, 'input.txt');

const data: string = await readFile(inputFilePath, 'utf-8');

const ranges = data
  .split(',')
  .map((range) => range.split('-').map((num) => parseInt(num, 10)));

console.log(`Number of ranges: ${ranges.length}`); // 31

const part1 = () => {
  const invalidIds = [];
  let iterations = 0;
  for (const [start, end] of ranges) {
    if (!start || !end || start > end) {
      throw new Error(`Invalid range: ${start}-${end}`);
    }

    let i = start;
    while (i <= end) {
      iterations += 1;
      const numStr = i.toString();
      if (numStr.length % 2) {
        // odd length can't be doubled pattern
        // jump to next power of 10 (even number of digits)
        const left = 10 ** Math.floor(numStr.length / 2);
        i = parseInt(`${left}${left}`, 10);
        continue;
      }
      const left = numStr.slice(0, numStr.length / 2);
      const right = numStr.slice(numStr.length / 2);
      const leftNum = parseInt(left, 10);
      const rightNum = parseInt(right, 10);
      if (rightNum < leftNum) {
        // jump to next doubled pattern
        i = parseInt(`${left}${left}`, 10);
        continue;
      }

      if (left === right) {
        invalidIds.push(i);
      }

      const nextLeft = leftNum + 1;
      // Consider the next doubled pattern
      i = parseInt(`${nextLeft}${nextLeft}`, 10);
    }
  }

  console.log('\n---- Part 1 ----');
  console.log(`iterations: ${iterations}`); // 1949832 -> 799
  console.log(`Number of invalid IDs: ${invalidIds.length}`); // 768
  const sum = invalidIds.reduce((acc, curr) => acc + curr, 0);
  console.log(`Sum of invalid IDs (answer): ${sum}`); // 15873079081
};

const part2 = () => {
  const invalidIds = new Set<number>();
  const testedIds = new Set<number>();
  let iterations = 0;
  for (const [start, end] of ranges) {
    if (!start || !end || start > end) {
      throw new Error(`Invalid range: ${start}-${end}`);
    }

    let i = start;
    while (i <= end) {
      testedIds.add(i);
      const numStr = i.toString();
      const numDigits = numStr.length;
      let next = 10 ** numDigits;
      for (let pLen = 1; pLen <= numDigits / 2; pLen += 1) {
        if (numDigits % pLen) continue; // pattern can't fit evenly
        iterations += 1;
        const pat = numStr.slice(0, pLen);
        const candidate = parseInt(pat.repeat(numDigits / pLen), 10);
        if (candidate >= i && candidate <= end) {
          invalidIds.add(candidate);
        }
        const nextIncrement = parseInt(
          `${parseInt(pat, 10) + 1}`.repeat(numDigits / pLen),
          10,
        );
        if (!testedIds.has(nextIncrement)) {
          next = Math.min(next, nextIncrement);
        }
      }
      i = Math.max(next, i + 1);
    }
  }

  console.log('\n---- Part 2 ----');
  console.log(`iterations: ${iterations}`); // 4960087 -> 2274
  console.log(`Number of invalid IDs: ${invalidIds.size}`); // 842
  const sum = Array.from(invalidIds).reduce((acc, curr) => acc + curr, 0);
  console.log(`Sum of invalid IDs (answer): ${sum}`); // 22617871034
};

part1();
part2();
