# Day 1

URL: https://adventofcode.com/2024/day/2

## Task
* _part1_: Read the reports as lines from the input file. A report is safe if the adjacent report levels differ by at least one and at most three. Also the levels must either all increasing or all decreasing. The solution is the number of safe reports.
* _part2_: The same as part 1 but we can drop one bad element (any, not necessary the first) and see if the report is correct that way.

## Solution
* _part1_: I wanted to be fancy with if shorthand forms but as all that bites you in your lower half (got confusing really quick and hard to debug) so reimplemented it with normal `if`s in the end.
* _part2_: Not implemented yet, the original `part1` solution is hard to adapt to the new requirements.
