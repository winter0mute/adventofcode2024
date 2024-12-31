#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let wires=new Map();
let equations=[];
let unknownEquations=0;

var data = readFileSync(fileToProcess.toString()).toString().split(EOL);

let middleOfFile=data.indexOf('');

// Load the wires in a Map for results and in the equations array too
for (let i = 0; i < middleOfFile; i++) {
    const firstHalf=data[i].split(':')[0];
    const secondHalf=data[i].split(' ')[1];
    wires.set(firstHalf, Number(secondHalf));
    equations.push([firstHalf, Number(secondHalf), null, null, null])
}

// Load the equations
// Structure: [ equations name, value of equations (not known yet), operator, first operand, second operand ]
for (let i = middleOfFile+1; i < data.length-1; i++) {
    const [operand1, operator, operand2, eq_name]=data[i].replace(' -> ',' ').split(' ');
    equations.push([eq_name, null, operator, operand1, operand2])
    unknownEquations+=1;
}

// Loop over the equations and check the ones without value and if both operands are know then calculate and store the value until no null value equation exist
while (unknownEquations!==0) {
    for (let i = 0; i < equations.length; i++) {
        if (equations[i][1]===null) {
            const operator=equations[i][2];
            const operand1=equations[i][3]
            const operand2=equations[i][4]

            if (wires.has(operand1) && wires.has(operand2)) {
                switch (operator) {
                    case 'AND':
                        equations[i][1]=wires.get(operand1) && wires.get(operand2);
                        wires.set(equations[i][0],equations[i][1]);
                        unknownEquations-=1;
                        break;
                
                    case 'OR':
                        equations[i][1]=wires.get(operand1) || wires.get(operand2);
                        wires.set(equations[i][0],equations[i][1]);
                        unknownEquations-=1;
                        break;
                
                    case 'XOR':
                        equations[i][1]=wires.get(operand1) ^ wires.get(operand2);
                        wires.set(equations[i][0],equations[i][1]);
                        unknownEquations-=1;
                        break;
                
                    default:
                        break;
                }
            }
        }
    }
}

// Create the binary result from the wires starting with z
const wiresSorted=[...wires.entries()].sort();
let binaryZWires=[];
for (let i = 0; i < wiresSorted.length; i++) {
    if (wiresSorted[i][0][0]==='z') {
        binaryZWires.push(wiresSorted[i][1]);
    }
}

console.log(parseInt(binaryZWires.reverse().join(''),2));
