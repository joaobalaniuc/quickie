//--------------------------------------------
// INICIAR DISPOSITIVO
//--------------------------------------------
function start() {


//alert("start");

    sessionStorage.debug = 1;
    //--------------------------------------------
    // PADRÕES
    //--------------------------------------------
    var version = '1.0.0';
    // App config
    localStorage.server = "http://10.0.0.6/quickie/server/";
    //localStorage.server = "http://www.nickford.com.br/quickie/";
    localStorage.userid = 1;
    //
    sessionStorage.activePage = "";
    sessionStorage.lastchat = 0; // last msg id (#index-3)
    sessionStorage.lastchat_inner = 0; // (#messages)
    sessionStorage.session_startdate = "2016-04-11 12:00";
    sessionStorage.session_id = 1;
    //
    if (typeof device === "undefined") {
        device = {};
        device.uuid = "lab";
        device.platform = "Android";
        device.version = "---";
        device.name = "---";
        device.phonegap = "---";
    }

//
//if (localStorage.version !== version) {
    localStorage.lang = "en";
    localStorage.version = version;
    localStorage.os = device.platform;
// db
    localStorage.dbShort = 'Jowi';
    localStorage.dbVersion = '1.0';
    localStorage.dbName = 'Jowi';
    localStorage.dbMaxSize = 65536;
//alert("new version");
//}

//--------------------------------------------
// WEB SQL INICIO
//--------------------------------------------
//dbCreate();
}

var app = {
// Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("online", onOnline, false);
        function onOnline() {
            sessionStorage.online = true;
        }
        document.addEventListener("offline", onOffline, false);
        function onOffline() {
            sessionStorage.online = false;
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        var fn = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        app.ready(fn);
        app.receivedEvent('deviceready');

        var test = 'Device Name: ' + device.name + '\r\n' +
                'Device PhoneGap: ' + device.phonegap + '\r\n' +
                'Device Platform: ' + device.platform + '\r\n' +
                'Device UUID: ' + device.uuid + '\r\n' +
                'Device Version: ' + device.version + '\r\n';
    },
    // Update DOM on a Received Event
    ready: function (fn) {
        switch (fn) {
            //===============================
            // INDEX.HTML
            //===============================
            case "index.html":
                start();
                // SPLASHSCREEN (CONFIG.XML BUGFIX)
                setTimeout(function () {
                    navigator.splashscreen.hide();
                }, 1000);
                
            break;
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        /*var parentElement = document.getElementById(id);
         var listeningElement = parentElement.querySelector('.listening');
         var receivedElement = parentElement.querySelector('.received');
         listeningElement.setAttribute('style', 'display:none;');
         receivedElement.setAttribute('style', 'display:block;');*/
        console.log('Received Event: ' + id);
    }
};
