'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.component('playerInfo', {
  template: require('./player-info.html'),
  controller: 'PlayerInfoController',
  controllerAs: 'playerInfoCtrl'
});

mazeRace.controller('PlayerInfoController', ['$log', 'playerService', PlayerInfoController]);

function PlayerInfoController($log, playerService) {
  $log.debug('PlayerInfoController()');
  this.player = playerService.player;
}
