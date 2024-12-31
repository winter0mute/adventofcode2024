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

// console.log(wires);
// console.log(equations);

// Load the equations
// Structure: [ equations name, value of equations (not known yet), operator, first operand, second operand ]
for (let i = middleOfFile+1; i < data.length-1; i++) {
    // pageSequences.push(data[i].split(','));
    // console.log(data[i]);
    // console.log(data[i].replace(' -> ',' ').split(' '));
    const [operand1, operator, operand2, eq_name]=data[i].replace(' -> ',' ').split(' ');
    // console.log(eq_name);
    equations.push([eq_name, null, operator, operand1, operand2])
    unknownEquations+=1;
}

// console.log(equations);
// console.log(unknownEquations);

// Loop over the equations and check the ones without value and if both operands are know then calculate and store the value until no null value equation exist
while (unknownEquations!==0) {
    // console.log(unknownEquations);
    // console.log('============');
    
    for (let i = 0; i < equations.length; i++) {
        if (equations[i][1]===null) {
            const operator=equations[i][2];
            const operand1=equations[i][3]
            const operand2=equations[i][4]
            // console.log('---------------------');
            // console.log('eq: '+equations[i][0]);
            // console.log('value: '+equations[i][1]);
            // console.log('operator: '+operator);
            // console.log('operand1: '+operand1);
            // console.log('operand2: '+operand2);
            
            if (wires.has(operand1) && wires.has(operand2)) {
                // console.log('+++++++++++FOUND+++++++++++');
                switch (operator) {
                    case 'AND':
                        // console.log('ANDDD: '+wires.get(operand1) && wires.get(operand2));

                        equations[i][1]=wires.get(operand1) && wires.get(operand2);
                        wires.set(equations[i][0],equations[i][1]);
                        // console.log('equations[i][0]: '+equations[i][0]);
                        // console.log('equations[i][1]: '+equations[i][1]);
                        unknownEquations-=1;
                        break;
                
                    case 'OR':
                        // console.log('ORRR: '+wires.get(operand1) || wires.get(operand2));
                        
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
            // console.log(equations);
            // console.log(wires);
        }
    }
}

// console.log(equations);
// console.log([...wires.entries()].sort());
const wiresSorted=[...wires.entries()].sort();
let binaryZWires=[];

// Create the binary result from the wires starting with z
for (let i = 0; i < wiresSorted.length; i++) {
    // console.log(wiresSorted[i][1]);
    // console.log(wiresSorted[i][0][0]);
    // console.log(wiresSorted[i][0]);
    if (wiresSorted[i][0][0]==='z') {
        binaryZWires.push(wiresSorted[i][1]);
    }
}

console.log(parseInt(binaryZWires.reverse().join(''),2));
