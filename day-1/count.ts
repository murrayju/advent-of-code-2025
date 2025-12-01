export const count = (
  startPosition: number,
  rotations: readonly string[],
): {
  finalPosition: number;
  stoppedAtZeroCount: number;
  crossedZeroCount: number;
} => {
  let position = startPosition;
  let stoppedAtZeroCount = 0;
  let crossedZeroCount = 0;

  for (const rotation of rotations) {
    const dir = rotation[0];
    const dist = parseInt(rotation.slice(1), 10);
    const start = position;

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

    crossedZeroCount += Math.floor(Math.abs(position) / 100);

    // When rotating left, we cross an additional zero than the floor value
    // if we started above zero and ended at or below zero
    if (position <= 0 && start > 0) {
      crossedZeroCount += 1;
    }

    position = (position % 100) + 0; // ensure -0 becomes 0
    if (position < 0) {
      position += 100;
    } else if (position === 0) {
      stoppedAtZeroCount += 1;
    }
  }

  return { finalPosition: position, stoppedAtZeroCount, crossedZeroCount };
};
