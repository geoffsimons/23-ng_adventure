'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

//TODO: Refactor room -> cell
//TODO: ACTUALLY, not even using this module anymore.

mazeRace.component('room', {
  template: require('./room.html'),
  controller: 'RoomController',
  controllerAs: 'roomCtrl'
});

mazeRace.controller('RoomController', ['$log', 'playerService', 'mapService', RoomController]);

function RoomController($log, playerService, mapService) {
  $log.debug('RoomController()');

  //NOTE: Probably don't need to expose player on this.
  this.player = playerService.player;
  this.hasWall = function(side) {
    let room = mapService.getRoom(this.player.x, this.player.y);
    return room.walls.indexOf(side) !== -1;
  };
}
