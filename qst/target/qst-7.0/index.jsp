<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="js/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <script type="text/javascript" src="js/libs/jquery/jquery-min.js"></script>
        <script type="text/javascript" src="js/libs/bootstrap/js/bootstrap.js"></script>

        <script type="text/javascript" src="js/libs/underscore/underscore.js"></script>
        <script type="text/javascript" src="js/libs/h5f/H5F.js"></script>

        <script type="text/javascript" src="js/libs/question/js/QST.js"></script>


    </head>
    <body>
    <style>
        body { 
            font-family: "Exo2 Light",sans-serif;
        }
        #q_signup div.group-btn, #q_signup div.progress {
            display: block;
            text-align: center;
            margin: 20px auto;
        }
    </style>    
    <!-- Google Analytics -->
    <script>
        (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        if (location.hostname === "my.medcarta24.ru") {
        ga('create', 'UA-74438848-1', 'auto');
        } else if (location.hostname === "support.medcarta24.ru") {
        ga('create', 'UA-74438046-1', 'auto');
        }
    </script>
    <script type="text/javascript">
        window.onload = function () {
        qst = new QST({
                main_container: "qst-container",
                q_container: "q-container",
                q_signup: "q_signup",
                tmp_dir: "js/libs/question/templates",
                tmp_file: "gmq.xml",
                root_url: "/qst/q/",
                print_cmd: this.root_url + "print/",
                gaSended: false,
                pagesCount: 1,
                _complite_func: function (data) {
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
    </script>
    <script type="text/javascript">

        $(document).on('click', "#qst_card_list div.col-md-20-persent div.panel  a", function () {
        var qst_file = $(this).attr('name');
        qst.tmp_file = qst_file;
        var opt_data = {
                data: {
                    gender: app.patient.profile.GENDER,
                    fio: app.patient.profile.FIO,
                    age: app.patient.profile.AGE
                },
                error: function () {
                    MessageBox.error("Не удалось загрузить шаблон '" + qst_file + "'");
                }
        };
        qst._open_template(qst.tmp_file, JSON.stringify(opt_data));
        });
    </script>
    <h1>Hello World!</h1>

    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <!--div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="dropdown dropdown-events">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Меню<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" name="http://localhost:8083/qui/q/next/test0.xml?reload=true">Пример01</a></li>
                            <li><a href="#" name="http://localhost:8083/qui/q/next/test02.xml?reload=true">Пример02</a></li>
                        </ul>
                    </li>
                </ul>
            </div--><!-- /.navbar-collapse -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#templateModal" data-whatever="@mdo">Загрузить</button>
            <button type="button" id="callanswer" class="btn btn-primary"   data-whatever="@mdo">Результат</button>

        </div><!-- /.container-fluid -->
    </nav>
    <div id="qst-container" class="layout_ccol container-fluid"></div>
    <!--div id="qst-container" class="layout_ccol">
        <section class="panel mainpage-graphs">
            <header class="panel-heading"><a href="javascript:void(0);" onclick="loadPage('health_card');
                return false;">Карта здоровья</a> &gt; Анкеты </header>
            <div class="panel-body pn-0"> </div>
        </section>
        <section class="qst-card-list">
            <div id="qst_card_list" class="col-md-12" style="display: block;">
               
            </div>
        </section>

        <form id="q_signup" class="content-box">
            <fieldset>

                <ol id="q-container" class="main-group">
                </ol>
            </fieldset>
            <fieldset>
                <div class="group-btn">
                    <div id="qst-progress-bar" class="progress progress-striped" hidden>
                        <div class="progress-bar" style="width: 60%;">
                            <span class="sr-only">Завершено 60%</span>
                        </div>
                    </div>
                    <button id="b-prev" type="submit" class="btn btn-round btn-primary start">
                        <span>Назад</span>
                    </button>
                    <button id="b-next" type="submit" class="btn btn-round btn-primary start">
                        <span>Далее</span>
                    </button>
                    <button id="b-complite" type="submit" class="btn btn-round btn-primary start">
                        
                        <span>Завершить</span>
                    </button>
                </div>
            </fieldset> 
        </form>  

    </div-->
</body>
</html>
