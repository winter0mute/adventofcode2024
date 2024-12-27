# Day 7

URL: https://adventofcode.com/2024/day/7

## Task
* _part1_: Go over the different permutations of the `+` and `*` operators, use them on the list as arithmetics (same sequence, no sorting or such, always evaluate from left-to-right) and if at least one combination equals the first number then that test is valid. The end result should be the sum of the valid tests.
* _part2_: Same as _part1_ but there is an additional operator (`||`) which concatenates the numbers (12 || 345 would become 12345).

## Solution
* _part1_: `./day7part1.js input`\
We can generate all the different combinations of operators by generating all the binary values from 0 to the number of operators per line power 2 minus 1 and the convert zeros to `+` adn ones to `*` and then just iterate over the numbers and execute the operators and add together the ones equaling to the test values. (Some lines have multiple valid operator combinations, these still only count as one.)
* _part2_: `./day7part2.js input`\
Same as before, the only difference is that there is the concatenation operator (`||`) too which concatenates numbers (12 || 345 would become 12345).
