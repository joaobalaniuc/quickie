$(window).on("load", function () {
    loadingHide();
});
$(document).ready(function () {
    getSession();
    setInterval(function () {
        pageCheck();
    }, 300);

});
myApp.onPageInit('*', function (page) {
});
function pageRefresh() {
    var page = myApp.getCurrentView().activePage.name;
    var view = myApp.getCurrentView().container.id;
    var t = 0;
    // mulheres
    if (page === "index") {
        getPeople();
        t = 5000;
    }
    // chat list
    if (page === "index-3") {
        getChatList();
        t = 5000;
    }
    // chat inner
    if (page === "messages") {
        getChat();
        t = 3000;
    }
    // run again
    if (t > 0) {
        pageRefreshRun(t);
    }

}
function pageRefreshRun(t) {
    pageRefreshTimer = setTimeout(function () {
        pageRefresh();
    }, t);
}
function pageCheck() {
    var page = myApp.getCurrentView().activePage.name;
    if (page !== sessionStorage.activePage) {
        sessionStorage.activePage = page;
        if (typeof pageRefreshTimer !== "undefined") {
            clearInterval(pageRefreshTimer);
        }
        pageRefresh();
        console.log("change page to " + page);
    }
}
function getSession() {
    //
    debug();
    //
    $("[data-session-key]").each(function (index) {
        var key = $(this).attr("data-session-key");
        var type = $(this).attr("data-session-type");
        var attr = $(this).attr("data-session-attr");

        if (type === "html") {
            $(this).html(sessionStorage[key]);
        }
        if (type === "css") {
            $(this).css(attr, sessionStorage[key]);
        }
        if (type === "attr") {
            $(this).attr(attr, sessionStorage[key]);
        }
        if (type === "value") {
            $(this).attr(attr, sessionStorage[key]);
        }
    });

}

$$(document).on('click', 'a.tab-link', function (e) {
    var href = $(this).attr("href");
    $('.toolbar-inner a[href="' + href + '"]').addClass("active");
});

$$(document).on('pageBeforeInit', '*', function (e) {
    $('#toolbar').show();
    getSession();
});

$$(document).on('pageBack', '*', function (e) {
    $('#toolbar').show(); // back from messages
});

