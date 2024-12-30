# Day 15

URL: https://adventofcode.com/2024/day/15

## Task
* _part1_: We have a robot (`@`) in map with walls (`#`), boxes (`O`) and empty spaces (`.`). The robot can move boxes, even multiple ones if the last box in the row is not against a wall (of course the robot also can't move if it would go directly into a wall). We also get a the moves to robot will try to make (it will move boxes around). After the robot executed all its moves then the take the coordinates of the boxes, multiply the X coordinate by 100 and add it to the Y coordinate and add all these together for the challenge answer.
* _part2_: The map is now twice as wide but the robot does the same moves.

## Solution
* _part1_: `./day15part1.js input`\
Not hard in the concept but hard to debug. Wanted to be smart and don't include the robot in the map but then had issues when I was doing some debugging and wanted to show the robot too, I start to hate object referencing by heart...  
* _part2_: TBD
