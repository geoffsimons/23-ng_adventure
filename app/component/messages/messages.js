'use strict';

const angular = require('angular');
const mazeRace = angular.module('mazeRace');

mazeRace.component('messages', {
  template: require('./messages.html'),
  controller: 'MessagesController',
  controllerAs: 'messagesCtrl'
});

mazeRace.controller('MessagesController', ['$log', 'messageService', MessagesController]);

function MessagesController($log, messageService) {
  $log.debug('MessagesController()');

  this.history = messageService.history;
}
