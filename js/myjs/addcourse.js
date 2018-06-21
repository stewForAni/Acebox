define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');

    var file;
    var name;
    var containerId = "#add_course_container";

    init();

    function init() {
        $('#create_course').click(function() {
            if (checkInput()) {
                doUploadFileApi();
            }
            return false;
        });

        $('#cover_name_input').change(function() {
            file = this.files[0];
            name = file.name.substring(file.name.length - 3, file.name.length);
            console.log(file, name);
            $('#file_name').html(file.name);
        });
        
        $("#log_out").click(function() {
            logout();
            return false;
        });
    }

    function doUploadFileApi() {
        if (isEmpty(file) || isEmpty(name) || (name != "jpeg") && (name != "jpg") && (name != "png")) {
            showModal(containerId, modal_text2);
            return false;
        }
        var formData = new FormData();
        formData.append('file', file);
        showProgressModal(containerId);
        $.ajax({
            url: ACE_BASE_URL + ACE_FILE_UPLOAD,
            type: "POST",
            contentType: "application/form-Data",
            data: formData,
            processData: false,
            contentType: false,
            success: function(result) {
                doAddCourseApi(result.data.token);
            },
            error: function(e) {
                hideProgressModal();
            }
        });
    }

    function doAddCourseApi(token) {
        var level = $("#level_name").val();
        var stage = $("#stage_name").val();
        var intro = $("#course_intro").val();
        var d = '{"level": {' +
            '                  "title": "' + level + '",' +
            '                  "description": "' + intro + '",' +
            '                  "cover_token": "' + token + '"' +
            '                  },' +
            '        "stage": "' + stage + '"' +
            '      }';

        $.ajax({
            url: ACE_BASE_URL + ACE_CREATE_COURSE,
            type: "POST",
            contentType: "application/json",
            data: d,
            success: function(result) {
                hideProgressModal();
            },
            error: function(e) {
                hideProgressModal();
            }
        });
    }

    function checkInput() {
        var level = $("#level_name").val();
        var stage = $("#stage_name").val();
        var intro = $("#course_intro").val();
        if (isEmpty(level) || isEmpty(stage) || isEmpty(intro)) {
            showModal(containerId, modal_text1);
            return false;
        }
        return true;
    }
});