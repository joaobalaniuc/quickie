

$(document).ready(function () {

    sessionStorage.removeItem("old_data_show");
    sessionStorage.removeItem("old_locId");

    //=====================================
    // LAYOUT FUNCTIONS
    //=====================================
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

        facebookConnectPlugin.api("/me/?fields=id,email,first_name,last_name,gender,picture,birthday,about,bio", ["user_birthday"],
                function (result) {
                    alert("Result: " + JSON.stringify(result));
                },
                function (error) {
                    alert("Failed: " + error);
                });
    });
    //=====================================
    // SHOW INLINE PAGES
    //=====================================
    $('[data-show]').click(function () {
        var id = $(this).attr("data-show");
        datashow(id);
    });
    function datashow(id) {
        if (sessionStorage.old_data_show !== id) {
            sessionStorage.old_data_show = id;
            setTimeout(function () {
                $('.data-show').hide();
                $('.data-show[data-show-id=' + id + ']').fadeIn("fast");
            }, 100);
        }
    }

    // =======================================================
    // TIMER CHECK
    // =======================================================
    check();
    setInterval(function () {
        check();
    }, 500);

    function check() {
        // HOUVE ALTERAÇÃO NO LOCAL
        if (sessionStorage.old_locId !== sessionStorage.locId) {
            
            sessionStorage.old_locId = sessionStorage.locId;

            // ENCONTROU LOCAL
            if (sessionStorage.locId) {

                //myApp.showIndicator();

                $.ajax({
                    url: localStorage.server + "/getlocal.json.php",
                    data: {
                        'id': sessionStorage.locId
                    },
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    timeout: 5000
                })
                        .always(function () {
                            //s.removeItem(fN); // halt
                            //myApp.hideIndicator();
                        })
                        .fail(function () {
                            //myApp.alert('Desculpe, verifique sua conexão e tente novamente.', 'Erro');
                        })
                        .done(function (res) {
                            if (res !== null) {
                                if (res.error) {
                                    //myApp.alert('Desculpe, ocorreu um erro interno.' + res.error, 'Erro');
                                    return;
                                }
                                if (typeof res.length !== "undefined") {
                                    console.log(res.length + " results");
                                }
                                sessionStorage.locId = res[0].id;
                                sessionStorage.locLabel = res[0].label;
                                sessionStorage.locName = res[0].name;
                                sessionStorage.locLogo = res[0].img_logo;

                                $('#locLogo').attr("src", sessionStorage.locLogo);
                                datashow("login");

                                facebookConnectPlugin.getLoginStatus(function (response) {
                                    if (response.status === 'connected') {
                                        var uid = response.authResponse.userID;
                                        var accessToken = response.authResponse.accessToken;
                                        window.location.href = "quickie.html";
                                    } else if (response.status === 'not_authorized') {
                                        alert("NOT AUTH");
                                    } else {
                                        alert("NOG LOGGED");
                                    }
                                });
                                
                            } // res not null
                        }); // after ajax
            }
            // SEM LOCAL
            else {
                datashow("searching");
            }
        }
    }

//=====================================
// AJAX FORM
//=====================================
    /*$.validate();
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
     $('form').submit(function (e) {
     e.preventDefault();
     var data = $(this).serializeFormJSON();
     console.log(data);
     });
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
     */
});
//=======================================
// EFFECTS => AFTER ENTIRE PAGE LOAD
//=======================================
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
    // bkg effect functions
    function start(i, c) {
        var delay = 1000;
        var color = c[i];
        //console.log(color + "(" + i + ")");
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
