# Day 3 Notes

The puzzle input is 200 lines of 100 digits. Assuming each digit might need to be inspected in the worst case, the upper bound for an optimal solution is 20,000 operations. My brute force solution produced 24k operations, but I do think the input is far from the worst case.

After optimizing, got 17238 iterations, which is a good improvement. Because each iteration looks at both digits, it is actually 200 * 99 = 19800 loops in the worst case. Getting less than that means a significant number of the lines had a value of 99 early on.

## Part 2

It's hard to imagine doing this in a single pass... this initial solution does an inner loop for each digit, moving it to the leftmost position of the largest available digit, bounded by the range left between the previous digit position and the rightmost possible position. At 49k iterations, this is really not that far from optimal.
