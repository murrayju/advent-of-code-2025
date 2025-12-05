# Day 2 Notes

Trying to optimize the solution for part 2 was again trickier than it looked at first glance. I knew that I could skip over large ranges of numbers by skipping values that can't possibly match the left half of the pattern. However, I initially made an invalid assumption that I could discard the next pattern of length N if it would be less than the current number being tested.

Example:

Range: 5489-8293
Current number: 5489
Patterns:

- 5 -> 5555
  - This is added to the answer list
  - Next pattern is 6 -> 6666
- 54 -> 5454
  - This is less than the start of the range
  - Next pattern is 55 -> 5555

If we skip to 6666, we miss the fact that 5656, 5757, 5858, 5959, 6060, etc are all valid patterns that should be included in the answer.

To fix this, I allowed jumping back to a test number that is lower than the start of the range, and rely on the next iteration to increment it again. This introduces the risk of infinite loops, so I added another set to track which numbers have already been tested, and only allow jumps to untested numbers.
