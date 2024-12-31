#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let map=[];
let position={height:-1, width:-1, direction: 'N'};

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);
let mapHeight=data.length;
let mapWidth=data[0].length;

let footsteps=[];
for (let i = 0; i < mapWidth; i++) {
  let temparr=[]
  for (let j = 0; j < mapHeight; j++) {
    temparr.push('.');
  }
  footsteps.push(temparr)
}

for (let i = 0; i < mapHeight; i++) {
    map.push(data[i].split(''));
    if (data[i].indexOf('^') !== -1) {
        position={height:i, width:data[i].indexOf('^'), direction: 'N'}
    }
    if (data[i].indexOf('>') !== -1) {
        position={height:i, width:data[i].indexOf('>'), direction: 'E'}
    }
    if (data[i].indexOf('v') !== -1) {
        position={height:i, width:data[i].indexOf('v'), direction: 'S'}
    }
    if (data[i].indexOf('<') !== -1) {
        position={height:i, width:data[i].indexOf('<'), direction: 'W'}
    }
}

footsteps[position.height][position.width]='X';

let inTheMap=true
let nextStepHeight=-1
let nextStepWidth=-1

while (inTheMap) {
    switch (position.direction) {
        case 'N':
            nextStepHeight=position.height-1;
            nextStepWidth=position.width;
            if (nextStepHeight < 0)
                {inTheMap=false}
            else {
                if (map[nextStepHeight][position.width]==='#')
                    {
                        position.direction='E';
                    }
                else {
                    position.height=nextStepHeight;
                    footsteps[position.height][position.width]='X';
                }
            }
            break;
        case 'E':
            nextStepHeight=position.height;
            nextStepWidth=position.width+1;
            if (nextStepWidth >= mapWidth)
                {inTheMap=false}
            else {
                if (map[position.height][nextStepWidth]==='#')
                    {
                        position.direction='S';
                    }
                else {
                    position.width=nextStepWidth;
                    footsteps[position.height][position.width]='X';
                }
            }
            break;
        case 'S':
            nextStepHeight=position.height+1;
            nextStepWidth=position.width;
            if (nextStepHeight >= mapHeight)
                {inTheMap=false}
            else {
                if (map[nextStepHeight][position.width]==='#')
                    {
                        position.direction='W';
                    }
                else {
                    position.height=nextStepHeight;
                    footsteps[position.height][position.width]='X';
                }
            }
            break;
        case 'W':
            nextStepHeight=position.height;
            nextStepWidth=position.width-1;
            if (nextStepWidth < 0)
                {inTheMap=false}
            else {
                if (map[position.height][nextStepWidth]==='#')
                    {
                        position.direction='N';
                    }
                else {
                    position.width=nextStepWidth;
                    footsteps[position.height][position.width]='X';
                }
            }
            break;
        default:
            break;
    }
}

console.log(footsteps.join('').split('X').length-1);
