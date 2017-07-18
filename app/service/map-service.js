'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.factory('mapService', ['$log', mapService]);

function mapService($log) {
  $log.debug('mapService()');

  let service = {};

  //TODO: mapData can be private, exposed through getRoom.
  // service.mapData = require('../data/map.json');
  service.mapData = require('../data/map2.json');
  let maxX = 0;
  let maxY = 0;

  let keys = Object.keys(service.mapData);
  keys.forEach( key => {
    let coords = key.split(',');
    if(coords[0] > maxX) maxX = Number(coords[0]);
    if(coords[1] > maxY) maxY = Number(coords[1]);
  });

  $log.debug('mapService: maxX,maxY',maxX,maxY);

  service.width = maxX + 1;
  service.height = maxY + 1;

  service.getRoom = function(x,y) {
    return service.mapData[`${x},${y}`];
  };

  return service;
}
