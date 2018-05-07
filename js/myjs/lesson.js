var id;

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

}

function dealLessonListContentData(data) {

    var lesson_data = data.data.items;
    var lesson_length = data.data.items.length;

    for (var i = 0; i < lesson_length; i++) {
        var item = lesson_data[i];
        var lesson_list_item = '<a class="list-group-item d-flex justify-content-between" id="lesson_' + i + '" style="cursor:pointer">' +
            ' <div>' +
            '  <i class="icon-book mr-1"></i>' +
            '  <span>' + item.title + '</span>' +
            ' </div>' +
            ' <div>' +
            '    <i class="icon-chevron-right"></i>' +
            '</div>' +
            '</a>';
        $('#lesson_list').append(lesson_list_item);

        (function(item) {
            $("#lesson_" + i).click(function() {
                showLessonLog(item);
                return false;
            });
        })(item);
    }
}


function showLessonLog(item) {

    $.ajax({
        url: ACE_BASE_URL + ACE_LESSON_VERSION_LOG + "?classify_id=" + item.id,
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


function dealLessonLogData(data) {
    var log_data = data.data.items;
    var log_length = data.data.items.length;
    for (var i = 0; i < log_length; i++) {
        var log_content = '<a class="list-group-item list-group-item-action" href="#">' +
            '                 <div class="media">' +
            '                    <img alt="Image" src="images/changelog_icon.jpg" class="avatar" />' +
            '   <div class="media-body">' +
            '   <div>' +
            '      <span class="text-muted text-small">Stew Han</span>' +
            '     <h5 class="h6 mb-1">1 . Pre_0001.APP 【first to commit】</h5>' +
            '   <ul class="list-inline text-small text-muted">' +
            '   <li class="list-inline-item">Version : 1.0.0</li>' +
            '  <li class="list-inline-item"><i class="icon-eye mr-1"></i>View</li>' +
            ' <li class="list-inline-item">Status : <span class="badge badge-indicator badge-secondary">&nbsp;</span></li>' +
            '<li class="list-inline-item">Updated: 2018-04-25 17:16</li>' +
            '</ul>' +
            '</div>' +
            ' </div>' +
            '  </div>' +
            '  </a>';


        $('#log_list').append(log_content);
    }






}