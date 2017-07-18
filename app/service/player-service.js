'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.factory('playerService',
  ['$q', '$log', 'mapService', 'messageService', playerService]);

function playerService($q, $log, mapService, messageService) {
  $log.debug('playerService()');

  let service = {};

  let player = service.player = {};

  service.startGame = function() {
    player.x = player.y = 0;
    player.hp = 10;
    player.items = [];
    let startRoom = _getRoom();
    startRoom.hasPlayer = true;
    messageService.add('your journey is just beginning');
  };

  service.startGame();

  /** direction: top | right | bottom | left **/
  service.movePlayer = function(direction) {
    $log.debug('playerService.movePlayer()');
    return new $q( (resolve, reject) => {
      let room = _getRoom();
      if(room.sides[direction] === 'wall') {
        player.hp--;
        messageService.add(`Ouch! hp is now ${player.hp}`);

        if(player.hp === 0) {
          messageService.add('You have lost all your health and died');
          delete room.hasPlayer;
          service.startGame();
          return resolve();
        }
        return reject('Ran into a wall');
      }

      if(room.sides[direction] === 'door') {
        if(player.items.indexOf('K') === -1) {
          messageService.add('Need key to go through doors');
          return reject('Need key to go through doors');
        }
        messageService.add('You have unlocked the door');
        $log.debug('Player had key to access door');
      }
      if(direction === 'top')    player.y--;
      if(direction === 'right')  player.x++;
      if(direction === 'bottom') player.y++;
      if(direction === 'left')   player.x--;
      delete room.hasPlayer;

      room = _getRoom();
      room.hasPlayer = true;

      //Right now, only the sword can be picked up.
      if(room.contents && room.contents === 'S') {
        messageService.add('Whoo-hoo, you found the sword');
        player.items.push(room.contents);
        delete room.contents;
      }

      if(room.contents && room.contents === 'D') {
        if(player.items.indexOf('S') === -1) {
          delete room.hasPlayer;
          messageService.add('You died. Go find the sword next time');
          service.startGame();
          return resolve();
        }
        messageService.add('You have vanquished the dragon!');
        delete room.contents;
        player.items.push('K'); // Dragon had the key
      }

      if(room.contents && room.contents === 'E') {
        messageService.add('HURRAY! You have won the game!');
        //TODO: Allow the user to play again?
      }
      return resolve();
    });
  };

  function _getRoom() {
    return mapService.getRoom(player.x, player.y);
  }

  return service;
}
