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
        var lesson_list_item = '  <a class="list-group-item d-flex justify-content-between" href="#">' +
            ' <div>' +
            '  <i class="icon-book mr-1"></i>' +
            '  <span>' + item.title + '</span>' +
            ' </div>' +
            ' <div>' +
            '    <i class="icon-chevron-right"></i>' +
            '</div>' +
            '</a>';
        $('#lesson_list').append(lesson_list_item);
    }


}