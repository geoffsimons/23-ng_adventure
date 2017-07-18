'use strict';

const fs = require('fs');
const filename = process.argv[2] || './map.txt';

const raw = fs.readFileSync(filename).toString();

//Parse cells
const lines = raw.split('\n').filter( line => line.length > 0 );

let rows = (lines.length - 1) / 2;

let cols = (lines[0].length - 1) / 3;

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

    let sides = {
      top:    'clear',
      right:  'clear',
      bottom: 'clear',
      left:   'clear'
    };

    if(topChar   === '-') sides.top    = 'wall';
    if(rightChar === '|') sides.right  = 'wall';
    if(botChar   === '-') sides.bottom = 'wall';
    if(leftChar  === '|') sides.left   = 'wall';

    if(topChar   === '$') sides.top    = 'door';
    if(rightChar === '$') sides.right  = 'door';
    if(botChar   === '$') sides.bottom = 'door';
    if(leftChar  === '$') sides.left   = 'door';
    let cell = {
      x,
      y,
      sides
    };
    let contentsChar = lines[midIndex][(x * 3) + 1];
    if(contentsChar !== ' ') cell.contents = contentsChar;

    map[`${x},${y}`] = cell;
  }
}

console.log(JSON.stringify(map,null,2));
