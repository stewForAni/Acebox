define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');

    var containerId = "#add_user_container";
    var file;
    var name;
    init();

    function init() {
        $("#log_out").click(function() {
            logout();
            return false;
        });

        getPositionData();

        $('#avatar_name_input').change(function() {
            file = this.files[0];
            name = file.name.substring(file.name.length - 3, file.name.length);
            $('#file_name').html(file.name);
        });


        $("#creat_account").click(function() {

            var username = $("#login-name").val();
            var employeeid = $("#login-employeeid").val();
            var password = $("#login-password").val();
            var positionid = $("#select_job_position").val();

            if (isEmpty(file) || isEmpty(name) || isEmpty(username) || isEmpty(employeeid) || isEmpty(password) || isEmpty(positionid) || positionid == "-1") {
                showModal(containerId, "enter error !");
                return false;
            }

            if (password.length <= 5) {
                showModal(containerId, "Password must be at least 6 characters !");
                return false;
            }

            if ((name != "jpeg") && (name != "jpg") && (name != "png")) {
                showModal(containerId, modal_text2);
                return false;
            }

            addUserAvatar(username, employeeid, password, positionid);
            return false;
        });
    }

    function getPositionData() {
        $.ajax({
            url: ACE_BASE_URL + ACE_GET_JOB_POSITION_LIST,
            type: "GET",
            success: function(result) {
                $("#select_job_position").html("");
                $("#select_job_position").append('<option value="-1" selected>Select your position</option>');
                var d = result.data.items;
                var l = d.length;
                for (var i = 0; i < l; i++) {
                    var item = d[i];
                    var option = '<option value="' + item.id + '">' + item.id + "-" + item.name + '</option>';
                    $("#select_job_position").append(option);
                }
            },
            error: function(e) {}
        });
    }



    function addUserAvatar(username, employeeid, password, positionid) {
        var formData = new FormData();
        formData.append('file', file);
        showProgressModalCenter(containerId);
        $.ajax({
            url: ACE_BASE_URL + ACE_FILE_UPLOAD,
            type: "POST",
            contentType: "application/form-Data",
            data: formData,
            processData: false,
            contentType: false,
            success: function(result) {
                doAddUser(result.data.token, username, employeeid, password, positionid);
            },
            error: function(e) {
                hideProgressModal();
            }
        });
    }



    function doAddUser(token, username, employeeid, password, positionid) {
        var d = '{' +
            '"number":"' + employeeid + '",' +
            '"password":"' + password + '",' +
            '"username":"' + username + '",' +
            '"avatar":"' + token + '",' +
            '"position":' + positionid +
            '}';

        $.ajax({
            url: ACE_BASE_URL + ACE_ADD_USER,
            type: "POST",
            contentType: "application/json",
            data: d,
            success: function(result) { hideProgressModal(); },
            error: function(e) { hideProgressModal(); }
        });
    }

});