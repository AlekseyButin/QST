/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    'jquery',
    //   'bootstrap',
    'backbone',
    'views/messagebox',
    'text!templates/loadtemplate.html!strip'
], function ($, Backbone, MessageBox, loadtemplateTemplate) {
    var LoadTemplateDlg = Backbone.View.extend({
        initialize: function () {
            this.render();
            //  this.form=this.$('form');
        },
        events: {
            'hidden.bs.modal': 'close',
            'click #bt_save_modal': 'load'
        },
        close: function () {
            this.unrender();
        },
        validateForm: function () {
            var valid = true;
            var file = $('#template-name');


            file.tooltip('destroy');
            var formGroup = file.parents('.form-group');
           // var label = formGroup.find('label').text().toLowerCase();
            var textError = 'Введите имя шаблона';

            var val = file.val();
            if (val.length === 0) {
                formGroup.addClass('has-error').removeClass('has-success');
                file.tooltip({
                    trigger: 'manual',
                    placement: 'right',
                    title: textError
                }).tooltip('show');
                valid = false;
            } else {
                formGroup.addClass('has-success').removeClass('has-error');
            }
            return valid;
        },
        load: function () {
            var file = $('#template-name').val();
            if (this.validateForm()) {
               $("#myModal").modal('hide');
               MessageBox.error("Не удалось загрузить шаблон '" + file + "'");
            }
        },
        render: function () {
            this.$el.replaceWith(loadtemplateTemplate);
            this.setElement(loadtemplateTemplate);
            var x = this.el;
            $('body').append(this.el);
            $("#myModal").modal('show');
            return this;

        },
        unrender: function () {
            this.remove(); // this.$el.remove()
        }
    });
    return LoadTemplateDlg;
});


