#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let array=[];
let endPositions=[];
const tilesTall=103;
const tilesWide=101;
const middleRow=(tilesTall-1)/2
const middleColumn=(tilesWide-1)/2
const numberOfIterations=100;
let q1=0;
let q2=0;
let q3=0;
let q4=0;

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);
// console.log(data);

for (let i = 0; i < data.length; i++) {
    let [py, px]=data[i].split(' ')[0].split('=')[1].split(',').map(Number);
    let [vy, vx]=data[i].split(' ')[1].split('=')[1].split(',').map(Number);
    array.push([px,py,vx,vy]);

}

// console.log(array);

for (let i = 0; i < array.length; i++) {
    // console.log(array[i]);
    let [px, py, vx, vy]=array[i];
    for (let j = 0; j < numberOfIterations; j++) {
        let newX=px+vx;
        if (newX<0) {
            newX+=tilesTall;
        } 
        if (newX>=tilesTall) {
            newX-=tilesTall;
        }
        px=newX;
        // console.log(px);
        let newY=py+vy;
        if (newY<0) {
            newY+=tilesWide;
        } 
        if (newY>=tilesWide) {
            newY-=tilesWide;
        }
        py=newY;
        // console.log(py);
        // console.log('px: '+px+' - py; '+py);
    }
    endPositions.push([px, py])
}

// console.log(endPositions);

for (let k = 0; k < endPositions.length; k++) {    
    // console.log(endPositions[k]);
    if (endPositions[k][0]<middleRow && endPositions[k][1]<middleColumn) {
        q1+=1;
        // console.log('q1: '+q1);
    }
    if (endPositions[k][0]>middleRow && endPositions[k][1]<middleColumn) {
        q2+=1;
        // console.log('q2: '+q2);
    }
    if (endPositions[k][0]<middleRow && endPositions[k][1]>middleColumn) {
        q3+=1;
        // console.log('q3: '+q3);
    }
    if (endPositions[k][0]>middleRow && endPositions[k][1]>middleColumn) {
        q4+=1;
        // console.log('q4: '+q4);
    }
}

console.log(q1*q2*q3*q4);
