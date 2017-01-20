'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.component('room', {
  template: require('./room.html'),
  controller: 'RoomController',
  controllerAs: 'roomCtrl'
});

mazeRace.controller('RoomController', ['$log', 'playerService', 'mapService', RoomController]);

function RoomController($log, playerService, mapService) {
  $log.debug('RoomController()');

  this.player = playerService.player;
  this.hasWall = function(side) {
    $log.debug('hasWall()',side);
    let room = mapService.getRoom(this.player.x, this.player.y);
    return room.walls.indexOf(side) !== -1;
  };
}
