//
//common html
//


var sigh_in_content = ' <div class="form-group">' +
    '       <label for="exampleInputUsername">Username</label>' +
    '      <input type="text" class="form-control form-control-lg" id="username" aria-describedby="usernameHelp" placeholder="Enter username">' +
    ' </div>' +
    '    <div class="form-group">' +
    '       <label for="exampleInputPassword">Password</label>' +
    '      <input type="password" class="form-control form-control-lg" id="password" placeholder="Enter Password">' +
    ' </div>' +
    '<div class="mb-3">' +
    '   <div class="custom-control custom-checkbox">' +
    '      <input type="checkbox" class="custom-control-input" value="agree" name="agree-terms" id="check-agree">' +
    '     <label class="custom-control-label text-small" for="check-agree">Remember my password.</a>' +
    '    </label>' +
    '</div>' +
    '</div>' +
    '<button  class="btn btn-lg btn-success btn-block" id="login">Login in</button>';



var sigh_up_content = ' <div class="form-group">' +
    '       <label for="exampleInputUsername">Username</label>' +
    '       <input type="text" class="form-control form-control-lg" id="exampleInputUsername" aria-describedby="usernameHelp" placeholder="Pick a username">' +
    '</div>' +
    '   <div class="form-group">' +
    '      <label for="exampleInputEmail">Email address</label>' +
    '     <input type="email" class="form-control form-control-lg" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email">' +
    '    <small id="emailHelp" class="form-text">' + "We'll never share your email with anyone else." + '</small>' +
    '</div>' +
    '<div class="form-group">' +
    '   <label for="exampleInputPassword">Password</label>' +
    '  <input type="password" class="form-control form-control-lg" id="exampleInputPassword" placeholder="Password">' +
    '</div>' +
    '<div class="mb-3">' +
    '   <div class="custom-control custom-checkbox">' +
    '      <input type="checkbox" class="custom-control-input" value="agree" name="agree-terms" id="check-agree">' +
    '     <label class="custom-control-label text-small" for="check-agree">I agree to the <a href="#">Terms &amp; Conditions</a>' +
    '    </label>' +
    '</div>' +
    '</div>' +
    '<button type="submit" class="btn btn-lg btn-success btn-block" id="register">Sign up for Wingman</button>';






































//
//common js function
//

var modal_text1 = "LevelName or StageName or Introduction cannot be empty ! ";

var modal_text2 = "File error, must be .jpg or .png ! ";

var modal_text3 = "Account or Password cannot be empty ! ";


