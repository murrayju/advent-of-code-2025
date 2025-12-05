import { readFile } from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputFilePath = path.join(__dirname, 'input.txt');

const data: string = await readFile(inputFilePath, 'utf-8');

const banks = data
  .split('\n')
  .map((bank) => bank.split('').map((num) => parseInt(num, 10)));

console.log(`Number of banks: ${banks.length}`); // 200

// Part 1
(() => {
  let iterations = 0;

  const maxJoltages = banks.map((bank): number => {
    if (bank.length < 2) {
      throw new Error(`Bank has fewer than 2 digits: ${bank.join('')}`);
    }
    let v1: number = bank[0] || 0;
    let v2: number = bank[1] || 0;

    let i = 1;
    while (i < bank.length - 1) {
      iterations++;
      const current = bank[i];
      if (!current) throw new Error(`Invalid digit at index ${i}`);
      const next = bank[i + 1];
      if (!next) throw new Error(`Invalid digit at index ${i + 1}`);

      if (current > v1) {
        v1 = current;
        v2 = next;
        i++;
        continue;
      }

      if (next > v2) {
        v2 = next;
      }

      if (v1 === 9 && v2 === 9) {
        break;
      }

      i++;
    }

    return v1 * 10 + v2;
  });

  console.log('\n---- Part 1 ----');
  console.log(`iterations: ${iterations}`); // 23976 -> 17238
  const part1Sum = maxJoltages.reduce((acc, curr) => acc + curr, 0);
  console.log(`Sum of max joltages (answer): ${part1Sum}`); // 17155
})();

// Part 2
(() => {
  let iterations = 0;

  const findMax = (
    bank: number[],
    left: number,
    right: number,
  ): [number, number] => {
    if (left < 0 || right < left || right >= bank.length) {
      throw new Error(`Invalid left/right indices: ${left}, ${right}`);
    }
    let idx = left;
    let v = bank[left] || 0;

    for (let i = left; i <= right && v < 9; i++) {
      iterations++;
      const current = bank[i];
      if (!current) throw new Error(`Invalid digit at index ${i}`);

      if (current > v) {
        v = current;
        idx = i;
      }
    }
    return [idx, v];
  };

  const maxJoltages = banks.map((bank): number => {
    if (bank.length < 12) {
      throw new Error(`Bank has fewer than 12 digits: ${bank.join('')}`);
    }
    const digits = bank.slice(-12);

    let prevIndex = -1;
    for (let digit = 0; digit < 12; digit++) {
      const [maxIdx, maxVal] = findMax(
        bank,
        prevIndex + 1,
        bank.length - 12 + digit,
      );
      prevIndex = maxIdx;
      digits[digit] = maxVal;
    }

    return parseInt(digits.join(''), 10);
  });

  console.log('\n---- Part 2 ----');
  console.log(`iterations: ${iterations}`); // 49171
  const part1Sum = maxJoltages.reduce((acc, curr) => acc + curr, 0);
  console.log(`Sum of max joltages (answer): ${part1Sum}`); // 169685670469164
})();
