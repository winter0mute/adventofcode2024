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
let fileSizeList=[];

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n).toString().split('').map(Number);
// console.log(data);

for (let i = 0; i < data.length; i++) {
    if (printNumbers) {
        fileSizeList.push([i/2,origDiskMap.length, data[i]]);
        origDiskMap.push(...Array(data[i]).fill(i/2));
        // console.log(data[i]);
        // numberOfFileIds+=1;
    }
    else {
        origDiskMap.push(...Array(data[i]).fill('x'));
        // console.log('.');
    }
    printNumbers=!printNumbers;
}

let compactDiskMap=origDiskMap;
// console.log(origDiskMap);
// console.log(compactDiskMap.join(''));

// console.log(fileSizeList);
// compactDiskMap.push('x');
// compactDiskMap.push('x');
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

// Making sure no epmyt space is at the end of the disk
while (compactDiskMap[compactDiskMap.length-1]==='x'){
    compactDiskMap.pop()
}

let tempSearchString=[];
let emptyPlace;

for (let i = fileSizeList.length-1; i >=0  ; i--) {
    // console.log('start iteration');
    // console.log(fileSizeList[i]);
    tempSearchString=Array(fileSizeList[i][2]).fill('x').join('');
    emptyPlace=compactDiskMap.join('').indexOf(tempSearchString);
    // console.log('tempSearchString: '+tempSearchString);
    // console.log('emptyPlace: '+emptyPlace);
    // console.log('fileSizeList[i]: '+fileSizeList[i]);
    // console.log('fileSizeList[i][1]: '+fileSizeList[i][1]);
    // console.log('fileSizeList[i][2]: '+fileSizeList[i][2]);
    // console.log('fileSizeList[i][1]-fileSizeList[i][2]: '+(fileSizeList[i][1]-fileSizeList[i][2]));
    // console.log('compactDiskMap before:'+compactDiskMap.join(''));
    if ((emptyPlace !== -1) && (fileSizeList[i][1]-fileSizeList[i][2]>=emptyPlace)) {
        // console.log('fileSizeList[i][2]: '+fileSizeList[i][2]);
        // console.log('i: '+i);
        for (let j = 0; j < fileSizeList[i][2]; j++) {
            // console.log('magic');
            compactDiskMap[j+emptyPlace]=fileSizeList[i][0];
            compactDiskMap[j+fileSizeList[i][1]]='x';
            // compactDiskMap.splice(compactDiskMap.length-fileSizeList[i][2],fileSizeList[i][2]);
            // console.log(compactDiskMap[j+emptyPlace]);
            // console.log('compactDiskMap inside:'+compactDiskMap.join(''));        
        }
    }
    // console.log('compactDiskMap after :'+compactDiskMap.join(''));
    // console.log();
    // console.log(compactDiskMap.join(''));
}


// console.log(compactDiskMap);

// let elementToMove='';

// while (inLoop) {
//     firstDotIndex=compactDiskMap.indexOf('x');
//     // lastDotIndex=compactDiskMap.join('').match('x*$').index;
//     // console.log('before else : '+compactDiskMap.join(''));
//     console.log('firstDotIndex: '+firstDotIndex);
//     // if (firstDotIndex>=49600){
//     //     console.log(compactDiskMap);
//     // }
//         // console.log('lastDotIndex: '+lastDotIndex);
//     // if (firstDotIndex==-1 || firstDotIndex>=49600) {
//     if (firstDotIndex==-1) {
//         inLoop=false;
//     } else {        
//         // compactDiskMap[firstDotIndex]=compactDiskMap[lastDotIndex-1];
//         // compactDiskMap[lastDotIndex-1]='x';
//         // console.log('in else: '+compactDiskMap.join(''));
//         elementToMove=compactDiskMap.pop();
//         // console.log(elementToMove);
//         if (elementToMove!='x') {
//             compactDiskMap[firstDotIndex]=elementToMove;
//         }
//     }
//     // console.log(compactDiskMap.join(''));
// }

// let justTheNumbers=compactDiskMap.slice(0,compactDiskMap.indexOf('x'));

// console.log('compactDiskMap: '+compactDiskMap);
// console.log('justTheNumbers: '+justTheNumbers);
for (let i = 0; i < compactDiskMap.length; i++) {
    // console.log(i+': '+compactDiskMap[i]);
    if (compactDiskMap[i]!=='x'){
        checkSum+=i*compactDiskMap[i];
        // console.log('checkSum: '+checkSum);
    }
    // console.log();
}

// console.log(justTheNumbers);
console.log(checkSum);
