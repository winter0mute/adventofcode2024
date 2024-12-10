# Day 2

URL: https://adventofcode.com/2024/day/2

## Task
* _part1_: Read the reports as lines from the input file. A report is safe if the adjacent report levels differ by at least one and at most three. Also the levels must either all increasing or all decreasing. The solution is the number of safe reports.
* _part2_: The same as part 1 but we can drop one bad element (any, not necessary the first) and see if the report is correct that way.

## Solution
* _part1_:
    * _bash_: `./day4part1.sh input`\
    I wanted to be fancy with if shorthand forms but as all that bites you in your lower half (got confusing really quick and hard to debug) so reimplemented it with normal `if`s in the end.
    * _JavaScript_: `./day4part1.js input`\
    Looked to be easier to implement then with `bash` but arrays in `JS` bit me multiple time:
        1. did create sorted lists from the input but for some reason the value of these were the original array instead of the sorted one so as a workaround I sort the list 7 times inside the for loop...
        1. Arrays are objects in `JS` so comparing is not trivial, need to do `JSON.stringify` magic: https://www.freecodecamp.org/news/how-to-compare-arrays-in-javascript/
        1. Arrays of numbers ar still sorted as if they were strings (`[1, 11, 2, 20]`), needed to add a compare function to sort: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted#sorting_an_array
* _part2_: The implementation in bash was not trivial to adapt to the new requirements so this is why I did reimplement it via `JavaScript`. Was an easy modification of _part1_. 
