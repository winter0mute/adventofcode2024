#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);

let totalCalibrationResult=0

for (let i = 0; i < data.length; i++) {
    let sumNum=Number(data[i].split(':')[0]);
    let numArr=data[i].split(' ').slice(1).map(Number);
    let numArrLen=numArr.length;
    let allLoopExit=true;
    let whileI=0;
    while (whileI < 2**(numArrLen-1) && allLoopExit) {
        let operators=[whileI.toString(2).padStart(numArrLen-1,'0').replaceAll('0','+').replaceAll('1','*')];
        let whileJ = 0;
        while ( whileJ < operators.length) {
            let equationCounter=numArr[0];
            let whileK = 0;
            while (whileK < operators[whileJ].length && allLoopExit) {
                if (operators[whileJ][whileK]==='+') {
                    equationCounter=equationCounter+numArr[whileK+1];
                } else {
                    equationCounter=equationCounter*numArr[whileK+1];
                }
                whileK++;
            }
            if (equationCounter===sumNum) {
                totalCalibrationResult+=equationCounter;
                allLoopExit=false;
                ;
            }
            whileJ++;
        }
        whileI++;
    }
}

console.log(totalCalibrationResult);
