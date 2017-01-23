'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.factory('messageService', ['$log', messageService]);

function messageService($log) {
  $log.debug('messageService()');

  let service = {};

  let n = 0;

  service.history = [];
  service.add = function(msg) {
    service.history.unshift({
      n: ++n,
      msg
    });
  };

  return service;
}
