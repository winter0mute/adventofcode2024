#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let wires=new Map();
let equations=[]
let goodManuals=[];
let returnVal=0

var data = readFileSync(fileToProcess.toString()).toString().split(EOL);

let middleOfFile=data.indexOf('');

// Load the wires in a Map
for (let i = 0; i < middleOfFile; i++) {
    let firstHalf=data[i].split(':')[0];
    let secondHalf=data[i].split(' ')[1];
    wires.set(firstHalf);
    equations.push()
}

// Load the page sequences into arrays of an array
for (let i = middleOfFile+1; i < data.length-1; i++) {
    pageSequences.push(data[i].split(','));    
}


console.log(rules);

// // Iterate over the sequences and check if an element breaks the rule:
// // generate a list of element before the current page and check if any of those are in the list from the relevant rule
// for (let i = 0; i < pageSequences.length; i++) {
//     let manualGood=true;
//     for (let j = 1; j < pageSequences[i].length; j++) {
//         let supArr=pageSequences[i].slice(0,j);

//         if (rules.get(pageSequences[i][j])){
//         let rulesArr=rules.get(pageSequences[i][j])
//         if (supArr.some(r=> (rulesArr).includes(r))) {
//             manualGood=false;
//             break;
//         }
//         }
//     }
//     if (manualGood) {
//         goodManuals.push(pageSequences[i]);
//     }
// }

// // Count the middle pages
// for (let index = 0; index < goodManuals.length; index++) {
//     returnVal+=Number(goodManuals[index][Math.trunc(goodManuals[index].length/2)])
// }

// console.log(returnVal);
