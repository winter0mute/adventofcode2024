#!/usr/bin/env node
import { EOL } from 'os';
import { readFileSync } from 'fs';

var fileToProcess = process.argv.slice(2);

let labMap=[];
let origPosition={height:-1, width:-1, direction: 'N'};

var data = readFileSync(fileToProcess.toString()).toString().split(EOL).filter(n => n);
let mapHeight=data.length
let mapWidth=data[0].length


function drawLabMap(params) {
    for (let i = 0; i < params.length; i++) {
        console.log(params[i].join(''));
    }
}

let footsteps=[];
for (let i = 0; i < mapWidth; i++) {
  let temparr=[]
  for (let j = 0; j < mapHeight; j++) {
    temparr.push('.');
  }
  footsteps.push(temparr)
}

for (let i = 0; i < mapHeight; i++) {
    labMap.push(data[i].split(''));
    if (data[i].indexOf('^') !== -1) {
        origPosition={height:i, width:data[i].indexOf('^'), direction: 'N'}
    }
    if (data[i].indexOf('>') !== -1) {
        origPosition={height:i, width:data[i].indexOf('>'), direction: 'E'}
    }
    if (data[i].indexOf('v') !== -1) {
        origPosition={height:i, width:data[i].indexOf('v'), direction: 'S'}
    }
    if (data[i].indexOf('<') !== -1) {
        origPosition={height:i, width:data[i].indexOf('<'), direction: 'W'}
    }
}

let nextStepHeight=-1
let nextStepWidth=-1

footsteps[origPosition.height][origPosition.width]='X';
let loopCounter=0;
for (let i = 0; i < labMap.length; i++) {
    for (let j = 0; j < labMap[i].length; j++) {
        if (labMap[i][j]!='.') {
            continue;
        }
        let turns=new Set();
        let position={...origPosition};
        let inTheMap=true
        let alteredMap=[];
        alteredMap=JSON.parse(JSON.stringify(labMap));;
        alteredMap[i][j]='#';
        let isLoop=false;
        while (inTheMap && ! isLoop) {
            switch (position.direction) {
                case 'N':
                    nextStepHeight=position.height-1;
                    nextStepWidth=position.width;
                    if (nextStepHeight < 0)
                        {inTheMap=false}
                    else {
                        if (alteredMap[nextStepHeight][position.width]==='#')
                            {
                                position.direction='E';
                                const nextStep=position.height+'|'+position.width+'|'+position.direction;
                                if (turns.has(nextStep)) {
                                    isLoop=true;
                                } else {
                                    turns.add(nextStep);
                                }
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
                        if (alteredMap[position.height][nextStepWidth]==='#')
                            {
                                position.direction='S';
                                const nextStep=position.height+'|'+position.width+'|'+position.direction;
                                if (turns.has(nextStep)) {
                                    isLoop=true;
                                } else {
                                    turns.add(nextStep);
                                }
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
                        if (alteredMap[nextStepHeight][position.width]==='#')
                            {
                                position.direction='W';
                                const nextStep=position.height+'|'+position.width+'|'+position.direction;
                                if (turns.has(nextStep)) {
                                    isLoop=true;
                                } else {
                                    turns.add(nextStep);
                                }
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
                        if (alteredMap[position.height][nextStepWidth]==='#')
                            {
                                position.direction='N';
                                const nextStep=position.height+'|'+position.width+'|'+position.direction;
                                if (turns.has(nextStep)) {
                                    isLoop=true;
                                } else {
                                    turns.add(nextStep);
                                }
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
        if (isLoop) {
            loopCounter+=1;
        }
    }
}
console.log('loopCounter: '+loopCounter);
