'use strict';
/*jshint esnext: true */
/* @ngInject */

let highscoreController = function() {

  this.scores = [
    { name : 'Arne', score : 25},
    { name : 'Bjarne', score : 20},
    { name : 'Nils', score : 18},
    { name : 'Bjrate', score : 12},
    { name : 'Bjarte', score : 9}
  ];

};

export default highscoreController;
