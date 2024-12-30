#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';
import { log } from 'console';

var fileToProcess = process.argv.slice(2);

var data = readFileSync(fileToProcess.toString()).toString().split(EOL);
// console.log(data);

function logWarehouseMap(params) {
    for (let i = 0; i < params.length; i++) {
        console.log(params[i].join(''));     
    }
}

function moveRobot(paramX, paramY) {
    warehouseMap[robotPosition[0]][robotPosition[1]]='.';
    robotPosition=[robotPosition[0]+paramX,robotPosition[1]+paramY];
    warehouseMap[robotPosition[0]][robotPosition[1]]='@';
}

let middleOfFile=data.indexOf('');

// Load the rules in a Map
let warehouseMap=[];
let robotPosition=[];
for (let i = 0; i < middleOfFile; i++) {
    // console.log(data[i]);
    warehouseMap.push(data[i].split(''))
    if (data[i].indexOf('@')!=-1) {
        console.log('Found in line '+i);
        robotPosition=[i,data[i].indexOf('@')];
    }
}
console.log('robotPosition: '+robotPosition);

// Change robot position to dot, we track it outside the map
// warehouseMap[robotPosition[0]][robotPosition[1]]='.';

logWarehouseMap(warehouseMap);

let moves=[];
// Load the page sequences into arrays of an array
for (let i = middleOfFile+1; i < data.length-1; i++) {
    moves.push(...data[i].split(''));
    // console.log('data[i]: '+data[i]);
    
}
// let moves=data[middleOfFile+1].split('');
// console.log(moves);

console.log('moves: '+moves.join(''));
console.log('number of moves: '+moves.join('').length);

