# Day 3

URL: https://adventofcode.com/2024/day/3

## Task
* _Part1_: Extract the valid `mul()` commands then do the arithmetics on those numbers (multiply the pairs and then sum those) where the parameters a 1,2 or 3 long numbers.
* _Part2_: The same as before but commands between `don't()` and `do()` should be ignored.

## Solution

Both can be done via `bash` "one-liners" (not sure if you should though):
* _Part1_: 
    ```bash
    cat input | tr -d '\n' | grep -Eo 'mul\\([0-9]{1,3},[0-9]{1,3}\\)' | sed 's/mul//g' | tr ',' '*' | paste -sd '+' - | bc
    ```
* _Part2_:
    ```bash
    echo -n 'do()' | cat - input| tr -d '\n' | sed "s/don't()/\ndon't()/g" | grep -o 'do().*' | tr -d '\n' | grep -Eo 'mul\\([0-9]{1,3},[0-9]{1,3}\\)' | sed 's/mul//g' | tr ',' '*' | paste -sd '+' - | bc
    ```
