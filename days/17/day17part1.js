#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

var data = readFileSync(fileToProcess.toString()).toString().split(EOL);

let Aregister=Number(data[0].split(' ')[2]);
let Bregister=Number(data[1].split(' ')[2]);
let Cregister=Number(data[2].split(' ')[2]);
let program=data[4].split(' ')[1].split(',').map(Number);
let instructionPointer=0;

console.log(Aregister);
console.log(Bregister);
console.log(Cregister);
console.log(program);

// Instructions
// The adv instruction (opcode 0) performs division. The numerator is the value in the A register. The denominator is found by raising 2 to the power of the instruction's combo operand. (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.) The result of the division operation is truncated to an integer and then written to the A register.
function adv(operand) {
    Aregister=Math.floor(Aregister/(2**operand));
    instructionPointer+=2;
}

// The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the instruction's literal operand, then stores the result in register B.
function bxl(operand) {
    Bregister=Bregister^operand;
    instructionPointer+=2;
}

// The bst instruction (opcode 2) calculates the value of its combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.
function bst(operand) {
    Bregister=operand%8;
    instructionPointer+=2;
}

// The jnz instruction (opcode 3) does nothing if the A register is 0. However, if the A register is not zero, it jumps by setting the instruction pointer to the value of its literal operand; if this instruction jumps, the instruction pointer is not increased by 2 after this instruction.
function jnz(operand) {
    if (Aregister!=0) {
        instructionPointer=operand;
    } else {
        instructionPointer+=2;
    }
}

// The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C, then stores the result in register B. (For legacy reasons, this instruction reads an operand but ignores it.)
function bxc(operand) {
    Bregister=Bregister^Cregister;
    instructionPointer+=2;
}

// The out instruction (opcode 5) calculates the value of its combo operand modulo 8, then outputs that value. (If a program outputs multiple values, they are separated by commas.)
function out(operand) {
    instructionPointer+=2;
    return operand%8;
}

// The bdv instruction (opcode 6) works exactly like the adv instruction except that the result is stored in the B register. (The numerator is still read from the A register.)
function bdv(operand) {
    Bregister=Math.floor(Aregister/(2**operand));
    instructionPointer+=2;
}

// The cdv instruction (opcode 7) works exactly like the adv instruction except that the result is stored in the C register. (The numerator is still read from the A register.)
function cdv(operand) {
    Cregister=Math.floor(Aregister/(2**operand));
    instructionPointer+=2;
}


let output=[];
while (instructionPointer<program.length) {
    let instruction=program[instructionPointer];
    let whileOperand=null;
    switch (program[instructionPointer+1]) {
        case 0:
        case 1:
        case 2:
        case 3:
            whileOperand=program[instructionPointer+1];
            break;
    
        case 4:
            whileOperand=Aregister;
            break;
    
        case 5:
            whileOperand=Bregister;
            break;
    
        case 6:
            whileOperand=Cregister;
            break;

        default:
            break;
    }

    switch (instruction) {
        case 0:
            adv(whileOperand);
            break;

        case 1:
            bxl(whileOperand);
            break;

        case 2:
            bst(whileOperand);
            break;

        case 3:
            jnz(whileOperand);
            break;

        case 4:
            bxc(whileOperand);
            break;

        case 5:
            output.push(out(whileOperand));
            break;

        case 6:
            bdv(whileOperand);
            break;

        case 7:
            cdv(whileOperand);
            break;

        default:
            break;
    }
}

console.log(output.join(','));
