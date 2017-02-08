/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/erroralerttemplate.html!strip'
], function ($, _, Backbone, errorAlertTemplate) {
    
   var ErrorDlg = Backbone.View.extend({
        template : _.template(errorAlertTemplate),
        
        initialize: function () {
        },
        events: {
            'hidden.bs.modal': 'close'
        },
        close: function () {
            this.unrender();
        },
        render: function (message) {
            var body=this.template({errortext: message}); 
            this.$el.replaceWith(body);
            this.setElement(body);
            $('body').append(this.el);
            $("#alertModal").modal('show');
        },
        unrender: function () {
            this.remove(); // this.$el.remove()
        }
        
    });

    var error = function (message) {
       var errorDlg=new ErrorDlg;
       errorDlg.render(message);
    };
    return {
       error:error 
    };
});


