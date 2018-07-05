define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');

    var id;
    var currentPosition = -1;
    var currentId;
    var lessonArray = new Array();
    var containerId = "#lesson_main_container";

    var comemnt_level_1 = "#6c757d";
    var comemnt_level_2 = "#f0ad4e";
    var comemnt_level_3 = "#d9534f";

    init();
    initCatalog();

    function init() {
        var url = location.search;
        var obj = {};
        if (url.indexOf("?") != -1) {
            var strs = url.substr(1).split("&");　
            for (var i = 0; i < strs.length; i++) {
                obj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }

        id = obj.pid;
        getLessonListContentData();

        $("#log_out").click(function() {
            logout();
            return false;
        });
    }

    function getLessonListContentData() {
        $.ajax({
            url: ACE_BASE_URL + ACE_LESSON_LIST + "?pid=" + id + "&per-page=" + 30,
            type: "GET",
            success: function(result) {
                dealLessonListContentData(result);
            },
            error: function(e) {}
        });
    }


    function getCoursewareList() {
        $.ajax({
            url: ACE_BASE_URL + ACE_CHOOSE_COURSEWARE + "?classify_id=" + currentId,
            type: "GET",
            success: function(result) {
                showUploadModal(result);
            },
            error: function(e) {}
        });
    }



    function showUploadModal(data) {
        showSubmitModal(containerId, "Submit courseware");
        var d = data.data.items;
        var l = d.length;
        for (var i = 0; i < l; i++) {
            var time = getTime(d[i].created_at);
            $('#coursewarelist').append('<option value="' + d[i].token + '">' + d[i].file_name + "(" + time + ")" + '</option>');
        }
        $('#upload_course').click(function() {
            var log = $('#log').val();
            var token = $('#coursewarelist').val();
            if ("Select one to submit" == token) {
                return false;
            }
            var myString = $("#coursewarelist option[value=" + token + "]").text();
            if (isEmpty(log) || isEmpty(token) || isEmpty(myString)) {
                return false;
            } else {
                var arr = myString.split('(');
                var name = arr[0];
                doSubmitTestApi(log, token, name);
            }
            return false;
        });
    }

    function doSubmitTestApi(log, token, name) {
        var d = '{' +
            '"classify_id":"' + currentId + '",' +
            '"remark":"' + log + '",' +
            '"name":"' + name + '",' +
            '"file":{' +
            '   "token":"' + token + '"' +
            '}' +
            '}';
        $.ajax({
            url: ACE_BASE_URL + ACE_SUBMIT_TEST,
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: d,
            success: function(result) {
                hideSubmitModal();
                currentPosition = -1;
                getLessonListContentData();
            },
            error: function(e) {
                hideSubmitModal();
            }
        });
    }


    function dealLessonListContentData(data) {
        var lesson_data = data.data.items;
        var lesson_length = data.data.items.length;
        $("#lesson_list").html("");
        $("#log_list").html("");
        $('#card_title').html("");
        $('#card_self').hide();

        for (var i = 0; i < lesson_length; i++) {
            var item = lesson_data[i];
            var lesson_list_item = '<a class="list-group-item d-flex justify-content-between" id="lesson_' + i + '" >' +
                '<div>' +
                '<i class="icon-book mr-1"></i>' +
                '<span>' + item.title + '</span>' +
                '</div>' +
                '<div>' +
                '<i class="icon-chevron-right"></i>' +
                '</div>' +
                '</a>';
            $('#lesson_list').append(lesson_list_item);

            (function(item, i) {
                $("#lesson_" + i).click(function() {
                    showLessonLog(item, i);
                    return false;
                });
            })(item, i);

            lessonArray.push("#lesson_" + i);
        }

        if (lesson_length > 0) {
            showLessonLog(lesson_data[0], 0);
            currentPosition = 0;
        }
    }

    function showLessonLog(item, position) {
        if (currentPosition == position) {
            return;
        }

        var cartitle = '<div>' +
            '<h5 id="lesson_title"></h5>' +
            '</div>' +
            '<button class="btn btn-primary" id="upload_btn"><i class="icon-retweet mr-1"></i>Submit Test</button>';

        $('#card_self').show();
        $('#card_title').html(cartitle);

        setCurrentPositionColor(item.title,position);
        currentId = item.id;
        $.ajax({
            url: ACE_BASE_URL + ACE_LESSON_VERSION_LOG + "?classify_id=" + currentId + "&per-page=" + 30,
            type: "GET",
            success: function(result) {
                dealLessonLogData(result);
                $('html,body').animate({ scrollTop: 0 }, 200);
            },
            error: function(e) {}
        });


        $("#upload_btn").click(function() {
            getCoursewareList();
            return false;
        });
    }

    function setCurrentPositionColor(title,position) {
        $('#lesson_title').html(title + " Test Log");
        for (var i = 0; i < lessonArray.length; i++) {
            $(lessonArray[i]).attr("style", "cursor:pointer");
        }
        $(lessonArray[position]).attr("style", "background-color:#eeeeee");
        currentPosition = position;
    }

    function dealLessonLogData(data) {
        var log_data = data.data.items;
        var log_length = data.data.items.length;
        $("#log_list").html("");
        if (log_length == 0) {
            $('#no_log').remove();
            var no_log_content = '<a class="list-group-item list-group-item-action" id="no_log">' +
                '<div class="media" style="text-align: center;">' +
                '<div class="media-body" >' +
                '<div>' +
                '<h5 class="h6 mb-1">No test log yet , please submit a courseware to test.</h5>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</a>';
            $('#log_list').append(no_log_content);
            return;
        }
        for (var i = 0; i < log_length; i++) {
            var data = log_data[i];
            var time = getTime(data.created_at);
            var status;
            var commentList = data.comments;
            var commentLength = data.comments.length;
            var index = randomNum(6);


            if (data.test_status == 0) {
                status = "badge-secondary";
            } else if (data.test_status == 1) {
                status = "badge-warning";
            } else if (data.test_status == 2) {
                status = "badge-danger";
            } else if (data.test_status == 3) {
                status = "badge-success";
            }


            var log_content = '<a class="list-group-item list-group-item-action">' +
                '<div class="media">' +
                '<img alt="Image" src="images/changelog_icon' + index + '.jpg" class="avatar"  style="box-shadow: 1px 1px 1px #888888;"/>' +
                '<div class="media-body">' +
                '<div>' +
                '<span class="text-muted text-small">' + data.author_name + '</span>' +
                '<h6 class="h6 mb-1">' + data.remark + " 【" + data.name + "】" +
                '<span id="comment_count_id' + i + '" class="comment-badge badge-secondary" style="border-radius:0.25rem 0 0 0.25rem">n/a</span>' +
                '<span id="query_count_id' + i + '" class="comment-badge badge-warning">n/a</span>' +
                '<span id="error_count_id' + i + '" class="comment-badge badge-danger" style="border-radius:0 0.25rem 0.25rem 0">n/a</span></h6>' +
                '<ul class="list-inline text-small text-muted">' +
                '<li class="list-inline-item" style="background-color:#f1f1f1;border-radius : 5px;padding-left:5px;padding-right:5px;">ID : ' + data.id + '</li>' +
                '<li class="list-inline-item" style="background-color:#f1f1f1;border-radius : 5px;padding-left:5px;padding-right:5px;cursor:pointer" id="version_download' + i + '"><i class = "icon-download" style="color:#4582EC"> </i> Ver : ' + data.version + '</li>' +
                '<li class="list-inline-item" style="background-color:#f1f1f1;border-radius : 5px;padding-left:5px;padding-right:5px;">Status : <span class="badge badge-indicator ' + status + '">&nbsp;</span></li>' +
                '<li class="list-inline-item" style="background-color:#f1f1f1;border-radius : 5px;padding-left:5px;padding-right:5px;">Updated: ' + time + '</li>' +
                '<li class="list-inline-item" style="background-color:#4582EC;border-radius : 5px;padding-left:15px;padding-right:15px;cursor:pointer" id="change_status' + i + '"> <i class = "icon-dots-three-horizontal" style="color:white"> </i> </li > ' +
                '<li class="list-inline-item" style="background-color:#4582EC;border-radius : 5px;padding-left:15px;padding-right:15px;cursor:pointer" id="add_comment' + i + '"  data-target="#comment-reply' + i + '" data-toggle="collapse" aria-expanded="false" aria-controls="comment-reply' + i + '"> <i class = "icon-plus"  style="color:white"> </i> </li > ' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</a>' +

                '<div class="collapse" id="comment-reply' + i + '"  style="background-color:#f1f1f1;">' +
                '<form class="card-body">' +
                '<div class="form-group">' +
                '<textarea class="form-control from-control-lg" id="comment-reply-text' + i + '" name="comment-reply" rows="2" placeholder="Type your comments here"></textarea>' +
                '</div>' +

                '<div class="d-flex justify-content-between" style="margin-bottom:10px">' +

                '<div class="d-flex">' +
                '<div class="custom-control custom-radio">' +
                '<input id="radio1_' + i + '" name="radio" type="radio" class="custom-control-input">' +
                '<label class="custom-control-label" for="radio1_' + i + '"><span class="badge badge-indicator  mr-1" style="background-color:' + comemnt_level_1 + '">&nbsp;</span>comment</label>' +
                '</div>' +

                '<div class="custom-control custom-radio" style="margin-left:20px">' +
                '<input id="radio2_' + i + '" name="radio" type="radio" class="custom-control-input">' +
                '<label class="custom-control-label" for="radio2_' + i + '"><span class="badge badge-indicator  mr-1" style="background-color:' + comemnt_level_2 + '">&nbsp;</span>query</label>' +
                '</div>' +


                '<div class="custom-control custom-radio" style="margin-left:20px">' +
                '<input id="radio3_' + i + '" name="radio" type="radio" class="custom-control-input">' +
                '<label class="custom-control-label" for="radio3_' + i + '"><span class="badge badge-indicator  mr-1" style="background-color:' + comemnt_level_3 + '">&nbsp;</span>error</label>' +
                '</div>' +
                '</div>' +

                '<div class="d-flex">' +
                '<a href="#comment-reply' + i + '" class="text-small text-muted" data-toggle="collapse" aria-expanded="true" aria-controls="comment-reply' + i + '"> <button class="btn btn-secondary mr-3">cancel</button></a>' +
                '<button class="btn btn-primary" id="comment' + i + '">send</button>' +
                '</div>' +
                '</div>' +

                '</form>' +
                '</div>' +

                '<ul class="list-group" id="comment_list' + i + '">' +
                '</ul>';

            $('#log_list').append(log_content);

            logAddComment(commentLength, commentList, i);

            (function(data) {
                $("#version_download" + i).click(function() {
                    window.location.href = data.download_files[0].file_path;
                    return false;
                });
            })(data);
            (function(data) {
                $("#change_status" + i).click(function() {
                    changeStatus(data);
                    return false;
                });
            })(data);
            (function(data, i) {
                $("#comment" + i).click(function() {

                    var comment = $("#comment-reply-text" + i).val();
                    var type = -1;
                    var radio1 = $("#radio1_" + i);
                    var radio2 = $("#radio2_" + i);
                    var radio3 = $("#radio3_" + i);

                    if ((!radio1.is(':checked')) && (!radio2.is(':checked')) && (!radio3.is(':checked'))) {
                        showModal(containerId, "Please select type !");
                        return false;
                    } else if (radio1.is(':checked')) {
                        type = 1;
                    } else if (radio2.is(':checked')) {
                        type = 2;
                    } else if (radio3.is(':checked')) {
                        type = 3;
                    }

                    if (!isEmpty(comment)) {
                        addComment(data, comment, type, i);
                    } else {
                        showModal(containerId, "Comment is empty !");
                    }

                    return false;
                });
            })(data, i);
        }
    }




    function changeStatus(data) {
        showChangeStatusModal(containerId, "Modify State");
        var radios = new Array();
        var position = -1;
        for (var i = 0; i < 4; i++) {
            var radio = $("#radio" + (i + 1));
            radios.push(radio);
        }
        $("#submit_state").click(function() {
            var remarks = $('#remarks').val();
            for (var j = 0; j < radios.length; j++) {
                if (radios[j].is(':checked')) {
                    position = j;
                    break;
                }
            }
            if (isEmpty(remarks) || position == -1) {
                return false;
            }

            changeStatusApi(data, remarks, position);
            return false;
        });
    }

    function changeStatusApi(data, remarks, position) {

        var d = '{' +
            '"id":"' + data.id + '",' +
            '"test_status":"' + position + '",' +
            '"remark":"' + remarks + '"' +
            '}';

        $.ajax({
            url: ACE_BASE_URL + ACE_CHANGE_STATE,
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: d,
            success: function(result) {
                hideChangeStatusModal()
                currentPosition = -1;
                getLessonListContentData();
            },
            error: function(e) {
                hideChangeStatusModal()
            }
        });
    }

    function addComment(data, comment, type, i) {

        var t = '{' +
            ' "cou_verify_id": "' + data.id + '",' +
            ' "type_id": "' + type + '",' +
            ' "content": "' + comment + '"' +
            '}';

        $.ajax({
            url: ACE_BASE_URL + ACE_ADD_COMMENT,
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: t,
            success: function(result) {
                getLogCommentList(data.id, i);
            },
            error: function(e) {

            }
        });

    }


    function getLogCommentList(id, i) {

        $.ajax({
            url: ACE_BASE_URL + ACE_GET_COMMENT_LIST + "?cou_verify_id=" + id,
            type: "GET",
            contentType: "application/json; charset=UTF-8",
            success: function(result) {
                var list = result.data.items;
                logAddComment(list.length, list, i);
            },
            error: function(e) {

            }
        });

    }


    function logAddComment(commentLength, commentList, i) {
        $("#comment_list" + i).empty();

        var comment_count = 0;
        var query_count = 0;
        var error_count = 0;


        for (var j = 0; j < commentLength; j++) {
            var item = commentList[j];
            var index = randomNum(6);
            var time = getTime(item.created_at);

            var comment_level = item.type_id;
            var current_color = "";
            if (comment_level == 1) {
                current_color = comemnt_level_1;
            } else if (comment_level == 2) {
                current_color = comemnt_level_2;
            } else if (comment_level == 3) {
                current_color = comemnt_level_3;
            }


            if (item.type_id == 1) {
                comment_count++;
            } else if (item.type_id == 2) {
                query_count++;
            } else if (item.type_id == 3) {
                error_count++;
            }

            var comment_item =
                '<li class="comment-list-group-item" style="background-color:' + current_color + ';display:block">' +
                '<div class="media" style="background-color:#ffffff;margin-left:5px;padding-left:40px;padding-top:10px;padding-bottom:10px;padding-right:40px">' +
                '<img alt="Image" src="images/changelog_icon' + index + '.jpg" class="avatar avatar-xxs" style="box-shadow: 1px 1px 1px #888888;"/>' +
                '<div class="media-body">' +
                '<small >' + item.operator_name + '</small>' +
                '<small style="margin-left:10px">' + time + '</small><br/>' +
                '<small>' + item.content + '</small>' +
                '</div>' +
                '</div>' +
                '</li>';

            $("#comment_list" + i).append(comment_item);
        }


        $("#comment_count_id" + i).text(comment_count);
        $("#query_count_id" + i).text(query_count);
        $("#error_count_id" + i).text(error_count);

    }











    var currentLevelid = 0;
    var currentStageid = 0;
    var currentLessonid = 0;

    function initCatalog() {
        $('#select_level').empty();
        $('#select_level').append('<option value="0" selected>Select Level</option>');
        reset();
        getdata();
    }


    function getdata() {
        $.ajax({
            url: ACE_BASE_URL + ACE_GET_ALL_STRUCT,
            type: "GET",
            success: function(result) {
                dealstructdata(result);
            },
            error: function(e) {}
        });
    }

    function dealstructdata(data) {

        var level_length = data.data.length;
        var level_data = data.data;
        var current_stage_length;
        var current_stage_data;

        for (var i = 0; i < level_length; i++) {
            var preleveldata = level_data[i];
            var level_data_name = preleveldata.title;
            var level_data_id = preleveldata.id;
            var optionl = '<option value=' + level_data_id + '>' + level_data_name + '</option>';
            $('#select_level').append(optionl);
        }

        $("#select_level").change(function() {
            currentLevelid = $(this).children('option:selected').val();
            if (currentLevelid != "0") {
                for (var k = 0; k < level_length; k++) {
                    if (currentLevelid == level_data[k].id) {
                        reset();
                        current_stage_data = level_data[k].child;
                        current_stage_length = current_stage_data.length;
                        for (var j = 0; j < current_stage_length; j++) {
                            var options = '<option value=' + current_stage_data[j].id + '>' + current_stage_data[j].title + '</option>';
                            $('#select_stage').append(options);
                        }
                    }
                }
            } else {
                reset()
            }
        });

        $("#select_stage").change(function() {
            currentStageid = $(this).children('option:selected').val();
        });

        $('#switch_btn').click(function() {
            if (currentStageid != 0) {
                id = currentStageid;
                currentPosition = -1;
                getLessonListContentData();
            } else {
                showModal(containerId, "Select Error !");
            }

            return false;
        });

    }


    function reset() {
        $('#select_stage').empty();
        $('#select_stage').append('<option value="0" selected>Select Stage</option>');
        $('#select_lesson').empty();
        $('#select_lesson').append('<option value="0" selected>Select Lesson</option>');
    }

    function reset_2() {
        $('#select_lesson').empty();
        $('#select_lesson').append('<option value="0" selected>Select Lesson</option>');
    }

});