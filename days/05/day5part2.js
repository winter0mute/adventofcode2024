#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let rules=new Map();
let pageSequences=[]
let badManuals=[];
let returnVal=0

var data = readFileSync(fileToProcess.toString()).toString().split(EOL);

let middleOfFile=data.indexOf('');

// Load the rules in a Map
for (let i = 0; i < middleOfFile; i++) {
    // rules.push(data[i]); 
    let firstHalf=data[i].split('|')[0];
    let secondHalf=data[i].split('|')[1];
    if(rules.has(firstHalf)){
        rules.get(firstHalf).push(secondHalf);
     }else{
        rules.set(firstHalf, [secondHalf]);
     }
}

// Load the page sequences into arrays of an array
for (let i = middleOfFile+1; i < data.length-1; i++) {
    pageSequences.push(data[i].split(','));    
}

// Iterate over the sequences and check if an element breaks the rule
for (let i = 0; i < pageSequences.length; i++) {
    let manualGood=true;
    for (let j = 1; j < pageSequences[i].length; j++) {
        let supArr=pageSequences[i].slice(0,j);

        if (rules.get(pageSequences[i][j])){
            let rulesArr=rules.get(pageSequences[i][j])
            if (supArr.some(r=> (rulesArr).includes(r))) {
                manualGood=false;
                break;
            }
        }
    }
    if (! manualGood) {
        badManuals.push(pageSequences[i]);
    }
}

// Iterate over the bad manuals, if an element breaks the rule swap it with the one before and start from the beginning again
for (let index = 0; index < badManuals.length; index++) {
    let localArray=badManuals[index];
    let localArrayLength=badManuals[index].length;
    let whileCounter=1;
    while (whileCounter<localArrayLength) {
        let supArr=localArray.slice(0,whileCounter);
        if (rules.get(localArray[whileCounter])){
            let rulesArr=rules.get(localArray[whileCounter]);
            if (supArr.some(r=> (rulesArr).includes(r))) {
                let tempVar=localArray[whileCounter];
                localArray[whileCounter]=localArray[whileCounter-1];
                localArray[whileCounter-1]=tempVar;
                whileCounter=1;
            } else {
                whileCounter+=1;
            }
        } else {
            whileCounter+=1;
        }
    }
}

// Count the middle pages
for (let index = 0; index < badManuals.length; index++) {
    returnVal+=Number(badManuals[index][Math.trunc(badManuals[index].length/2)])
}

console.log(returnVal);
