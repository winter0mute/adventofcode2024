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

let mapOfKnownQuartetts=new Map();

for (let i = 0; i < array.length; i++) {
    let secretNumberForArray=array[i];
    let listOfChangesWithValues=[[Number(secretNumberForArray) % 10, 0]];
    let deltas=[];
    let reachedQuartetts = new Set();

    for (let j = 0; j < 2000; j++) {
        secretNumberForArray=calculateSequence(secretNumberForArray);
        const numberSecretNumberForArray=Number(secretNumberForArray);
        const delta=numberSecretNumberForArray % 10 - listOfChangesWithValues.at(-1)[0];
        listOfChangesWithValues.push([numberSecretNumberForArray % 10, delta]);
        deltas.push(delta);

        if (j>=3) {
            const testQuartett=deltas.slice(-4).join("");
            if (!reachedQuartetts.has(testQuartett)) {
				reachedQuartetts.add(testQuartett);
				mapOfKnownQuartetts.set(testQuartett, mapOfKnownQuartetts.get(testQuartett) + (numberSecretNumberForArray % 10) || numberSecretNumberForArray % 10);
			}   
        }   
    }
}

console.log(Math.max(...mapOfKnownQuartetts.values()));

