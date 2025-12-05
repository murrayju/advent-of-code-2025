import { readFile } from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputFilePath = path.join(__dirname, 'input.txt');

const data: string = await readFile(inputFilePath, 'utf-8');

const banks = data
  .split('\n')
  .map((bank) => bank.split('').map((num) => parseInt(num, 10)));

console.log(`Number of banks: ${banks.length}`); // 200

let iterations = 0;
const findMaxDigitIndex = (
  digits: number[],
  startIndex: number,
  endIndex: number,
): [number, number] => {
  if (startIndex < 0 || endIndex >= digits.length || startIndex > endIndex) {
    throw new Error(`Invalid indices: ${startIndex}, ${endIndex}`);
  }
  let maxIndex = startIndex;
  for (let i = startIndex + 1; i <= endIndex; i++) {
    iterations++;
    if (digits[i]! > digits[maxIndex]!) {
      maxIndex = i;
    }
    if (digits[maxIndex] === 9) break;
  }
  return [maxIndex, digits[maxIndex]!];
};

const maxJoltages = banks.map((bank): number => {
  const [firstIndex, firstDigit] = findMaxDigitIndex(bank, 0, bank.length - 2);
  const [, secondDigit] = findMaxDigitIndex(
    bank,
    firstIndex + 1,
    bank.length - 1,
  );
  return firstDigit * 10 + secondDigit;
});

console.log('\n---- Part 1 ----');
console.log(`iterations: ${iterations}`); // 23976
const part1Sum = maxJoltages.reduce((acc, curr) => acc + curr, 0);
console.log(`Sum of max joltages (answer): ${part1Sum}`); // 17155
