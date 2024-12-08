#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';
import { exit } from 'process';

var fileToProcess = process.argv.slice(2);

let rules=[];
let pageSequences=[]
let returnVal=0

var data = readFileSync(fileToProcess.toString()).toString().split(EOL);
// console.log(data);

let middleOfFile=data.indexOf('');

for (let i = 0; i < middleOfFile; i++) {
    rules.push(data[i]);    
}

for (let i = middleOfFile+1; i < data.length-1; i++) {
    pageSequences.push(data[i].split(','));    
}

console.log(rules);
console.log(pageSequences);

for (let i = 0; i < pageSequences.length; i++) {
    for (let j = 0; j < pageSequences[i].length; j++) {
//        const element = pageSequences[i][j];
//        console.log(element);
        console.log(pageSequences[i][j])
        console.log(pageSequences[i])
        console.log(pageSequences[i].slice(0,j+1))
    }
    console.log();
}

