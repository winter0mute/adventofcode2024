#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

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

// Horizontal
for (let i = 0; i < dataHeight; i++) {
    // const element = data[i];
    for (let j = 0; j < dataWidth-3; j++) {
        // const element = data[j];
        // console.log(array[i][j])
        if ((array[i][j]==='X' && array[i][j+1]==='M'&& array[i][j+2]==='A'&& array[i][j+3]==='S') || (array[i][j]==='S' && array[i][j+1]==='A'&& array[i][j+2]==='M'&& array[i][j+3]==='X')) {
            // console.log('XXXXXX');
            // console.log(array[i].join(''));
            xmasCounter+=1;
        }
    }
}

// Vertical
for (let i = 0; i < dataHeight-3; i++) {
    // const element = data[i];
    for (let j = 0; j < dataWidth; j++) {
        // const element = data[j];
        // console.log(array[i][j])
        if ((array[i][j]==='X' && array[i+1][j]==='M'&& array[i+2][j]==='A'&& array[i+3][j]==='S') || (array[i][j]==='S' && array[i+1][j]==='A'&& array[i+2][j]==='M'&& array[i+3][j]==='X')) {
            // console.log('XXXXXX');
            // console.log(array[i].join(''));
            xmasCounter+=1;
        }
    }
}

// Diagonally (top left-bottom right) 
for (let i = 0; i < dataHeight-3; i++) {
    // const element = data[i];
    for (let j = 0; j < dataWidth-3; j++) {
        // const element = data[j];
        // console.log(array[i][j])
        if ((array[i][j]==='X' && array[i+1][j+1]==='M'&& array[i+2][j+2]==='A'&& array[i+3][j+3]==='S') || (array[i][j]==='S' && array[i+1][j+1]==='A'&& array[i+2][j+2]==='M'&& array[i+3][j+3]==='X')) {
            // console.log('XXXXXX');
            // console.log(array[i].join(''));
            xmasCounter+=1;
        }
    }
}

// Diagonally (bottom left-top right) 
// for (let i = 0; i < dataHeight-3; i++) {
for (let i = dataHeight-1; i >=3; i--) {
    // const element = data[i];
    for (let j = 0; j < dataWidth-3; j++) {
        // const element = data[j];
        // console.log(array[i][j])
        if ((array[i][j]==='X' && array[i-1][j+1]==='M'&& array[i-2][j+2]==='A'&& array[i-3][j+3]==='S') || (array[i][j]==='S' && array[i-1][j+1]==='A'&& array[i-2][j+2]==='M'&& array[i-3][j+3]==='X')) {
            // console.log('XXXXXX');
            // console.log(array[i].join(''));
            xmasCounter+=1;
        }
    }
}

console.log(xmasCounter);
