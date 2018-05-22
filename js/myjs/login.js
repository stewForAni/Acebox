define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    var Cookies = require('cookies');
    require('base64');
    require('commoncontent');

    var containerId = "#main-container";
    init();

    function init() {
        dealSighupandin();
        sighInContent();
    }

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
                if ($("#check-agree").is(':checked')) {
                    setCookie();
                }
                if (storageSign(result)) {
                    var url = "main.html";
                    window.location.replace(url);
                }
            },
            error: function(e) {}
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
            Cookies.set("username", name);
            Cookies.set("password", $.base64.encode(pwd));
        } else {
            Cookies.set("password", null);
        }
    }

    function getCookie() {
        var name = Cookies.get("username");
        var pwd = Cookies.get("password");
        if (pwd) {
            $("#check-agree").attr("checked", "true");
        }
        if (name) {
            $("#username").val(name);
        }
        if (pwd) {
            $("#password").val($.base64.decode(pwd));
        }
    }
});