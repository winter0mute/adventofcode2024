#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2,3);

let array=[];

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);

array=data[0].split(' ').map(Number);

for (let i = 1; i <= 25; i++) {
    let loopCounter=0;
    
    while (loopCounter!=array.length) {
            if (array[loopCounter]===0) {
                array[loopCounter]=1;
            } else if (array[loopCounter].toString().length%2===0) {
                let arrlen=array[loopCounter].toString().length/2;
                array.splice(loopCounter,1,Number(array[loopCounter].toString().slice(0,arrlen)),Number(array[loopCounter].toString().slice(arrlen)));
                loopCounter+=1;
            } else {
                array[loopCounter]=array[loopCounter]*2024;
            }
        loopCounter+=1;
        }
}

console.log(array.length);
