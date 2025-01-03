# Day 22

URL: https://adventofcode.com/2024/day/22

## Task
* _part1_: Basically execute a bunch of calculations according to the description (I guess this is more of a read exercise, we will see.) The challenge description is quite precise and compact, so here I just quote it instead of rewriting it again: 
    >In particular, each buyer's **secret** number evolves into the next secret number in the sequence via the following process:
    >
    >- Calculate the result of **multiplying the secret number by 64**. Then, **mix** this result into the secret number. Finally, **prune** the secret number.
    >- Calculate the result of **dividing the secret number by 32**. Round the result down to the nearest integer. Then, mix this result into the secret number. Finally, **prune** the secret number.
    >- Calculate the result of **multiplying the secret number by 2048**. Then, mix this result into the secret number. Finally, **prune** the secret number.
    >
    >Each step of the above process involves **mixing** and **pruning**:
    >
    >- To **mix** a value into the secret number, calculate the [bitwise XOR](https://en.wikipedia.org/wiki/Bitwise_operation#XOR) of the given value and the secret number. Then, the secret number becomes the result of that operation. (If the secret number is 42 and you were to **mix** 15 into the secret number, the secret number would become 37.)
    >- To **prune** the secret number, calculate the value of the secret number [modulo](https://en.wikipedia.org/wiki/Modulo) 16777216. Then, the secret number becomes the result of that operation. (If the secret number is 100000000 and you were to **prune** the secret number, the secret number would become 16113920.)
* _part2_: As expected, the rules were twisted and and we search for the last delta value of a fourth change, ehh, for details check out the part2 description, that is strait forward.

## Solution
* _part1_: `./day22part1.js input`
Strait forward, implement according to the rules.
* _part2_: `./day22part2.js input`
Wanted to generate all possible combination of the 4 changed, iterate over that list and search for them with regexp. It was slow (1 run would take about 30 minutes) and there was sadly some kind of bug which was hard to debug with these runtimes. So taking a step back to think about the problem I remembered day11 which took also too long with a brute force solution, and again a Map was the solution (runs now under a second).
