/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'underscore', 'hf5'], factory);
    } else {
        console.log("NOT RJS");
        console.log(root);
        root.QST = factory($, _, H5F);
        xxx = root;
    }
}(this, function ($, _, H5F) {
    var QST = {
        d: document,
        q_name: "q_name",
        q_multi_choice: "q-multi-choice",
        q_radio: "q-radio",
        q_checkbox: " q-checkbox",
        q_number: "q-number",
        q_text: "q-text",
        q_textarea: "q-textarea",
        q_label: "q-label",
        qst_progress_bar: "qst-progress-bar",
        b_prev: "b-prev",
        b_next: "b-next",
        b_complite: "b-complite",
        b_save: "b-save",
        b_print: "b-print",
        root_url: "/qst/q/",
        url_template: "/qst/q/" + "next/",
        print_cmd: "/qst/q/" + "print/",
        param_template: "reload=true",
        tmp_dir: 'templates',
        tmp_file: '',
        main_container: 'qst-container',
        logo_container: 'logo-container',
        logo_content: '',
        header_container: 'header-container',
        header_content: '',
        footer_container: 'footer-container',
        footer_content: '',
        q_container: 'q-container',
        q_signup: "q_signup",
        //   q_report_body: "q_report_body",
        callback: '',
        pagesCount: 0,
        gaSended: false,
        gaUnloadSended: false,
        page_current: -1,
        page_size: 0,
        _initialize: function (conf) {
            var ctx = {
                logo_container: conf.logo_container,
                logo_content: conf.logo_content,
                header_container: conf.header_container,
                header_content: conf.header_content,
                footer_container: conf.footer_container,
                footer_content: conf.footer_content,
                main_container: conf.main_container,
                q_container: conf.q_container,
                q_signup: conf.q_signup,
                q_report_body: conf.q_report_body

            };

            if (conf.main_container !== undefined) {
                this.main_container = $('#' + conf.main_container);
            }
            ;

            var q_c = $('#' + conf.q_container),
                    q_s = $('#' + conf.q_signup);
            // Add container HTML to BODY
            var self = this;
            if (q_c.length === 0 || q_s.length === 0) {
                self._create_body(ctx);
            }
            ;


            if (conf.q_container !== undefined) {
                this.q_container = $('#' + conf.q_container);
            }
            if (conf.q_signup !== undefined) {
                this.q_signup = $('#' + conf.q_signup);
            }
            if (conf.q_report_body !== undefined) {
                this.q_report_body = $('#' + conf.q_report_body);
            }
            if (conf.qst_progress_bar !== undefined) {
                this.qst_progress_bar = $('#' + conf.qst_progress_bar);
            }

            if (conf.multi_choice !== undefined) {
                this.q_multi_choice = conf.multi_choice;
            }

            if (conf.tmp_dir !== undefined) {
                this.tmp_dir = conf.tmp_dir;
            }
            if (conf.root_url !== undefined) {
                this.root_url = conf.root_url;
                this.url_template = this.root_url + "next/";
            }
            if (conf.print_cmd !== undefined) {
                //this.print_cmd = conf.print_cmd;
                this.print_cmd = this.root_url + "print/";
            }
            if (conf.tmp_file !== undefined) {
                this.tmp_file = conf.tmp_file;
            }

            if (this.q_container !== undefined && this.tmp_file !== undefined && this.tmp_file.length > 0 && this.q_signup !== undefined) {
                this._open_template(this.tmp_file);
            }
            if (this.q_signup !== undefined) {
                this._qst_submit(this.q_signup.attr("id"));
            }

            if (conf.callback !== undefined) {
                this.callback = conf.callback;
            }
            if (conf.gaSended !== undefined) {
                this.gaSended = conf.gaSended;
            } else {
                this.gaSended = false;
            }

            if (conf.pagesCount !== undefined) {
                this.pagesCount = conf.pagesCount;
            } else {
                this.pagesCount = 1;
            }
            // Save and complite questionnaire
            if (conf._complite_func !== undefined) {
                this._complite_func = conf._complite_func;
            } else {
                this._complite_func = function (jsondata) {
                    if (jsondata !== undefined) {
                        alert("callback is undefined!");
                    }
                };
            }
            // Only save as template questionnaire
            if (conf._save_func !== undefined) {
                this._save_func = conf._save_func;
            } else {
                this._save_func = function (jsondata) {
                    if (jsondata !== undefined) {
                        alert("callback is undefined!");
                    }
                };
            }
            
            if (this.gaUnloadSended) {
                return;
            }
            ;
            this._sendGA();

            H5F.setup(this.q_signup);
            return this;
        },
        _sendGA: function () {
            /*console.log(window.location.pathname);
             var pageurl = '%spage-%s'.format(window.location.pathname, this.pagesCount);
             ga('send', 'pageview', pageurl);
             console.log('GA sended');*/
            this.gaUnloadSended = true;
        },
        _complite_func: function () {

        },
        _save_func: function () {

        },
        _create_body: function (data) {
            var self = this;

            var result_html = "";
            //result_html += self._create_header(data);
            result_html += self._create_content(data);

            self.main_container.html(result_html);
            var result_footer = self._create_footer(data);

            self.main_container.after(result_footer);

        },
        _create_layout: function (data) {
            // TO DO Возможно получить строку layout из вне 
            // вопрос про ID см _.uniqueId([prefix]) 
            //var main = _.template('<div id="<%= main_container%>" class="layout_ccol container-fluid"></div>')(data);
            var main = _.template('<div id="<%= main_container%>" class=""></div>')(data);
            return main;
        },
        _create_header: function (data) {
            var header = _.template(
                    '<div id="<%= header_container%>" class="text-center col-md-12"><%= header_content%></div>')(data);
            return header;
        },
        _create_content: function (data) {
            var content = _.template(
                    '<div class="container">' +
                    //'<div class="page-header">' +
                    '<form id="<%= q_signup%>" class="content-box">' +
                    //'<fieldset>' +
                    '<div id="<%= q_container%>" class="main-group container">' +
                    '</div>' +
                    //'</fieldset>' +
                    '</form>' +
                    //'</div>' +
                    '</div>' +
                    '<section id="<%= q_report_body%>"></section>' +
                    '<section class="qst-table-body"></section>'
                    )(data);
            return content;
        },
        _create_footer: function (data) {
            var footer = _.template('<footer id="<%= footer_container%>" class="footer">' +
                    '<div id="qst-progress-bar" class="progress progress-striped" style="display: none">' +
                    '<div class="progress-bar" style="width: 60%;">' +
                    '<span class="sr-only">Завершено 60%</span>' +
                    '</div>' +
                    '</div>' +
                    //'</div>' +
                    '<div class="actions">' +
                    '<div class="row">' +
                    '<div class="text-center">' +
                    '<button id="b-prev" type="submit" form="<%= q_signup%>" class="btn-qst btn waves-effect waves-light btn-round btn-primary start" style="display: none">' +
                    'Назад' +
                    '</button>' +
                    '<button id="b-next" type="submit" form="<%= q_signup%>" class="btn-qst btn waves-effect waves-light btn-round btn-primary start"  style="display: none">' +
                    'Далее' +
                    '</button>' +
                    '<button id="b-save" type="submit" form="<%= q_signup%>" class="btn-qst btn waves-effect waves-light btn-round btn-primary start" >' +
                    'Сохранить как черновик' +
                    '</button>' +
                    '<button id="b-complite" type="submit" form="<%= q_signup%>" class="btn-qst btn waves-effect waves-light btn-round btn-primary start" style="display: none">' +
                    'Завершить' +
                    '</button>' +
                    '<button id="b-cancel" class="btn-qst btn waves-effect waves-light btn-round btn-primary" data-dismiss="modal" aria-hidden="true" style="display: none">' +
                    'Отменить' +
                    '</button>' +
                    '<button id="b-print" type="submit" form="<%= q_signup%>" class="btn-qst btn waves-effect waves-light btn-round btn-primary start" style="display: none">' +
                    'Печать' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</footer>')(data);

            return footer;
        },
        _open_template: function (file, optdata) {

            var self = this;
            var url = self.url_template,
                    param = self.param_template;
            console.log("_open_template self.page_current->" + self.page_current);
            if (self.page_current >= 0) {
                param = param.replace("reload=true", "");
            }
            url += file;
            var nextUrl = url.replace("?reload=true", ""),
                    prevUrl = nextUrl.replace("/next/", "/prev/"),
                    saveUrl = nextUrl.replace("/next/", "/setdata/"),
                    compliteUrl = nextUrl.replace("/next/", "/complite/");

            $('#' + self.b_prev).attr("name", prevUrl);
            $('#' + self.b_next).attr("name", nextUrl);
            $('#' + self.b_save).attr("name", saveUrl);
            $('#' + self.b_complite).attr("name", compliteUrl);
            var ajax_url = url + '?' + param + "&callback=" + self.callback;
            console.log("_open_template optdata-" + optdata);

            var errorCalback, jsondata;
            if (optdata) {
                errorCalback = optdata.error;
                jsondata = JSON.stringify(optdata.data);
            }
            console.log("_open_template jsondata-" + jsondata);
            $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: ajax_url,
                data: jsondata,
                dataType: 'json',
                async: false,
                success: function (data, status) {
                    self._create_container(data); // from script.js
                    self.tmp_file = file;
                    //self._qst_submit(self.q_signup.attr("id"));
                },
                error: function (data, status) {
                    if (errorCalback) {
                        errorCalback(data, status);
                    } else {
                        if (data.status === 500) {
                            alert("Ошибка загрузки шаблона!");
                        } else if (data.status === 404) {
                            alert("Страница не найдена!");
                        }
                    }
                }
            });
        },
        _qst_submit: function (id_signup) {
            console.log("_qst_submit ID FORM->=" + id_signup);
            var self = this;
            //$("#" + id_signup).submit(function (e) {
            $(".btn-qst").click(function (e) {
                e.preventDefault();

                // Get the button that was clicked       
                //var submit = $(this.id).context.activeElement;


                // You can get its name like this
                //alert(submit.name);
                // You can get its attributes like this too
                // 
                //var urlSrc = $(submit).prop("name");

                var urlSrc = $(e.target).attr("name");

                if (urlSrc) {
                    if (urlSrc.indexOf("next") >= 0) {
                        self.pagesCount++;
                    }
                    if (urlSrc.indexOf("prev") >= 0) {
                        self.pagesCount--;
                    }

                    var jsonObject = self._create_json();

                    if (urlSrc.indexOf("complite") >= 0) {
                        urlSrc = urlSrc + "?callback=" + self.callback;
                    }
                    if (urlSrc.indexOf("setdata") >= 0) {
                        urlSrc = urlSrc + "?callback=" + self.callback;
                    }
                    console.log("_qst_submit urlSrc->" + urlSrc);
                    $.ajax({
                        type: "POST",
                        contentType: 'application/json',
                        url: urlSrc,
                        data: jsonObject,
                        dataType: 'json',
                        async: false,
                        success: function (jsondata) {
                            if (urlSrc.indexOf("complite") >= 0) {
                                self._complite_func(jsondata);
                            }
                            if (urlSrc.indexOf("setdata") >= 0) {
                                self._save_func(jsondata);
                            }
                            self._create_container(jsondata);
                            return false;
                        }
                    });
                }
            });
        },
        _create_json: function () {
            //var js_obj = {plugin: 'jquery-json', version: 2.3};
            var main_obj = {};

            var multi_choice = $("." + this.q_multi_choice),
                    radio = $("." + this.q_radio),
                    number = $("." + this.q_number),
                    text = $("." + this.q_text),
                    textarea = $("." + this.q_textarea),
                    label = $("." + this.q_label),
                    result_json = "";

            multi_choice.each(function (i) {
                var root_id = '';
                if ($(this).attr("id") !== undefined) {
                    root_id = $(this).attr("id");
                    var arr = [];
                    var el_input = "input." + root_id;
                    $(el_input).each(function (j) {
                        if ($(this).prop("checked")) {
                            var id = $(this).attr("id");
                            arr.push(id);
                        }
                    });
                }
                main_obj[root_id] = arr;
                //var encode_json = JSON.stringify(main_obj);
            });

            radio.each(function (i) {
                var root_id = '';
                if ($(this).attr("id") !== undefined) {
                    root_id = $(this).attr("id");
                    var el_input = "input." + root_id, val_choice = "";
                    $(el_input).each(function (j) {
                        if ($(this).prop("checked")) {
                            val_choice = $(this).attr("id");
                        }
                    });
                }
                main_obj[root_id] = val_choice;
            });

            text.each(function (i) {
                var root_id = "", val_text = "";
                if ($(this).find("input") !== undefined) {
                    root_id = $(this).find("input").attr("id");
                    val_text = $(this).find("input").val();
                    main_obj[root_id] = val_text;
                }
            });

            textarea.each(function (i) {
                var root_id = "", val_text = "";
                if ($(this).find("textarea") !== undefined) {
                    root_id = $(this).find("textarea").attr("id");
                    val_text = $(this).find("textarea").val();
                    main_obj[root_id] = val_text;
                }
            });

            number.each(function (i) {
                var root_id = "", val_text = "";
                if ($(this).find("input") !== undefined) {
                    root_id = $(this).find("input").attr("id");
                    val_text = $(this).find("input").val();
                    main_obj[root_id] = val_text;
                }
            });
            label.each(function (i) {
                var root_id = "", val_text = "";
                if ($(this).find("input") !== undefined) {
                    root_id = $(this).find("input").attr("id");
                    val_text = $(this).find("input").val();
                    main_obj[root_id] = val_text;
                }
            });
            if (main_obj !== undefined) {
                result_json = JSON.stringify(main_obj);
            }
            return result_json;
        },
        _create_container: function (obJson) {
            console.log("_create_container obJson->" + JSON.stringify(obJson));

            var self = this;
            var htmlСontent = "", qname = "",
                    prev = false, next = false, complite = false,
                    page_current, page_size;

            if (obJson.success !== undefined) {
                qname = obJson.success.q_name;
                prev = obJson.success.prev;
                next = obJson.success.next;
                complite = obJson.success.complite;
                self.page_current = obJson.success.current;
                self.page_size = obJson.success.size;
            }

            var jsonView = obJson.success.view;
            if (jsonView === undefined) {
                return;
            }
            // -- Название Анкеты
            if (qname.length > 0) {
                htmlСontent += self._render(self.q_name, obJson.success);

            }
            // -- loop JSON array
            for (i = 0; i < jsonView.length; i++) {
                // Заголовок
                if (jsonView[i].xtype === self.q_label) {
                    htmlСontent += self._render(jsonView[i].xtype, jsonView[i]);
                }
                // ФИО
                if (jsonView[i].xtype === self.q_text) {
                    htmlСontent += self._render(jsonView[i].xtype, jsonView[i]);
                }
                // ФИО
                if (jsonView[i].xtype === self.q_textarea) {
                    htmlСontent += self._render(jsonView[i].xtype, jsonView[i]);
                }
                // Возраст
                if (jsonView[i].xtype === self.q_number) {
                    htmlСontent += self._render(jsonView[i].xtype, jsonView[i]);
                }
                //Checkbox
                if (jsonView[i].xtype === self.q_checkbox) {
                    htmlСontent += self._render(jsonView[i].xtype, jsonView[i]);
                }
                //Radio
                if (jsonView[i].xtype === self.q_radio) {
                    htmlСontent += self._render(jsonView[i].xtype, jsonView[i]);
                }
                //Multi-choice
                if (jsonView[i].xtype === self.q_multi_choice) {
                    htmlСontent += self._render(jsonView[i].xtype, jsonView[i]);
                }

            }
            if (self.q_report_body) {
                self.q_report_body.hide();
            }
            self.q_signup.show();
            self.q_container.html(htmlСontent); // populate container questionary
            self._set_button(prev, next, complite); // Set button <NEXT>, <PREV>, <COMPLITE>;
            var progres_val = self.page_size !== 0 ? (self.page_current + 1 === self.page_size ? 100 : self.page_current * 100 / self.page_size + 1) : 0;
            console.log("progres_val->" + progres_val);
            self._set_progress_bar(self.qst_progress_bar, progres_val, true);
            if ($(".modal").length > 0) {
                $("#b-cancel").show();
            }
        },
        _set_progress_bar: function (qst_progress, value, visibled) {
            var qst_prg = $("#" + qst_progress);
            var isHidden = qst_prg.is(':hidden');
            if (visibled && isHidden) {
                qst_prg.show();
            }
            qst_prg.find("div.progress-bar").width(value + '%');
        },
        _set_button: function (prev, next, complite) {
            var button_prev = $("#" + this.b_prev), button_next = $("#" + this.b_next),
                    button_save= $("#" + this.b_save),
                    button_complite = $("#" + this.b_complite), 
                    button_print = $("#" + this.b_print);

            button_prev.hide();
            button_next.hide();
            button_complite.hide();
            button_print.hide();
            
            button_save.show();

            if (prev) {
                button_prev.show();
            }
            if (next) {
                button_next.show();
            }
            if (complite) {
                button_complite.show();
            }
        },
        _render: function (tmpl_name, tmpl_data) {
            var self = this;
            if (!self._render.tmpl_cache) {
                self._render.tmpl_cache = {};
            }
            if (!self._render.tmpl_cache[tmpl_name]) {
                var tmpl_url = self.tmp_dir + '/' + tmpl_name + '.html';

                var tmpl_string;
                $.ajax({
                    url: tmpl_url,
                    method: 'GET',
                    async: false,
                    success: function (data) {
                        tmpl_string = data;
                    }
                });
                self._render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
            }

            return self._render.tmpl_cache[tmpl_name](tmpl_data);
        }
    };
    //QST.initialize();
    return function (options) {
        _.extend(this, QST);
        this._initialize.call(this, options);
    };
}));