function getModalContent(content) {
    var modalContent = '<div class="modal fade" id="myWarnModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        ' <div class="modal-dialog modal-dialog-centered" role="document">' +
        '  <div class="modal-content">' +
        '   <div class="modal-header">' +
        '    <h5 class="modal-title" id="exampleModalLongTitle">Oops ! </h5>' +
        '   <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        ' </button>' +
        '</div>' +
        '<div class="modal-body">' + content + '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}


function getProgressModalContent() {
    var modalContent = '<div class="modal fade" id="myProgressModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        ' <div class="modal-dialog modal-dialog-centered" role="document">' +
        '  <div class="modal-content">' +
        '   <div class="modal-header">' +
        '    <h5 class="modal-title" id="exampleModalLongTitle">Uploading... </h5>' +
        '   <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        ' </button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="progress">' +
        '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}


function getProgressModalContent2() {
    var modalContent = '<div class="modal fade" id="myProgressModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="padding-bottom: 50px;">' +
        ' <div class="modal-dialog" role="document">' +
        '  <div class="modal-content">' +
        '   <div class="modal-header">' +
        '    <h5 class="modal-title" id="exampleModalLongTitle">Uploading... </h5>' +
        '   <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        ' </button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="progress">' +
        '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}

function getAddStageModalContent() {
    var modalContent = '<div class="modal fade" id="addStageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        ' <div class="modal-dialog modal-dialog-centered" role="document">' +
        '  <div class="modal-content">' +
        '   <div class="modal-header">' +
        '    <h5 class="modal-title" id="exampleModalLongTitle">Add Stage</h5>' +
        '   <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        ' </button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<form>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <input class="form-control form-control-lg" type="text" id="stage_name" placeholder="Stage Name" />' +
        '     <small style="margin-top:10px">A level can contain multiple stages,each stage needs to be separated by " , ".For example: phase1,phase2,phase3</small>' +
        ' </div>' +
        '</div>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '     <button class="btn btn-block btn-success btn-lg" id="create_stage">Create Stage</button>' +
        '</div>' +
        '</div>' +
        '<small>Any question, please refer to the rules in the "Add Course Structure".</small>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}

function getAddLessonModalContent() {
    var modalContent = '<div class="modal fade" id="addLessonModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        ' <div class="modal-dialog modal-dialog-centered" role="document">' +
        '  <div class="modal-content">' +
        '   <div class="modal-header">' +
        '    <h5 class="modal-title" id="exampleModalLongTitle">Add Lesson</h5>' +
        '   <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        ' </button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<form>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <input class="form-control form-control-lg" type="text" id="lesson_name" placeholder="Lesson Name" />' +
        '     <small style="margin-top:10px">A stage can contain multiple lessons,each lesson needs to be separated by " , ".For example: lesson1,lesson2,lesson3</small>' +
        ' </div>' +
        '</div>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '     <button class="btn btn-block btn-success btn-lg" id="create_lesson">Create Lesson</button>' +
        '</div>' +
        '</div>' +
        '<small>Any question, please refer to the rules in the "Add Course Structure".</small>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}


function getEditCourseModalContent(content) {
    var modalContent = '<div class="modal fade" id="editCourseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        ' <div class="modal-dialog modal-dialog-centered" role="document">' +
        '  <div class="modal-content">' +
        '   <div class="modal-header">' +
        '    <h5 class="modal-title" id="exampleModalLongTitle">Edit ' + content + '</h5>' +
        '   <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        ' </button>' +
        '</div>' +
        '<div class="modal-body">' +


        '<form>' +
        ' <div class="form-row form-group">' +
        '      <div class="col">' +
        '       <input class="form-control form-control-lg" type="text" id="name" placeholder="' + content + ' Name" />' +
        '      </div>' +
        ' </div>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <textarea class="form-control form-control-lg" name="profileBio" rows="4" id="intro" placeholder="Add Introduction"></textarea>' +
        '<small>Briefly introduce the teaching objectives of this ' + content + '.</small>' +
        '</div>' +
        '</div>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <label class="custom-file mb-2" for="cover_name_input">' +
        '         <input type="file" id="cover_name_input" class="custom-file-input height-xs">' +
        '        <span class="btn btn-primary " id="cover_name_span"><i class="icon-upload-to-cloud">&nbsp;</i>Upload a Cover</span>' +
        '   </label>' +
        '  <span><a href="#" id="file_name">No file has been selected yet.</a></span>' +
        '</div>' +
        '</div>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <button class="btn btn-block btn-success btn-lg" id="edit_course">Confirm Edit</button>' +
        ' </div>' +
        '</div>' +
        '<small>Any question, please refer to the rules in the "Add Course Structure".</small>' +
        '</form>' +



        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}




function getDeleteCourseModalContent(content) {
    var modalContent = '<div class="modal fade" id="deleteCourseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        ' <div class="modal-dialog modal-dialog-centered" role="document">' +
        '  <div class="modal-content">' +
        '   <div class="modal-header">' +
        '    <h5 class="modal-title" id="exampleModalLongTitle">Delete ' + content + '</h5>' +
        '   <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        ' </button>' +
        '</div>' +
        '<div class="modal-body">' +

        '<div class="modal-body">' +
        ' <p>' + "Confirm the deletion ? " + '</p>' +
        ' </div>' +
        '<div class="modal-footer">' +
        ' <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>' +
        '<button type="button" class="btn btn-danger"  id="confirm">Confirm</button>' +
        '</div>' +


        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}















function getUploadCourseWareModalContent(content) {
    var modalContent = '<div class="modal fade" id="uploadCourseWareModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        ' <div class="modal-dialog modal-dialog-centered" role="document">' +
        '  <div class="modal-content">' +
        '   <div class="modal-header">' +
        '    <h5 class="modal-title" id="exampleModalLongTitle">' + content + '</h5>' +
        '   <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        ' </button>' +
        '</div>' +
        '<div class="modal-body">' +


        '<form>' +
        ' <div class="form-row form-group">' +
        '      <div class="col">' +
        '       <input class="form-control form-control-lg" type="text" id="version" placeholder="Courseware Version" />' +
        '      </div>' +
        ' </div>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <textarea class="form-control form-control-lg" name="profileBio" rows="4" id="log" placeholder="Operation Log"></textarea>' +
        '<small>Write changes have been made in this version.</small>' +
        '</div>' +
        '</div>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <label class="custom-file mb-2" for="courseware_input">' +
        '         <input type="file" id="courseware_input" class="custom-file-input height-xs">' +
        '        <span class="btn btn-primary " id="cover_name_span"><i class="icon-upload-to-cloud">&nbsp;</i>Select a courseware</span>' +
        '   </label>' +
        '  <span><a href="#" id="file_name">No file has been selected yet.</a></span>' +
        '</div>' +
        '</div>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <button class="btn btn-block btn-success btn-lg" id="upload_course">Upload</button>' +
        ' </div>' +
        '</div>' +
        '<small>Any question, please refer to the rules in the "Add Course Structure".</small>' +
        '</form>' +



        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}








//tip dialog
function showModal(id, content) {
    $('#myWarnModal').remove();
    $(id).append(getModalContent(content));
    $("#myWarnModal").modal();
}

//progress dialog center
function showProgressModal(id) {
    $('#myProgressModal').remove();
    $(id).append(getProgressModalContent());
    $("#myProgressModal").modal();
}

//progress dialog top
function showProgressModal(id, content) {
    $('#myProgressModal').remove();
    $(id).append(getProgressModalContent2());
    $("#myProgressModal").modal();
}


//hide dialog
function hideProgressModal() {
    var timeout = setTimeout(function() {
        $('#myProgressModal').remove();
        $('.modal-backdrop').remove();
    }, 1000);
}







//edit course
function showEditCourseModal(id, content) {
    $('#editCourseModal').remove();
    $(id).append(getEditCourseModalContent(content));
    $("#editCourseModal").modal();
}

//hide edit course
function hideEditCourseModal() {
    $('#editCourseModal').remove();
    $('.modal-backdrop').remove();
}



//delete course
function showDeleteCourseModal(id, content) {
    $('#deleteCourseModal').remove();
    $(id).append(getDeleteCourseModalContent(content));
    $("#deleteCourseModal").modal();
}

//hide delete course
function hideDeleteCourseModal() {
    $('#deleteCourseModal').remove();
    $('.modal-backdrop').remove();
}







//add stage dialog
function showAddStageModal(id) {
    $('#addStageModal').remove();
    $(id).append(getAddStageModalContent());
    $("#addStageModal").modal();
}

//hide dialog
function hideAddStageModal() {
    $('#addStageModal').remove();
    $('.modal-backdrop').remove();
}

//add lesson dialog
function showAddLessonModal(id) {
    $('#addLessonModal').remove();
    $(id).append(getAddLessonModalContent());
    $("#addLessonModal").modal();
}

//hide dialog
function hideAddLessonModal() {
    $('#addLessonModal').remove();
    $('.modal-backdrop').remove();
}







//add lesson upload dialog
function showUploadWareModal(id, content) {
    $('#uploadCourseWareModal').remove();
    $(id).append(getUploadCourseWareModalContent(content));
    $("#uploadCourseWareModal").modal();
}

//hide lesson upload dialog
function hideUploadWareModal() {
    $('#uploadCourseWareModal').remove();
    $('.modal-backdrop').remove();
}








function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};