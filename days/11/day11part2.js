#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2,3);
var numOfIterations = process.argv.slice(3,4);

let stoneMap=new Map();
var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);

data[0].split(' ').forEach(element => {
  if (stoneMap.get(element) === undefined) {
    stoneMap.set(element,1)
  } else {
    stoneMap.set(element,(stoneMap.get(element)+1))
  }
  }
);

for (let j = 0; j < numOfIterations; j++) {
  let inMap=new Map();
  stoneMap.forEach((values, keys) => {
    if (keys==='0') {
      inMap.get('1') ? inMap.set('1',inMap.get('1',values)+values) : inMap.set('1',values)
    } else if (keys.length%2===0) {
        let keysLen=keys.length/2;
        let firstHalf=Number(keys.slice(0,keysLen)).toString();
        let secondHalf=Number(keys.slice(keysLen,2*keysLen)).toString();
        inMap.get(firstHalf) ? inMap.set(firstHalf,inMap.get(firstHalf,values)+values) : inMap.set(firstHalf,values)
        inMap.get(secondHalf) ? inMap.set(secondHalf,inMap.get(secondHalf,values)+values) : inMap.set(secondHalf,values)
    } else {
        inMap.get((keys*2024).toString()) ? inMap.set((keys*2024).toString(),inMap.get((keys*2024).toString(),values)+values) : inMap.set((keys*2024).toString(),values)

    }
  });
  stoneMap=new Map(inMap);
  }

let stoneCount=0;
for (let [key, value] of stoneMap) {
  stoneCount+=value;
}

console.log(stoneCount);
