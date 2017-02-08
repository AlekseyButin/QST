/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    'jquery',
    'qst'
], function ($,QST) {
    
    var initialize = function () {
        var q_signup = document.getElementById("q_signup");
            /*$('#q-container').html('');
             $('#b-prev').hide();
             $('#b-next').hide();
             $('#b-complite').hide();*/
            var qst = {};
            if (q_signup !== undefined) {
                //H5F.setup(q_signup);
                qst = QST._initialize({
                    main_container: "qst-container",
                    q_container: "q-container",
                    q_signup: "q_signup",
                    tmp_dir: "js/libs/question/templates",
                    tmp_file: "gmq.xml",
                    root_url: "/qst/q/",
                    print_cmd: this.root_url + "print/",
                    gaSended: false,
                    pagesCount: 1,
                    complite_func: function (data) {
                        if (!this.gaSended) {
                            ga('send', 'event', {
                                eventAction: 'Complete',
                                eventCategory: 'Questionnaire',
                                eventValue: this.pagesCount, // количество страниц
                                eventLabel: '%s,%s'.format(app.patient.profile.FIO, document.referrer)	// 'ФИО,referrer_url'
                            });
                            this.gaSended = true;
                        }
                        var url = this.print_cmd + this.tmp_file;
                        window.open(url);
                        //   alert("QST.init"+JSON.stringify(data));
                    }
                });
            }
    };
   return {
        initialize: initialize
    };    
});
