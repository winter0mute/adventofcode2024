#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

let fileToProcess = process.argv.slice(2);

let array=[];
let xmasCounter=0;

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);
// console.log(data);

for (let i = 0; i < data.length; i++) {
    array.push(data[i].split(''));    
}

// console.log(array);

let dataWidth=data[0].length;
let dataHeight=data.length;

// console.log('dataWidth: '+dataWidth);
// console.log('dataHeight: '+dataHeight);
// console.log('fileToProcess: '+fileToProcess);
// console.log('fileToProcess typeof: '+typeof(fileToProcess.toString()));

for (let i = 1; i < dataHeight-1; i++) {
    // const element = data[i];
    for (let j = 1; j < dataWidth-1; j++) {
            if (array[i][j]==='A' && (
                (array[i-1][j-1]==='M' && array[i+1][j-1]==='M' && array[i-1][j+1]==='S' && array[i+1][j+1]==='S')
                || 
                (array[i-1][j-1]==='S' && array[i+1][j-1]==='S' && array[i-1][j+1]==='M' && array[i+1][j+1]==='M') 
                || 
                (array[i-1][j-1]==='M' && array[i+1][j-1]==='S' && array[i-1][j+1]==='M' && array[i+1][j+1]==='S') 
                || 
                (array[i-1][j-1]==='S' && array[i+1][j-1]==='M' && array[i-1][j+1]==='S' && array[i+1][j+1]==='M')
                )
                ) {xmasCounter+=1;}
    }
}

console.log(xmasCounter);
