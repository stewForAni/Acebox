$(document).ready(function() {
    getMainContentData();

    $("#log_out").click(function() {
        logout();
        return false;
    });


});


function getMainContentData() {

    $.ajax({
        url: ACE_BASE_URL + ACE_MAIN_CONTENT,
        type: "GET",
        success: function(result) {
            dealMianContentData(result);
            console.log("2222222");
        },
        error: function(e) {
            console.log("333333");
        }
    });



}

function dealMianContentData(data) {

    var level_length = data.data.length;
    var level_data = data.data;

    for (var i = 0; i < level_length; i++) {
        var item = level_data[i];
        var level_content = '<div class="col-12 col-sm-6 col-md-4">' +
            '<div class="card card-lg">' +
            ' <img class="card-img-top" src="' + ACE_BASE_IMG_URL + item.file.file_path + '" alt="Pit Stop">' +
            '  <div class="card-body">' +
            '     <h4 class="card-title">' + item.title + '</h4>' +
            ' <p class="card-text">' + item.description + '</p>' +
            '<ul class="list-unstyled list-spacing-sm" id="pahse_ul_' + i + '">' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';

        $('#main_content').append(level_content);

        var phase_length = item.child.length;
        var phase_data = item.child;

        for (var j = 0; j < phase_length; j++) {
            var phase_item = phase_data[j];
            var phase_content = '<li id="phase_' + j + '">' +
                '      <i class="icon-text-document text-muted mr-1"></i>' +
                '     <a href="lesson.html?pid=' + phase_item.id + '">' + item.title + " - " + phase_item.title + '</a>' +
                ' </li>';

            $('#pahse_ul_' + i).append(phase_content);

        }
    }


    $('#main_content').append(continueContent);

}