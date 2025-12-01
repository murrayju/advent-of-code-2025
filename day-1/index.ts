import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { count } from './count';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputFilePath = path.join(__dirname, 'input.txt');

const data: string = await readFile(inputFilePath, 'utf-8');
const rotations = data.split(/\s+/).filter((line) => !!line);

// The dial starts by pointing at 50
const { finalPosition, stoppedAtZeroCount, crossedZeroCount } = count(
  50,
  rotations,
);

console.log(`Final position: ${finalPosition}`);
console.log(`Number of times dial stopped at zero: ${stoppedAtZeroCount}`); // 1092
console.log(`Number of times dial crossed zero: ${crossedZeroCount}`); // 6616
