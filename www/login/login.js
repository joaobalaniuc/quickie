

$(document).ready(function () {

    //$.validate();

    function getheight() {
        var d = document.documentElement;
        var b = document.body;
        var who = d.offsetHeight ? d : b;
        return Math.max(who.scrollHeight, who.offsetHeight);
    }
    function bkgSize() {
        var h = getheight();
        var wh = $(window).height();
        if (h > wh)
            $('.bkg').css("height", h + "px");
        else
            $('.bkg').css("height", "100%");
    }

    setTimeout(function () {
        bkgSize();
    }, 300);

    $('.but').click(function () {
        setTimeout(function () {
            bkgSize();
            $('input').val("");
        }, 300);
    });
    $('*').change(function () {
        setTimeout(function () {
            bkgSize();
        }, 300);
    });

    $('#facebook').click(function () {

        facebookConnectPlugin.api("<user-id>/?fields=id,email", ["user_birthday"],
                function (result) {
                    alert("Result: " + JSON.stringify(result));
                    /* alerts:
                     {
                     "id": "000000123456789",
                     "email": "myemail@example.com"
                     }
                     */
                },
                function (error) {
                    alert("Failed: " + error);
                });


        var fbLoginSuccess = function (userData) {
            alert("UserInfo: " + JSON.stringify(userData));

        };

        facebookConnectPlugin.login(["email", "user_birthday"],
                fbLoginSuccess,
                function (error) {
                    alert("" + error);
                }
        );
    });

    $('[ddata-show]').click(function () {
        var id = $(this).attr("data-show");
        setTimeout(function () {
            $('.data-show').hide();
            $('.data-show[data-show-id=' + id + ']').fadeIn("fast");
        }, 100);
    });

    $(function () {
        $.fn.serializeFormJSON = function () {

            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
    });
    /*
     $('form').submit(function (e) {
     e.preventDefault();
     var data = $(this).serializeFormJSON();
     console.log(data);
     });
     */
    $('#cadSubmit').click(function () {
        var x = $("#cadForm .error").length;
        if (x === 0) {
            var data = $("#cadForm").serializeFormJSON();

            if (data.username && data.email && data.password) {
                loading("globe", 1, false);
                $('.error-container').html("");
                console.log(data);
                $.ajax({
                    url: "http://localhost/mustard/server/register.json.php",
                    data: data,
                    type: 'POST',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    timeout: 10000
                })
                        .always(function () {
                            loadingHide();
                        })

                        .fail(function () {
                            console.log('Desculpe, verifique sua conexão e tente novamente.');
                        })

                        .done(function (res) {
                            console.log(res);
                            if (res !== null) {
                                if (res.error === 1) {
                                    $('#error-username').html("<span><i class='fa fa-angle-right'></i> ESTE USUÁRIO JÁ ESTÁ CADASTRADO</span>");
                                    console.log('Usuário já existe.');
                                    return;
                                }
                                if (res.error === 2) {
                                    $('#error-email').html("<span><i class='fa fa-angle-right'></i> ESTE E-MAIL JÁ ESTÁ CADASTRADO</span>");
                                    console.log('E-mail já existe.');
                                    return;
                                }
                                if (res.error === 3) {
                                    console.log('Ocorreu um erro desconhecido.');
                                    return;
                                }
                                if (res.success === 1) {
                                    console.log("OK");
                                    return;
                                }


                            } // res not null
                        }); // after ajax
            }
        }
    });
});
$(window).on("load", function () {

    loadingHide();

    // =======================================================
    // 
    // COLOR BACKGROUND
    // 
    // =======================================================
    // array colors
    var c = [
        "#ff0024", // verm
        //"#ff004e", // rosa
        //"#ff3600", // laranja
        "#6600ff"
                /*
                 "#0050c8", //azul
                 "#6000ff", //roxo
                 "#60ff00", //verde
                 "#ff8400", //laranja
                 "#ffc600", //amarelo
                 "#ce1348" //rosa*/
    ];
    // random colors
    shuffle(c);
    var color = c[Math.floor(Math.random() * c.length)];
    $(".but").css("color", color);
    $(".but i").css("color", color);
    $(".bkg").css("background", color);
    start(0, c);
    function start(i, c) {

        var delay = 1000;

        var color = c[i];
        console.log(color + "(" + i + ")");

        // next color
        if (i === parseInt(c.length - 1))
            i = 0;
        else
            i++;

        $(".but").animate({
            color: color
        }, delay);
        $(".but i").animate({
            color: color
        }, delay);

        $(".bkg").animate({
            backgroundColor: color
        }, delay, function () {
            start(i, c);
        });

    }
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
});
