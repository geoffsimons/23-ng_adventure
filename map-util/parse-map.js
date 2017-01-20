'use strict';

const fs = require('fs');
const filename = process.argv[2] || './map.txt';

const raw = fs.readFileSync(filename).toString();

//console.log(raw);

//Parse cells
const lines = raw.split('\n').filter( line => line.length > 0 );

//console.log(lines);
//console.log('lines.length:',lines.length);

let rows = (lines.length - 1) / 2;

//console.log('line.length:',lines[0].length);

let cols = (lines[0].length - 1) / 3;

console.log('map dimensions -> cols:', cols, 'rows:', rows);

let map = {};

for(let x = 0; x < cols; x++) {
  for(let y = 0; y < rows; y++) {
    let topIndex = y * 2;
    let botIndex = topIndex + 2;
    let midIndex = topIndex + 1;
    let topChar = lines[topIndex][(x * 3) + 1];
    let botChar = lines[botIndex][(x * 3) + 1];
    let leftChar = lines[midIndex][(x * 3)];
    let rightChar = lines[midIndex][(x * 3) + 3];
//    console.log(x,y,topChar,rightChar,botChar,leftChar);
    let walls = [];
    if(topChar   === '-') walls.push('top');
    if(rightChar === '|') walls.push('right');
    if(botChar   === '-') walls.push('bottom');
    if(leftChar  === '|') walls.push('left');
    let cell = {
      x,
      y,
      walls
    };
    map[`${x},${y}`] = cell;
  }
}

console.log(JSON.stringify(map,null,2));
