var containerId = "#main-container";

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
    getCookie();
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

            if ($("#check-agree").is(':checked')) {
                setCookie();
            }

            if (storageSign(result)) {
                var url = "main.html";
                window.location.replace(url);
            }

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
        showModal(containerId, modal_text3);
        return false;
    }
    return true;
}


function storageSign(result) {
    if (window.localStorage) {
        //localStorage可用
        var storage = window.localStorage;
        storage.setItem("sigh", result.data.auth_token);
        return true;
    } else {
        alert("localStorage unavailable");
        return false;
    }
}



function setCookie() {

    var name = $("#username").val();
    var pwd = $("#password").val();
    var checkebox = $("#check-agree");

    if (checkebox.is(':checked')) {
        Cookies.set("username", name); //调用jquery.cookie.js中的方法设置cookie中的用户名    
        Cookies.set("password", $.base64.encode(pwd)); //调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密    
    } else {
        Cookies.set("password", null);
    }

}



function getCookie() { //获取cookie    
    var name = Cookies.get("username"); //获取cookie中的用户名    
    var pwd = Cookies.get("password"); //获取cookie中的登陆密码    

    if (pwd) { //密码存在的话把“记住用户名和密码”复选框勾选住    
        $("#check-agree").attr("checked", "true");
    }

    if (name) { //用户名存在的话把用户名填充到用户名文本框    
        $("#username").val(name);
    }

    if (pwd) { //密码存在的话把密码填充到密码文本框    
        $("#password").val($.base64.decode(pwd));
    }
}