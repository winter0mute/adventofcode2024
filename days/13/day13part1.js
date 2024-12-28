#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2,3);

var data = readFileSync(fileToProcess.toString()).toString().split(EOL);

let loopObject={};
let clawMachines=[];
let numberOfTokens=0;

for (let index = 0; index < data.length; index++) {
    switch (index%4) {
        case 0:
            loopObject.ax=Number(data[index].split('+')[1].split(',')[0]);
            loopObject.ay=Number(data[index].split('+')[2]);
            break;
        case 1:
            loopObject.bx=Number(data[index].split('+')[1].split(',')[0]);
            loopObject.by=Number(data[index].split('+')[2]);
            break;
        case 2:
            loopObject.px=Number(data[index].split('=')[1].split(',')[0]);
            loopObject.py=Number(data[index].split('=')[2]);
            break;
        default:
            clawMachines.push(loopObject);
            loopObject={};
            break;
    }
}

clawMachines.forEach(element => {
    let ca = (element.px * element.by - element.py * element.bx) / (element.ax * element.by - element.ay * element.bx);
    let cb = (element.px - element.ax * ca) / element.bx;
    
    if (Number.isInteger(ca) && Number.isInteger(cb) && ca<=100 && cb<=100) {
        numberOfTokens+=ca*3+cb;
    }
});

console.log(numberOfTokens);
