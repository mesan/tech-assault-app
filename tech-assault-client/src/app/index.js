'use strict';
/*jshint esnext: true */
/* @ngInject */

import mainController from './main/main.controller';
import highscoreController from './highscore/highscore';
import playController from './play/play';

angular
    .module('techAssult', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap'])

    .controller('mainController', mainController)
    .controller('highscoreController', highscoreController)
    .controller('playController', playController)


    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'mainController as vm'
          })
          .state('highscore', {
              url: '/highscore',
              templateUrl: 'app/highscore/highscore.html',
              controller: 'highscoreController as vm'
          })
          .state('play', {
              url: '/play',
              templateUrl: 'app/play/play.html',
              controller: 'playController as vm'
          })
        ;

        $urlRouterProvider.otherwise('/');
    })
;

