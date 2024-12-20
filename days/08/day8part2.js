#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2,3);

let array=[];
let uniqAntennas=new Set;
let antennaPositions=new Map;
let uniqAntinodes=new Set();

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);
let dataWidth=data[0].length;
let dataHeight=data.length;

for (let i = 0; i < data.length; i++) {
  array.push(data[i].split(''));  
  array[i].forEach(uniqAntennas.add, uniqAntennas);
}

uniqAntennas.delete('.')

for (const value of uniqAntennas) {
  antennaPositions.set(value, [])
}

for (let i = 0; i < dataHeight; i++) {
  for (let j = 0; j < dataWidth; j++) {
    if (array[i][j]!=='.') {
      antennaPositions.set(array[i][j], antennaPositions.get(array[i][j]).concat([[i,j]]));
      uniqAntinodes.add(JSON.stringify([i,j]));
    }
  }
}

for (const [key, value] of antennaPositions) {
  for (let i = 0; i < value.length-1; i++) {
    for (let j = i+1; j < value.length; j++) {
      let xDelta=value[j][0]-value[i][0];
      let yDelta=value[j][1]-value[i][1];
      let upInside=true;
      let downInside=true;
      let loopCounter=1;
      while (upInside || downInside) {
        let firstx=value[i][0]-(xDelta*loopCounter);
        let firsty=value[i][1]-(yDelta*loopCounter);
        let secondx=value[j][0]+(xDelta*loopCounter);
        let secondy=value[j][1]+(yDelta*loopCounter);
        if (! (firstx<0 || firstx>=dataHeight || firsty<0 || firsty>=dataHeight )) {
          uniqAntinodes.add(JSON.stringify([firstx,firsty]));
        } else {
          upInside=false;
        }
        if (! (secondx<0 || secondx>=dataHeight || secondy<0 || secondy>=dataHeight )) {
          uniqAntinodes.add(JSON.stringify([secondx,secondy]));
        } else {
          downInside=false;
        }
        loopCounter+=1;
      }

    }
  }
}

console.log(uniqAntinodes.size);
