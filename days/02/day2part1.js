#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let array=[];
let validReports=0;

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);

for (let i = 0; i < data.length; i++) {
    array.push(data[i].split(' ').map(Number));
}

// I tried to create a new sorted array from the input parameter but for some reason inside the for loop it had the original array, 
// don't know why but we can sort the parameter array a couple times instead...
// Most likely some funky stuff arrays being objects, see link in function body
function checkReport(report) {
    let retval=true;
    // YEY! Turns out Arrays are Objects and you can't compare them in a trivial way:
    // https://www.freecodecamp.org/news/how-to-compare-arrays-in-javascript/
    // And another YAY, toSorted sorts alphabetically and not numerically even if the array elements are numbers...
    // So a sort function needs to be added: .toSorted((a, b) => a - b)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted#sorting_an_array
    if (JSON.stringify(report)===JSON.stringify(report.toSorted((a, b) => a - b)) || JSON.stringify(report)===JSON.stringify(report.toSorted((a, b) => a - b).reverse())) {
        retval=true;
        for (let i = 1; i < report.toSorted((a, b) => a - b).length; i++) {
            if (!(report.toSorted((a, b) => a - b)[i]-report.toSorted((a, b) => a - b)[i-1]>=1 && report.toSorted((a, b) => a - b)[i]-report.toSorted((a, b) => a - b)[i-1]<=3)) {
                retval=false;
                break;
            }
        }
    } else {
        retval=false;
    }
    return retval;
}

for (let i = 0; i < array.length; i++) {
    if (checkReport(array[i])) {validReports+=1;}
}

console.log(validReports);