for (let i = 0; i < moves.length; i++) {
    // console.log(moves[i]);
    console.log('robotPosition: '+robotPosition);
    // console.log(warehouseMap);
    
    switch (moves[i]) {
        case '<':
            console.log('LEFT');
            switch (warehouseMap[robotPosition[0]][robotPosition[1]-1]) {
                case '.':
                    moveRobot(0,-1);
                    break;
                
                case '#':
                    
                    break;

                case 'O':
                    console.log('!!!!!!!!!!Found Box!!!!!!!!!!');
                    
                    let lastWall=warehouseMap[robotPosition[0]].slice(0,robotPosition[1]-1).lastIndexOf('#');
                    let searchSegment=warehouseMap[robotPosition[0]].slice(0,robotPosition[1]).slice(lastWall,robotPosition[1]);
                    let nextEmptySpace=searchSegment.lastIndexOf('.');
                    let whereToPut=warehouseMap[robotPosition[0]].slice(0,robotPosition[1]-1).lastIndexOf('.');
                    console.log('lastWall: '+lastWall);
                    console.log('searchSegment: '+searchSegment.join(''));
                    console.log('nextEmptySpace: '+nextEmptySpace);
                    console.log('whereToPut: '+whereToPut);
                    
                    if (nextEmptySpace!=-1) {
                        // warehouseMap[robotPosition[0]][robotPosition[1]-1]='.';
                        warehouseMap[robotPosition[0]][whereToPut]='O';
                        moveRobot(0,-1);
                    }
                    break;
                default:
                    break;
            }    
            break;

        case '>':
            console.log('RIGHT');
            switch (warehouseMap[robotPosition[0]][robotPosition[1]+1]) {
                case '.':
                    moveRobot(0,1);
                    break;
                
                case '#':
                    
                    break;

                case 'O':
                    console.log('!!!!!!!!!!Found Box!!!!!!!!!!');
                    let firstWall=warehouseMap[robotPosition[0]].slice(robotPosition[1]).indexOf('#');;
                    let searchSegment=warehouseMap[robotPosition[0]].slice(robotPosition[1]).slice(0,firstWall);
                    let nextEmptySpace=searchSegment.indexOf('.');
                    
                    // console.log('RIGGGHT - : '+);
                    console.log('RIGGGHT - firstWall: '+firstWall);
                    console.log('RIGGGHT - searchSegment: '+searchSegment.join(''));
                    console.log('RIGGGHT - nextEmptySpace: '+nextEmptySpace);


                    // let nextEmptySpace=warehouseMap[robotPosition[0]].slice(robotPosition[1]+1).indexOf('.');
                    if (nextEmptySpace!=-1) {
                        // warehouseMap[robotPosition[0]][robotPosition[1]+1]='.';
                        warehouseMap[robotPosition[0]][robotPosition[1]+nextEmptySpace]='O';
                        moveRobot(0,1);
                    }
                    break;
                default:
                    break;
            }    
            break;

        case '^':
            console.log('UP');
            switch (warehouseMap[robotPosition[0]-1][robotPosition[1]]) {
                case '.':
                    // console.log('robotPosition[0]: '+robotPosition[0]);
                    // console.log('robotPosition[1]: '+robotPosition[1]);
                    
                    // console.log('Mageic1');
                    // console.log(warehouseMap);
                    // console.log('Mageic2');
                    
                    moveRobot(-1,0);

                    break;
                
                case '#':
                    
                    break;

                case 'O':
                    console.log('!!!!!!!!!!Found Box!!!!!!!!!!');
                    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    // console.log('++++++++++++++++++++++++LOOK HERE++++++++++++++++++++++++');
                    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    
                    let currentColumn=warehouseMap.map(function(value,index) { return value[robotPosition[1]]; });
                    let lastWall=currentColumn.slice(0,robotPosition[0]-1).lastIndexOf('#');
                    let searchSegment=currentColumn.slice(0,robotPosition[0]-1).slice(lastWall,robotPosition[0]);
                    let nextEmptySpace=searchSegment.lastIndexOf('.');
                    let whereToPut=currentColumn.slice(0,robotPosition[0]-1).lastIndexOf('.');

                    console.log('currentColumn: '+currentColumn.join(''));
                    console.log('lastWall: '+lastWall);
                    console.log('searchSegment: '+searchSegment.join(''));
                    console.log('nextEmptySpace: '+nextEmptySpace);
                    console.log('whereToPut: '+whereToPut);
                    
                    
                    if (nextEmptySpace!=-1) {
                        // warehouseMap[robotPosition[0]-1][robotPosition[1]]='.';
                        warehouseMap[whereToPut][robotPosition[1]]='O';
                        // console.log('nextEmptySpace - robotPosition[1]: '+nextEmptySpace+' - '+robotPosition[1]);
                        moveRobot(-1,0);
                    }
                    break;
                default:
                    break;
            }            
            break;

        case 'v':
            console.log('DOWN');
            switch (warehouseMap[robotPosition[0]+1][robotPosition[1]]) {
                case '.':
                    moveRobot(1,0);
                    break;
                
                case '#':
                    
                    break;

                case 'O':
                    console.log('!!!!!!!!!!Found Box!!!!!!!!!!');
                    console.log('DownBiatch');
                    
                    let currentColumn=warehouseMap.map(function(value,index) { return value[robotPosition[1]]; });
                    let firstWall=currentColumn.slice(robotPosition[0]+1).indexOf('#')
                    // let searchSegment=currentColumn.slice(robotPosition[0]+1).slice(firstWall,robotPosition[0]);
                    let searchSegment=currentColumn.slice(robotPosition[0]+1).slice(0,firstWall);
                    // let searchSegment=currentColumn.slice(robotPosition[0]+1);
                    let nextEmptySpace=searchSegment.indexOf('.');
                    let whereToPut=nextEmptySpace+robotPosition[0]+1;


                    console.log('currentColumn: '+currentColumn.join(''));
                    console.log('firstWall: '+firstWall);
                    console.log('searchSegment: '+searchSegment.join(''));
                    console.log('nextEmptySpace: '+nextEmptySpace);
                    console.log('whereToPut: '+whereToPut);
                    
                    if (nextEmptySpace!=-1) {
                        // warehouseMap[robotPosition[0]+1][robotPosition[1]]='.';
                        warehouseMap[whereToPut][robotPosition[1]]='O';
                        moveRobot(1,0);
                    }
                    break;
                default:
                    break;
            }    
            break;
    
        default:
            break;
    }  
    // console.log(warehouseMap);

    logWarehouseMap(warehouseMap);
    console.log('==========================END TURN==========================');
}


let gpsSum=0;
for (let i = 0; i < warehouseMap.length; i++) {
    for (let j = 0; j < warehouseMap[0].length; j++) {
        process.stdout.write(warehouseMap[i][j]);
        if (warehouseMap[i][j]==='O') {
            gpsSum+=i*100+j;
        }
    }
    console.log();
}

console.log(gpsSum);
