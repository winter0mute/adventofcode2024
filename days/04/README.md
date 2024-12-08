# Day 4

URL: https://adventofcode.com/2024/day/4

## Task
* _part1_: Search for the `XMAS` string in a file vertically, horizontally (normal and reversed) and diagonally in every direction. The solution is the number of occurrences.
* _part2_: Search the `MAS` string twice in an X pattern, multiple orientation is possible.

## Solution
Switched to `NodeJS` as this challenge is heavily dependent on 2d array operation which is basically none existent in `bash`.  
* _part1_: `./day4part1.sh input`\
I'm pretty sure there is a way to do it with less iterations but getting the whole thing work in JavaScript was enough of a  challenge. (I did reduce the number of iterations to 4 from the maximal 8 by searching for `XMAS` and `SAMX` at the same time.)
* _part2_: `./day4part2.sh input`\
For me part2 was easier but did burn some time on a one-off error.
