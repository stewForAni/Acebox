define(function(require, exports,module) {
    require('bootstrap');
    var $ = require('jquery'),
        httpService = require('http'),
        getData = require('getData');
    require('ajaxUtil');
    require('commoncontent');

    var uploadfile_api = "",
    	add_user_api = "",
    	containerID = "#add_user_container";

    // init();

    // function init(){
    // 	registerEvents();
    // 	if(checkInput()){
    // 		upload();
    // 	}
    // }
    registerEvents();

    function registerEvents(){
    	$("body")
        .on('click', "#create_account", function () {
            if(checkInput()){
	    		uploadFile();
	    	}
        })
        .on('change', "#avatar_name_input", function(){
        	file = this.files[0];
	        name = file.name.substring(file.name.length - 3, file.name.length);
	        $('#file_name').html(file.name);
        })
    }

    function checkInput(){
    	var username = $("#login-name").val();
    	var employeeid = $("#login-employeeid").val();
    	var password = $("#login-password").val();

    	if(isEmpty(username) || isEmpty(employeeid) || isEmpty(password)){
    		showModal(containerID, modal_text4);
    		return false;
    	}
    	return true;
    }

    function uploadFile(){
    	if (isEmpty(file) || isEmpty(name) || (name != "jpeg") && (name != "jpg") && (name != "png")) {
	        showModal(containerID, modal_text2);
	        return false;
	    }

	    var formData = new FormData();
	    formData.append('file', file);

	    showProgressModal(containerID);

	    httpService.processData(uploadfile_api, "POST", formData, "application/form-Data").done(function(result){
	    	addUser(result.data.token);
	    })
	    .fail(function(){
	    	hideProgressModal();
	    })
    }

    function adduser(){
    	var parameterData = {
    		"username":username,
    		"employeeid":employeeid,
    		"password":password
    	};
    	httpService.processData(add_user_api, "POST", parameterData).done(function(result){
	    	hideProgressModal();
	    })
	    .fail(function(){
	    	hideProgressModal();
	    })
    }

    


});