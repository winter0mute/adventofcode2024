#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let emptyLines=[0];
let keysList=[];
let locksList=[];
let noOverlaps=0;

var data = readFileSync(fileToProcess.toString()).toString().split(EOL);

for (let index = 0; index < data.length; index++) {
    let lineCheck=[...new Set(data[index])].toString();
    if (lineCheck==='') {
        emptyLines.push(index+1);
    }    
}

for (let i = 0; i < emptyLines.length-1; i++) {
    let localArray=data.slice(emptyLines[i],emptyLines[i+1]-1);
    let localArrayLength=localArray[0].length;
    let localSchematics=[];

    for (let j = 0; j < localArrayLength; j++) {
        localSchematics.push(localArray.map(function(value,index) { return value[j]; }).filter(x => x=='#').length-1);
    }

    if (localArray[0][0]==='#') {
        locksList.push(localSchematics);
    } else {
        keysList.push(localSchematics);
    }
}

function checkOverlap(height) {
    return height >= 6;
  }

for (let k = 0; k < locksList.length; k++) {
    for (let l = 0; l < keysList.length; l++) {
        let sumArray=locksList[k].map(function(item, index) {return item + keysList[l][index];});
        if (sumArray.filter(checkOverlap).length===0) {
            noOverlaps+=1;
        }
    }
}

console.log(noOverlaps);
