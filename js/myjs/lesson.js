var id;
var currentPosition = -1;
var currentId;
var lessonArray = new Array();
var containerId = "#lesson_main_container";


$(document).ready(function() {

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


    $("#upload_btn").click(function() {
        getCoursewareList();
        return false;
    });


    $("#log_out").click(function() {
        logout();
        return false;
    });

});

function getLessonListContentData() {

    $.ajax({
        url: ACE_BASE_URL + ACE_LESSON_LIST + "?pid=" + id + "&per-page=" + 30,
        type: "GET",
        success: function(result) {
            dealLessonListContentData(result);
            console.log("2222222");
        },
        error: function(e) {
            console.log("333333");
        }
    });

}


function getCoursewareList() {

    $.ajax({
        url: ACE_BASE_URL + ACE_CHOOSE_COURSEWARE + "?classify_id=" + currentId,
        type: "GET",
        success: function(result) {
            showUploadModal(result);
            console.log("2222222");
        },
        error: function(e) {
            console.log("333333");
        }
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

            console.log("2222222");
        },
        error: function(e) {
            hideSubmitModal();
            console.log("333333");
        }
    });
}


function dealLessonListContentData(data) {

    var lesson_data = data.data.items;
    var lesson_length = data.data.items.length;

    $("#lesson_list").html("");

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

    setCurrentPositionColor(position);
    currentId = item.id;
    $.ajax({
        url: ACE_BASE_URL + ACE_LESSON_VERSION_LOG + "?classify_id=" + currentId + "&per-page=" + 30,
        type: "GET",
        success: function(result) {
            dealLessonLogData(result);
            $('html,body').animate({ scrollTop: 0 }, 200);
            console.log("2222222");
        },
        error: function(e) {
            console.log("333333");
        }
    });

}

function setCurrentPositionColor(position) {

    $('#lesson_title').html("Lesson" + (position + 1) + " Test Log");

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

        if (data.test_status == 0) {
            status = "badge-secondary";
        } else if (data.test_status == 1) {
            status = "badge-warning";
        } else if (data.test_status == 2) {
            status = "badge-danger";
        } else if (data.test_status == 3) {
            status = "badge-success";
        }


        var index = randomNum(6);
        console.log(index);

        var log_content = '<a class="list-group-item list-group-item-action">' +
            '<div class="media">' +
            '<img alt="Image" src="images/changelog_icon' + index + '.jpg" class="avatar" />' +
            '<div class="media-body">' +
            '<div>' +
            '<span class="text-muted text-small">' + data.author_name + '</span>' +
            '<h6 class="h6 mb-1">' + data.remark + " 【" + data.name + "】" + '<li id="have_bug' + i + '" class="list-inline-item" style="background-color:#d9534f;border-radius : 5px;padding-left:5px;padding-right:5px;cursor:pointer;color:white"><i class = "icon-eye" style="color:white" > </i> bugs</li></h6>' +
            '<ul class="list-inline text-small text-muted">' +
            '<li class="list-inline-item" style="background-color:#f1f1f1;border-radius : 5px;padding-left:5px;padding-right:5px;">ID : ' + data.id + '</li>' +
            '<li class="list-inline-item" style="background-color:#f1f1f1;border-radius : 5px;padding-left:5px;padding-right:5px;cursor:pointer" id="version_download' + i + '"><i class = "icon-download" style="color:#4582EC"> </i> Version : ' + data.version + '</li>' +
            '<li class="list-inline-item" style="background-color:#f1f1f1;border-radius : 5px;padding-left:5px;padding-right:5px;">Review Status : <span class="badge badge-indicator ' + status + '">&nbsp;</span></li>' +
            '<li class="list-inline-item" style="background-color:#f1f1f1;border-radius : 5px;padding-left:5px;padding-right:5px;">Updated: ' + time + '</li>' +
            '<li class="list-inline-item" style="background-color:#FFD700;border-radius : 5px;padding-left:15px;padding-right:15px;cursor:pointer" id="change_status' + i + '"> <i class = "icon-dots-three-horizontal" > </i> </li > ' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</a>';



        $('#log_list').append(log_content);


        if (isEmpty(data.bug)) {
            $('#have_bug' + i).hide();
        } else {
            (function(data) {
                $('#have_bug' + i).click(function() {
                    showViewBugsModal(containerId, AddSeperator(data.bug));
                    return false;
                });
            })(data);

        }


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
        var bugs = $('#bugs').val();


        for (var j = 0; j < radios.length; j++) {
            if (radios[j].is(':checked')) {
                position = j;
                break;
            }
        }


        if (isEmpty(remarks) || position == -1) {
            return false;
        }

        if (isEmpty(bugs)) {
            bugs = "";
        }

        changeStatusApi(data, remarks, position, bugs);

        return false;
    });


}

function changeStatusApi(data, remarks, position, bugs) {


    if (bugs.indexOf("\n") >= 0) {
        bugs = ReplaceSeperator(bugs);
    }



    var d = '{' +
        '"id":"' + data.id + '",' +
        '"test_status":"' + position + '",' +
        '"bug":"' + bugs + '",' +
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
            console.log("2222222");
        },
        error: function(e) {
            hideChangeStatusModal()
            console.log("333333");
        }
    });

}


function getTime(timestamp) {

    var date = new Date(timestamp * 1000);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    // var s = date.getSeconds();
    return Y + M + D + h + m;
}