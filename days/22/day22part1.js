#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let array=[];

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);

for (let i = 0; i < data.length; i++) {
    array.push(BigInt(data[i]));    
}

function mix(SecretNumberParam, ValueParam) {
    return SecretNumberParam^ValueParam;
}

function prune(SecretNumberParam) {
    return SecretNumberParam%BigInt(16777216);
}

function calculateSequence(SecretNumberParam) {
    let intermediateSecretNumber=prune(mix(SecretNumberParam,(SecretNumberParam*BigInt(64))));
    intermediateSecretNumber=prune(mix(intermediateSecretNumber/BigInt(32),intermediateSecretNumber));
    intermediateSecretNumber=prune(mix(intermediateSecretNumber*BigInt(2048),intermediateSecretNumber));
    return intermediateSecretNumber;
}

let sumOfSecrets=BigInt(0);

for (let i = 0; i < array.length; i++) {
    let secretNumberForArray=array[i];
    for (let j = 0; j < 2000; j++) {
        secretNumberForArray=calculateSequence(secretNumberForArray);
    }
    sumOfSecrets+=secretNumberForArray;
}

console.log(Number(sumOfSecrets));
