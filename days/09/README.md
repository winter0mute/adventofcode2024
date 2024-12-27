# Day 9

URL: https://adventofcode.com/2024/day/9

## Task
* _part1_: Straightforward, small components in a row:
    * : expand the list to used (numbers) and unused (dots) list
    * : switch the last number with the first dot until all dots are at the end
    * : iterate over the list, multiply the numbers with their position and add these multiplications together as the result.
* _part2_: Instead moving 1 unit at the the time now we move blocks from the end to the first empty space the block can fit in.

## Solution
* _part1_: `./day9part1.sh input`\
Oh boy did I think it was an easy task, yeah, sure. There were a bunch of edge cases and encountered a bunch infinite loops with oneof errors. 
* _part2_: `./day9part2.sh input`\
The Script works for the test input but is waaay of (lower) from the solution with the real input.
