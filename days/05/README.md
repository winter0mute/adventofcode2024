# Day 5

URL: https://adventofcode.com/2024/day/5

## Task
* _part1_: The input contains `page ordering rules` and list of page sequences to validate with the rules separated by an empty line. The rules contain pairs of page numbers (`47|53`)  where the first should come before the second (not necessary directly) in the page sequences. Then from the valid sequences we need to extract the middle ones and add them together to get the solution.
* _part2_: In contrast to _part1_ here we search for incorrectly-ordered sequences, reordering them according the rules and then sum up the middle elements.

## Solution
* _part1_: `./day5part1.js input`\
In the end the core of the solution is to load the rules in a set (key is the first part and the value is all the second parts for the key) and then iterate over the sequences and check if the pages before the actual page are part of the corresponding keys value (those are incorrect orders and are discarded). Then of a quick iteration over the good sequences and sum up the middle elements.
* _part2_: `./day5part2.js input`\
Similar to _part1_ but we search for the bad manuals, sort them according to the rules and then count the middle pages.
