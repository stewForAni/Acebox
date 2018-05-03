var containerId = "#edit_course_container";



$(document).ready(function() {

    $('#add_course_structure').click(function() {
        window.location.href = "addcourse.html";
    });

    getCourseLevelData();

});


function getCourseLevelData() {

    $.ajax({
        url: ACE_BASE_URL + ACE_GET_COURSE_LEVEL_DATA,
        type: "GET",
        success: function(result) {
            dealCourseLevelData(result);
            console.log("2222222");
        },
        error: function(e) {
            console.log("333333");
        }
    });

}

function dealCourseLevelData(data) {
    $('#course_level').empty();
    var l = data.data.items.length;
    var d = data.data.items;

    for (var i = 0; i < l; i++) {
        var item = d[i];
        var content = ' <tr class="bg-white" >' +
            '   <th scope="row" style="width: 300px;cursor:pointer;"  id="level_block' + i + '">' +
            '     <div class="media align-items-center">' +
            '        <img alt="Image" src="' + ACE_BASE_IMG_URL + item.file.file_path + '"  style="height: 80px;margin-right: 10px;border-radius: 4px"/>' +
            '       <div class="media-body">' +
            '          <span class="h6 mb-0">' + item.title + '<span class="badge badge-success" style="margin-left:10px">Level</span>' +
            '         </span>' +
            '    </div>' +
            '</div>' +
            '</th>' +
            ' <td>' + item.id + '</td>' +
            ' <td>' + item.child_num + '(Phase)</td>' +
            ' <td style="max-width: 300px">' + item.description + '</td>' +
            ' <td>' +
            '    <div class="dropdown d-inline-block">' +
            '    <button class="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="dropdownMenuButton' + i + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '          <i class="icon-cog"></i>' +
            '    </button>' +
            '   <div class="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton' + i + '">' +
            '       <a class="dropdown-item" href="#" id="edit_level' + i + '">Edit Level</a>' +
            '      <a class="dropdown-item" href="#" id="delete_level' + i + '">delete Level</a>' +
            '      <div class="dropdown-divider"></div>' +
            '     <a class="dropdown-item" href="#" id="add_phase' + i + '">Add Phase</a>' +
            '  </div>' +
            ' </div>' +
            '  </td>' +
            '   </tr>' +
            '   <tr class="table-divider"></tr>';


        $('#course_level').append(content);




        (function(d) {
            $("#edit_level" + i).click(function() {

                return false;
            });
        })(d);


        (function(d) {
            $("#delete_level" + i).click(function() {

                return false;
            });
        })(d);


        (function(d) {
            $("#add_phase" + i).click(function() {
                showAddStageModal(containerId);
                return false;
            });
        })(d);


        (function(item) {
            $("#level_block" + i).click(function() {
                getPhase(item.id);
                return false;
            });
        })(item);
    }
}


function getPhase(pid) {
    $.ajax({
        url: ACE_BASE_URL + ACE_GET_COURSE_PHASE_DATA + "?pid=" + pid,
        type: "GET",
        success: function(result) {
            dealCoursePhaseData(result);
            console.log("2222222");
        },
        error: function(e) {
            console.log("333333");
        }
    });
}



function dealCoursePhaseData(data) {
    $('#course_level').empty();
    var l = data.data.items.length;
    var d = data.data.items;

    for (var i = 0; i < l; i++) {
        var item = d[i];
        var content = ' <tr class="bg-white" >' +
            '   <th scope="row" style="width: 300px" id="phase_block' + i + '">' +
            '     <div class="media align-items-center">' +
            '        <img id="image' + i + '" alt="Image" src="' + ACE_BASE_IMG_URL + item.file.file_path + '" style="height: 80px;margin-right: 10px;border-radius: 4px" />' +
            '       <div class="media-body">' +
            '          <span class="h6 mb-0">' + item.title + '<span class="badge" style="margin-left:10px;background-color:#417AE7;color:#fff">Phase</span>' +
            '         </span>' +
            '    </div>' +
            '</div>' +
            '</th>' +
            ' <td>' + item.id + '</td>' +
            ' <td>' + item.child_num + '(Lesson)</td>' +
            ' <td style="max-width: 300px" id="intro' + i + '">' + item.description + '</td>' +
            ' <td>' +
            '    <div class="dropdown d-inline-block">' +
            '    <button class="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="dropdownMenuButton' + i + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '          <i class="icon-cog"></i>' +
            '    </button>' +
            '   <div class="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton' + i + '">' +
            '     <a class="dropdown-item" href="#" id="edit_phase' + i + '">Edit Phase</a>' +
            '     <a class="dropdown-item" href="#" id="delete_phase' + i + '">delete Phase</a>' +
            '     <div class="dropdown-divider"></div>' +
            '     <a class="dropdown-item" href="#" id="add_lesson' + i + '">Add Lesson</a>' +
            '  </div>' +
            ' </div>' +
            '  </td>' +
            '   </tr>' +
            '   <tr class="table-divider"></tr>';


        $('#course_level').append(content);

        if (isEmpty(item.file.file_path)) {
            console.log("aa");
            $("#image" + i).attr("src", "images/auto.svg");
        }


        if (isEmpty(item.description)) {
            console.log("bb");
            $("#intro" + i).html('Oops ! Please add the introduction');
        }


        (function(d) {
            $("#edit_phase" + i).click(function() {

                return false;
            });
        })(d);


        (function(d) {
            $("#delete_phase" + i).click(function() {

                return false;
            });
        })(d);


        (function(d) {
            $("#add_lesson" + i).click(function() {
                showAddLessonModal(containerId);
                return false;
            });
        })(d);


        (function(d) {
            $("#phase_block" + i).click(function() {
                getLesson(d.id);
                return false;
            });
        })(d);
    }











}














function getLesson() {


}