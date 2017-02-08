/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    'jquery',
    'bootstrap',
    'text!templates/navbar.html!strip'
], function ($,bootstrap,navbar) {

    var initialize = function () {
        console.log(navbar);
        $('body').append(navbar); 
               // html(navbar);
    };
   return {
        initialize: initialize
    };    
});
