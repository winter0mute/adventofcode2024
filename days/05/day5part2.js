#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let rules=new Map();
let pageSequences=[]
let goodManuals=[];
let returnVal=0

var data = readFileSync(fileToProcess.toString()).toString().split(EOL);
// console.log(data);

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
// console.log(rules);
// console.log(rules.get('47'));
// console.log(rules.get('47').includes('11'));
// console.log(rules.get('47').includes('53'));

// Load the page sequences into arrays of an array
for (let i = middleOfFile+1; i < data.length-1; i++) {
    pageSequences.push(data[i].split(','));    
}

console.log(rules);
console.log(pageSequences);

// Iterate over the sequences and check if an element breaks the rule
for (let i = 0; i < pageSequences.length; i++) {
    let manualGood=true;
    for (let j = 1; j < pageSequences[i].length; j++) {
//        const element = pageSequences[i][j];
//        console.log(element);
        let supArr=pageSequences[i].slice(0,j);
        // console.log('pageSequences[i][j]: '+pageSequences[i][j])
        console.log(pageSequences[i][j])
        // console.log('pageSequences[i]: '+pageSequences[i])
        console.log(pageSequences[i])
        // console.log('supArr: '+supArr)
        console.log(supArr)
        // console.log(rulesArr);
        
        console.log('------');
        
        if (rules.get(pageSequences[i][j])){
        let rulesArr=rules.get(pageSequences[i][j])
        if (supArr.some(r=> (rulesArr).includes(r))) {
            manualGood=false;
            break;
        }
        // console.log(supArr.some(r=> (rulesArr).includes(r)));
        }
        // console.log(rulesArr).some(r=> (supArr.includes(r)));
    }
    if (! manualGood) {
        goodManuals.push(pageSequences[i]);
    }
    console.log(pageSequences[i]);
    
}
console.log('++++++++++++++');
console.log(goodManuals);
console.log('++++++++++++++');

// Count the middle pages
for (let index = 0; index < goodManuals.length; index++) {
    returnVal+=Number(goodManuals[index][Math.trunc(goodManuals[index].length/2)])
}

console.log(returnVal);
