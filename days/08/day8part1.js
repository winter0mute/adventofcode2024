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
    }

  }
}

for (const [key, value] of antennaPositions) {
  for (let i = 0; i < value.length-1; i++) {
    for (let j = i+1; j < value.length; j++) {
      const firstx=value[i][0]-(value[j][0]-value[i][0]);
      const firsty=value[i][1]-(value[j][1]-value[i][1]);
      const secondx=value[j][0]+(value[j][0]-value[i][0]);
      const secondy=value[j][1]+(value[j][1]-value[i][1]);
      if (! (firstx<0 || firstx>=dataHeight || firsty<0 || firsty>=dataHeight )) {
        uniqAntinodes.add(JSON.stringify([firstx,firsty]));
      }
      if (! (secondx<0 || secondx>=dataHeight || secondy<0 || secondy>=dataHeight )) {
        uniqAntinodes.add(JSON.stringify([secondx,secondy]));
      }

    }
  }
}

console.log(uniqAntinodes.size);
