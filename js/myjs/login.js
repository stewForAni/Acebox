$(document).ready(function() {

    dealSighupandin();
    sighInContent();

});


function dealSighupandin() {

    $('#sigh_up').click(function() {
        sighUpContent();
    });


    $('#sigh_in').click(function() {
        sighInContent();
    });

}


function sighUpContent() {
    $('#sigh_form').empty();
    $('#sigh_form').append(sigh_up_content);
    $('#register').click(function() {
        return false;
    });
}

function sighInContent() {
    $('#sigh_form').empty();
    $('#sigh_form').append(sigh_in_content);
    $('#login').click(function() {
        if (checkLogin()) {
            doLoginApi();
        }
        return false;
    });
}

function doLoginApi() {

    var name = $("#username").val();
    var pwd = $("#password").val();

    $.ajax({
        url: ACE_BASE_URL + ACE_LOGIN_API,
        type: "POST",
        data: { username: name, password: pwd },
        success: function(result) {
            console.log("2222222");
            var url = "main.html";
            window.location.replace(url);
        },
        error: function(e) {
            console.log("333333");
        }
    });
}


function checkLogin() {
    var name = $("#username").val();
    var pwd = $("#password").val();
    if (isEmpty(name) || isEmpty(pwd)) {
    	alert("Account&Password cannot be empty");
        return false;
    }
    return true;

}