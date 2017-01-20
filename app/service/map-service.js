'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.factory('mapService', ['$log', mapService]);

function mapService($log) {
  $log.debug('mapService()');

  let service = {};

  service.mapData = require('../data/map.json');

  //TODO: Do we need any other data or methods?

  return service;
}
