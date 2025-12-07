# Day 5 Notes

This one is straightforward to brute force, but certainly `O(N*M)`, and I see 131k iterations. Compressing the overlapping ranges would help, but doesn't change the big-O. I think we'll need to sort the ranges, do a binary search.
