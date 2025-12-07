import { readFile } from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const inputFilePath = path.join(__dirname, 'input.txt');

const data: string = await readFile(inputFilePath, 'utf-8');

const grid = data
  .trim()
  .split('\n')
  .map((row) => row.split('').map((cell) => cell === '@'));

const height = grid.length;
const width = grid[0]!.length;

console.log(`Grid size: ${width}x${height}`); // 138x138

console.log('\n---- Part 1 ----');
const neighbors = Array.from({ length: height }, () =>
  Array.from({ length: width }, () => 0),
);

const increment = (x: number, y: number, amount = 1) => {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  neighbors[y]![x]! += amount;
};

const incrementNeighbors = (x: number, y: number, amount = 1) => {
  for (let xO = -1; xO <= 1; xO++) {
    for (let yO = -1; yO <= 1; yO++) {
      if (!xO && !yO) continue;
      increment(x + xO, y + yO, amount);
    }
  }
};

for (const [y, row] of grid.entries()) {
  for (const [x, cell] of row.entries()) {
    if (!cell) continue;
    incrementNeighbors(x, y);
  }
}

const accessible = neighbors.reduce(
  (acc, row, y) =>
    acc + row.filter((count, x) => grid[y]![x]! && count < 4).length,
  0,
);

console.log(`Accessible paper rolls (answer): ${accessible}`); // 1553

console.log('\n---- Part 2 ----');
let steps = 0;
let removed = 0;
let totalRemoved = 0;

do {
  steps++;
  removed = 0;

  for (const [y, row] of grid.entries()) {
    for (const [x, cell] of row.entries()) {
      if (!cell || neighbors[y]![x]! >= 4) continue;
      grid[y]![x]! = false;
      incrementNeighbors(x, y, -1);
      removed++;
    }
  }

  totalRemoved += removed;
} while (removed);

console.log(`${steps} steps`); // 33
console.log(`Total removable rolls (answer): ${totalRemoved}`); // 8442
