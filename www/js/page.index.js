
function getPeople() {
    //
    debug();
    //
    if (halt(true))
        return;
    var fN = fName();
    //
    if ($('.showProfile').length === 0) { // primeira vez
        $('#loadingPeople').show();
    }
    $.ajax({
        url: localStorage.server + "/getpeople.json.php",
        data: {
            'username': localStorage.username,
            'userpass': localStorage.userpass
        },
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        timeout: 10000
    })
            .always(function () {
                s.removeItem(fN); // halt
                $('#loadingPeople').hide();
            })

            .fail(function () {
                myApp.alert('Desculpe, verifique sua conexão e tente novamente.', 'Erro');
            })

            .done(function (res) {

                if (res !== null) {

                    if (res.error) {
                        myApp.alert('Desculpe, ocorreu um erro interno.' + res.error, 'Erro');
                        return;
                    }

                    if (typeof res.length !== "undefined") {
                        console.log(res.length + " results");
                    }

                    // construct
                    var x = 0;
                    var html = '<div class="row">';
                    $.each(res, function (i, item) {
                        //console.log(res[i].nome);
                        x++;
                        if (x === 3) {
                            html += '</div><div class="row">'; // row
                            x = 0;
                        }
                        var idade = getAge(res[i].data_nasc);
                        html += '<div class="showProfile online-block col-50" data-nome="' + res[i].nome + '" data-email="' + res[i].email + '" data-idade="' + idade + '" data-profissao="' + res[i].profissao + '" data-sobre="' + res[i].sobre + '" data-fb="' + res[i].fb_id + '">';
                        html += '<a href="#"><div class="online-border round">';
                        html += '<div class="online-img round" style="background-image:url(https://graph.facebook.com/' + res[i].fb_id + '/picture?type=large);">';
                        html += '</div>';
                        html += '</div>';
                        html += '<div>' + res[i].nome + ', ' + idade + '</div>';
                        html += '</a></div>';
                        if (res.length === parseInt(i + 1)) {
                            //console.log("aaa");
                            html += '</div>'; // row
                        }
                    });
                    $('#getPeople').html(html);

                } // res not null
            }); // after ajax
}

$$(document).on('click', '.showProfile', function (e) {
    sessionStorage.profileEmail = $(this).attr("data-email");
    sessionStorage.profileNome = $(this).attr("data-nome");
    sessionStorage.profileIdade = $(this).attr("data-idade");
    sessionStorage.profileProfissao = $(this).attr("data-profissao");
    sessionStorage.profileSobre = $(this).attr("data-sobre");
    sessionStorage.profileImg = "https://graph.facebook.com/" + $(this).attr("data-fb") + "/picture?type=large";
    mainView.router.loadPage('quickie_profile.html', {ignoreCache: true});
    //console.log(sessionStorage);
    //console.log(myApp.getCurrentView());
});

