//==============================================
// FACEBOOK API
//==============================================

var fb = {
    login: function () {
        facebookConnectPlugin.login(["email", "public_profile"], function (response) {
            me.logged_in = true;
            //alert('logged in successfully');
            alert(JSON.stringify(response));
            localStorage.fb_id = response.authResponse.userID;
            localStorage.fb_token = response.authResponse.accessToken;
        }, function (err) {
            alert('an error occured while trying to login. please try again. Err:' + err);
        });
    }
};
