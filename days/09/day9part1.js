#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let printNumbers=true;
let origDiskMap=[];
let checkSum=0;
let inLoop=true;
let firstDotIndex=Infinity;
let lastDotIndex=-1;

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n).toString().split('').map(Number);
// console.log(data);

for (let i = 0; i < data.length; i++) {
    if (printNumbers) {
        origDiskMap.push(...Array(data[i]).fill(i/2));
        // console.log(data[i]);
    }
    else {
        origDiskMap.push(...Array(data[i]).fill('x'));
        // console.log('.');
    }
    printNumbers=!printNumbers;
}

let compactDiskMap=origDiskMap;
console.log(origDiskMap);
console.log(compactDiskMap);

// console.log(origDiskMap);
// console.log(origDiskMap.join(''));

// console.log(origDiskMap.indexOf('x'));
// console.log(origDiskMap.lastIndexOf('x'));

// // Doing the first swap by hand so an empty space is at the end and our regex can work 
// compactDiskMap[origDiskMap.indexOf('x')]=origDiskMap[origDiskMap.length-1];
// compactDiskMap[origDiskMap.length-1]='x';


// console.log(compactDiskMap.join(''));
// console.log(compactDiskMap.join('')[40]);
// console.log(compactDiskMap.join('').length);
// console.log('qwer'+compactDiskMap.join('').match('x*$').index);
// console.log(compactDiskMap.slice(0,compactDiskMap.join('').match('x*$').index).join(''));
// console.log('_____________');


let elementToMove='';

while (inLoop) {
    firstDotIndex=compactDiskMap.indexOf('x');
    // lastDotIndex=compactDiskMap.join('').match('x*$').index;
    // console.log('before else : '+compactDiskMap.join(''));
    // console.log('firstDotIndex: '+firstDotIndex);
    // if (firstDotIndex>=49600){
    //     console.log(compactDiskMap);
    // }
        // console.log('lastDotIndex: '+lastDotIndex);
    // if (firstDotIndex==-1 || firstDotIndex>=49600) {
    if (firstDotIndex==-1) {
        inLoop=false;
    } else {        
        // compactDiskMap[firstDotIndex]=compactDiskMap[lastDotIndex-1];
        // compactDiskMap[lastDotIndex-1]='x';
        // console.log('in else: '+compactDiskMap.join(''));
        elementToMove=compactDiskMap.pop();
        // console.log(elementToMove);
        if (elementToMove!='x') {
            compactDiskMap[firstDotIndex]=elementToMove;
        }
    }
    // console.log(compactDiskMap.join(''));
}

// let justTheNumbers=compactDiskMap.slice(0,compactDiskMap.indexOf('x'));

console.log('compactDiskMap: '+compactDiskMap);
// console.log('justTheNumbers: '+justTheNumbers);
for (let i = 0; i < compactDiskMap.length; i++) {
    checkSum+=i*compactDiskMap[i];
}

// console.log(justTheNumbers);
console.log(checkSum);
