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
    hp: 10,
    items: []
  };

  let startRoom = mapService.getRoom(player.x, player.y);
  startRoom.hasPlayer = true;

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
      delete room.hasPlayer;

      room = mapService.getRoom(player.x, player.y);
      room.hasPlayer = true;

      //Right now, only the sword can be picked up.
      if(room.contents && room.contents === 'S') {
        player.items.push(room.contents);
        delete room.contents;
      }

      if(room.contents && room.contents === 'D') {
        if(player.items.indexOf('S') !== -1) {
          //Player slays the dragon.
          delete room.contents;
          player.items.push('K'); // Dragon had the key
        }
        else {
          //Player is killed by the dragon.
          //TODO: How to notify the player that they died?
          player.x = 0;
          player.y = 0;
        }
      }

      //TODO: Q: Is there something more interesting to resolve?
      return resolve();
    });
  };

  return service;
}
