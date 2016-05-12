//==============================================
// KONSOLE PLUGIN
//==============================================

taNoFim = 1; // scroll div

(function ($) {
    $.fn.kons = function (action) {
        if (typeof action === "undefined") {
            this.addClass("kons");
            this.after("<div class='kons-butt'><i class='fa fa-eye'></div>");
            this.append("<div class='kons-inner'></div>");
        }
    };
}(jQuery));
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function kons(str) {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    var time = h + ":" + m + ":" + s;
    $('.kons-inner').append("<div class='kons-log'>(" + time + ") " + str + "</div>");
    if (taNoFim > 0) {
        $('.kons-inner').scrollTop($('.kons-inner')[0].scrollHeight);
    }
}
$(document).ready(function () {

    $(document).on("click", ".kons-butt", function () {
        if ($('.kons').is(":visible")) {
            $('.kons').hide();
            $('.kons-butt').html("<i class='fa fa-eye'>");
        }
        else {
            $('.kons').show();
            $('.kons-butt').html("<i class='fa fa-times'>");
        }

    });
    $('#console').kons();

    $('.kons-inner').bind('scroll', chk_scroll);

    function chk_scroll(e) {
        var elem = $(e.currentTarget);
        if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {
            taNoFim = 1;
        }
        else {
            taNoFim = 0;
        }
    }

});