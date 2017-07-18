'use strict';

require('./scss/main.scss');

const angular = require('angular');

angular.module('mazeRace', []);

require('./service/map-service.js');
require('./service/player-service.js');
require('./service/message-service.js');

require('./component/room/room.js');
require('./component/player-info/player-info.js');
require('./component/game-pad/game-pad.js');
require('./component/game-grid/game-grid.js');
require('./component/messages/messages.js');
