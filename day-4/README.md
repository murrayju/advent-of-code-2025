# Day 4 Notes

A first pass over the 2d grid with a constant (8) operations per cell to calculate the neighbor counts, and then a second pass to count the accessible cells based on the neighbor counts. This is linear with the number of cells in the grid, so at least close to optimal.

## Part 2

I'm not actually sure how to score my solution to part 2. It is performing a linear scan of the cells repeatedly in a loop, but it is < O(n^2) because it is bounded by how many rolls are actually removable. I measured that the outer loop iterated 33 times, which is _far_ from n (138^2).
