'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.factory('playerService', ['$q', '$log', 'mapService', playerService]);

function playerService($q, $log, mapService) {
  $log.debug('playerService()');

  let service = {};

  let player = service.player = {
    x: 0,
    y: 0,
    hp: 10
  };

  /** direction: top | right | bottom | left **/
  service.movePlayer = function(direction) {
    $log.debug('playerService.movePlayer()');
    return new $q( (resolve, reject) => {
      let room = mapService.getRoom(player.x, player.y);
      if(room.walls.indexOf(direction) !== -1) {
        //TODO: player.hp--
        return reject('Ran into a wall');
      }
      if(direction === 'top')    player.y--;
      if(direction === 'right')  player.x++;
      if(direction === 'bottom') player.y++;
      if(direction === 'left')   player.x--;

      //TODO: Q: Is there something more interesting to resolve?
      return resolve();
    });
  };

}
