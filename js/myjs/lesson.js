var id;
var currentPosition = -1;
var currentId;
var lessonArray = new Array();


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

});

function getLessonListContentData() {

    $.ajax({
        url: ACE_BASE_URL + ACE_LESSON_LIST + "?pid=" + id,
        type: "GET",
        success: function(result) {
            dealLessonListContentData(result);
            console.log("2222222");
        },
        error: function(e) {
            console.log("333333");
        }
    });


    $("#upload_btn").click(function() {
        showUploadModal();
        return false;
    });

}


function showUploadModal() {

    showUploadWareModal("#lesson_main_container", "Upload Courseware")

    $('#upload_course').click(function() {

        var log = $('#log').val();

        if (isEmpty(log)) {
            return false;
        } else {
            doUploadWareApi(log);
        }
        return false;
    });

}


function doUploadWareApi(log) {
    var d = '';

    $.ajax({
        url: ACE_BASE_URL + ACE_UPLOAD_COURSEWARE,
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: d,
        success: function(result) {
            hideUploadWareModal();
            console.log("2222222");
        },
        error: function(e) {
            hideUploadWareModal();
            console.log("333333");
        }
    });
}


function dealLessonListContentData(data) {

    var lesson_data = data.data.items;
    var lesson_length = data.data.items.length;

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
        url: ACE_BASE_URL + ACE_LESSON_VERSION_LOG + "?classify_id=" + currentId,
        type: "GET",
        success: function(result) {
            dealLessonLogData(result);
            console.log("2222222");
        },
        error: function(e) {
            console.log("333333");
        }
    });

}

function setCurrentPositionColor(position) {

    $('#lesson_title').html("Lesson" + (position + 1) + " Version Log");
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
            '<h5 class="h6 mb-1">No log yet , please upload courseware.</h5>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</a>';

        $('#log_list').append(no_log_content);
        return;
    }



    for (var i = 0; i < log_length; i++) {
        var data = log_data[i];
        var time = getTime(data.updated_at);
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


        var log_content = '<a class="list-group-item list-group-item-action">' +
            '<div class="media">' +
            '<img alt="Image" src="images/changelog_icon.jpg" class="avatar" />' +
            '<div class="media-body">' +
            '<div>' +
            '<span class="text-muted text-small">' + data.author_name + '</span>' +
            '<h5 class="h6 mb-1">' + data.name + " [" + data.remark + "]" + '</h5>' +
            '<ul class="list-inline text-small text-muted">' +
            '<li class="list-inline-item" style="background-color:#E6EAED;border-radius : 5px;padding-left:5px;padding-right:5px;cursor:pointer">Version : ' + data.version + '</li>' +
            '<li class="list-inline-item" style="background-color:#E6EAED;border-radius : 5px;padding-left:5px;padding-right:5px;">Review Status : <span class="badge badge-indicator ' + status + '">&nbsp;</span></li>' +
            '<li class="list-inline-item" style="background-color:#E6EAED;border-radius : 5px;padding-left:5px;padding-right:5px;">Updated: ' + time + '</li>' +
            '<li class="list-inline-item" style="background-color:#FFD700;border-radius : 5px;padding-left:15px;padding-right:15px;cursor:pointer"><i class="icon-dots-three-horizontal"></i></li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</a>';

        $('#log_list').append(log_content);
    }

}

function getTime(timestamp) {

    var date = new Date(timestamp * 1000);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes();
    // var s = date.getSeconds();
    return Y + M + D + h + m;
}