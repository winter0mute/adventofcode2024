# Day 6

URL: https://adventofcode.com/2024/day/6

## Task
* _part1_: Find out how many distinct positions the guard (`^`) visits before leaving the map. When coming up on an obstacle (`#`) he turns always right.
* _part2_: Like part1 but adding an obstacle to every empty position and testing all of those if that traps the guard in a loop (visiting the same node with the same direction again). The solution is the number of these loops.

## Solution
* _part1_: `./day6part1.js input`
* _part2_: `./day6part2.js input`\
I took the solution of part1 and wrapped into a double for loop to add an extra obstacle on every empty position and run the previous test against the new layout, of course I added loop detection by storing the turns at coordinates (if you do the same turn at the same coordinate you are in a loop). Pretty strait forward but did take quite some time with a strange bug where the test was only run against the first layout, turns out I did not reset the starting position... :facepalm:
