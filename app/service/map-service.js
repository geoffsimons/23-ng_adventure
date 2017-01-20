'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.factory('mapService', ['$log', mapService]);

function mapService($log) {
  $log.debug('mapService()');

  let service = {};

  service.mapData = require('../data/map.json');

  service.getRoom = function(x,y) {
    return service.mapData[`${x},${y}`];
  };

  return service;
}
