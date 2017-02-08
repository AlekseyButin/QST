/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'jquery',
   // 'bootstrap',
    'backbone',
    'views/loadtemplate',
    'text!templates/navbar.html!strip'
], function ($,  Backbone,LoadTemplate, navbarTemplate) {
    var NavBar = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        
        events: {
          'click #btn_loadtemplate': 'loadTemplate'
        },
        
        loadTemplate:function(){
         console.log("load");  
         new LoadTemplate;
       },
        
        render: function () {
            var template = navbarTemplate;
//	    this.$el.html( template );	// but i have div
            this.$el.replaceWith(template);
            this.setElement(template);
            var x=this.el;
            $('body').append(x);
            return this;
        }

    });
    return NavBar;
});

