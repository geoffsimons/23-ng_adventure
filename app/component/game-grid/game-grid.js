'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.component('gameGrid', {
  template: require('./game-grid.html'),
  controller: 'GameGridController',
  controllerAs: 'gameGridCtrl'
});

mazeRace.controller('GameGridController', ['$log', 'playerService', 'mapService', GameGridController]);

function GameGridController($log, playerService, mapService) {
  $log.debug('GameGridController()');

  //TODO: Allow for different radius to be specified as a param.
  const radius = 1;
  const width = 2 * radius + 1;
  const height = 2 * radius + 1;

  let calls = 0;

  this.grid = [];
  for(let i = 0; i < height; i++) {
    this.grid.push([]); //Push an empty row.
  }

  this.player = playerService.player;

  this.getGrid = function() {
    $log.debug('gameGridCtrl.getGrid()', ++calls);
    let x = playerService.player.x;
    let y = playerService.player.y;

    let gx = Math.max(0, x - radius);
    let gy = Math.max(0, y - radius);

    gx = Math.min(gx, mapService.width - width);
    gy = Math.min(gy, mapService.height - height);

    $log.debug('map dims', mapService.width, mapService.height);
    $log.debug('grid dims', width, height);
    $log.debug('gx,gy',gx,gy);

    //TODO: There are bogus rooms showing up on the right side.

    // let grid = [];
    // this.grid.splice(0);
    for(let r = gy; r < gy + height; r++) {
      // let row = [];
      let row = this.grid[r - gy];
      row.splice(0);
      for(let c = gx; c < gx + width; c++) {
        row.push(mapService.getRoom(c,r));
      }
      // this.grid.push(row);
    }

    $log.debug(this.grid);
    return this.grid;
  };
}
