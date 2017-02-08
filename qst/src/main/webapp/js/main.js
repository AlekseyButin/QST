/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require.config({
  paths: {
    text:'libs/require/text',
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    bootstrap: 'libs/bootstrap/js/bootstrap',
    hf5:'libs/h5f/H5F',
    qst:'libs/question/js/QST'
    
  },
  shim: {
        'bootstrap':{deps: ['jquery']}
    }
});


require([
  // Load our app module and pass it to our definition function
  'app'
], function(App){
   App.initialize();
});

