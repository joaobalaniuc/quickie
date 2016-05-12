//==============================================
// FACEBOOK API
//==============================================

var fb = {
    login: function () {
        facebookConnectPlugin.login(["email", "public_profile"], function (result) {
            alert(JSON.stringify(result));
            localStorage.fb_id = result.authResponse.userID;
            localStorage.fb_token = result.authResponse.accessToken;
        }, function (err) {
            alert('an error occured while trying to login. please try again. Err:' + err);
        });
    },
    getUserInfo: function () {
        facebookConnectPlugin.api(localStorage.fb_id + "/?fields=id,email,first_name,last_name,gender,picture,birthday", ["public_profile", "user_birthday"],
                function (result) {
                    alert("Result: " + JSON.stringify(result));
                    localStorage.fb_id = result.id;
                    localStorage.fb_first_name = result.first_name;
                    localStorage.fb_last_name = result.last_name;
                    localStorage.fb_gender = result.gender;
                    localStorage.fb_email = result.email;
                    localStorage.fb_birthday = result.birthday;
                    alert(localStorage.fb_email);
                },
                function (error) {
                    alert("Failed: " + error);
                });
    },
    getLoginStatus: function () {
        facebookConnectPlugin.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                //window.location.href = "quickie.html";
                alert("AUTH OK");
                return "OK MESMO";
            } else if (response.status === 'not_authorized') {
                alert("NOT AUTH");
            } else {
                alert("NOG LOGGED");
            }
        });
    },
    logout: function () {
        facebookConnectPlugin.logout(
                function () {
                    alert("logout ok");
                },
                function () {
                    alert("logout error");
                });
    }
};
