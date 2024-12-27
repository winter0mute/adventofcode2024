# Day 8

URL: https://adventofcode.com/2024/day/8

## Task
* _part1_: Iterate over the pairs of antennas and save positions of them both sides (only those inside the map boundaries). The answer is all the unique locations.
* _part2_: Almost the same but no just the locations on either side is interesting for us but all on the line defined by 2 antennas. The answer is all the unique locations including the antennas too.

## Solution
* _part1_: `./day8part1.sh input`\
Pretty strait forward, the solution can be broken down of easy sub tasks and built on top of each other. But of course I had a one-off error (checking if coordinate is larger then the length of a line instead of using `>=1`).
* _part2_: `./day8part2.sh input`\
Just add a loop to the mix to check positions further and further away.
