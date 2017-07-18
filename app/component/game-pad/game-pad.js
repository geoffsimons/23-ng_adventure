'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.component('gamePad', {
  template: require('./game-pad.html'),
  controller: 'GamePadController',
  controllerAs: 'gamePadCtrl'
});

mazeRace.controller('GamePadController', ['$log', 'playerService', GamePadController]);

function GamePadController($log, playerService) {
  $log.debug('GamePadController()');

  this.movePlayer = function(direction) {
    playerService.movePlayer(direction)
    .then( () => {
      $log.debug('moved towards:',direction);
    })
    .catch( err => {
      $log.error(err);
    });
  };
}
