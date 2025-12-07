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

// Part 1
(() => {
  const neighbors = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0),
  );

  const increment = (x: number, y: number) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    neighbors[y]![x]! += 1;
  };

  for (const [y, row] of grid.entries()) {
    for (const [x, cell] of row.entries()) {
      if (!cell) continue;
      increment(x - 1, y - 1);
      increment(x - 1, y);
      increment(x - 1, y + 1);
      increment(x, y - 1);
      increment(x, y + 1);
      increment(x + 1, y - 1);
      increment(x + 1, y);
      increment(x + 1, y + 1);
    }
  }

  const accessible = neighbors.reduce(
    (acc, row, y) =>
      acc + row.filter((count, x) => grid[y]![x]! && count < 4).length,
    0,
  );

  console.log('\n---- Part 1 ----');
  console.log(`Accessible paper rolls (answer): ${accessible}`); // 1553
})();

// Part 2
(() => {})();
