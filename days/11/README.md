# Day 11

URL: https://adventofcode.com/2024/day/11

## Task
* _part1_: Apply the first rule applicable on an array of numbers:
    1. If element is `0` then it is changed to `1`.
    1. If the element has an even number of digits then it is split in half (like a string) and the original element is replaced by these 2, leading zeros are dropped.
    1.  Element is multiplied by `2024`.
    The solution is the number of elements in the array after 25 iterations.
* _part2_: Same as _part1_ but iteration is 75.

## Solution
* _part1_: `./day11part1.js input 25`\
Pretty straightforward, loop over the the array of numbers 25 times an apply the 3 rules.
* _part2_: `./day11part2.js input 75`\
With 75 iteration the number of stones and their values explode at around iteration 32-34 with the _part1_ solution, the key is that we don't care about the stone order and we can execute the relevant transformation rule ones and just log the number of stones this produces greatly reducing the time required to solve the challenge. Using a `Map` takes automatically of using only the uniq stones and the corresponding number of stones. The modification calculate the number of stones to 75 iteration a magnitude faster then the basic array one to 25. (~100ms vs ~1.1sec)
