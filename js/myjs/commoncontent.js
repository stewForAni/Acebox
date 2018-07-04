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
    '      <input type="checkbox" class="custom-control-input" value="agree" name="remember_me" id="check-agree">' +
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
    '<button type="submit" class="btn btn-lg btn-success btn-block" id="register">Sign up for Acebox</button>';



var continueContent = '<div class="col-12 col-sm-6 col-md-4">' +
    '<div class="card card-lg">' +
    ' <img class="card-img-top" src="images/wait.jpg" alt="Pit Stop">' +
    '  <div class="card-body">' +
    '     <h4 class="card-title">To be continued</h4>' +
    '    <p class="card-text">More course series Stay tuned and check out our great new courses here!</p>' +
    '   <ul class="list-unstyled list-spacing-sm">' +
    '      <li>' +
    '         <i class="icon-text-document text-muted mr-1"></i>' +
    '        <a href="#">On the way</a>' +
    '   </li>' +
    '  <li>' +
    '     <i class="icon-text-document text-muted mr-1"></i>' +
    '    <a href="#">On the way</a>' +
    '</li>' +
    '<li>' +
    '   <i class="icon-text-document text-muted mr-1"></i>' +
    '  <a href="#">On the way</a>' +
    '</li>' +
    '<li>' +
    '   <i class="icon-text-document text-muted mr-1"></i>' +
    '  <a href="#">On the way</a>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</div>';



























//
//common js function
//

var modal_text1 = "LevelName or StageName or Introduction cannot be empty ! ";

var modal_text2 = "File error, must be .jpg or .png ! ";

var modal_text3 = "Account or Password cannot be empty ! ";

var modal_text4 = "UserName or Employee ID or Password cannot be empty ! ";



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
    var modalContent = '<div class="modal fade" id="myProgressModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="padding-bottom: 50px;">' +
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
        '<div class="col">' +
        '<input class="form-control form-control-lg" type="text" id="lesson_name" placeholder="Lesson Name" />' +
        '<small style="margin-top:10px">Write your lesson name.For example: lesson1</small>' +
        '</div>' +
        '</div>' +


        '<div class="form-row form-group">' +
        '<div class="col">' +
        '<input class="form-control form-control-lg" type="text" id="lesson_id" placeholder="Lesson ID" />' +
        '<small style="margin-top:10px">Write your lessonID.Can not repeat</small>' +
        '</div>' +
        '</div>' +

        '<select class="custom-select mb-2" id="lesson_type">' +
        '<option selected>Select Lesson Type</option>' +
        '<option value="Offline">Offline(单机)</option>' +
        '<option value="Interaction">Interaction(互动)</option>' +
        '</select>' +


        '<div class="form-row form-group" style="margin-top:30px">' +
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
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '<input class="form-control form-control-lg" type="text" id="log" placeholder="Write Remarks" />' +
        '<small>Write some remarks(must).</small>' +
        '</div>' +
        '</div>' +

        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '<select class="custom-select mb-2" id="coursewarelist">' +
        ' <option selected>Select one to submit</option>' +
        '  </select>' +
        '<small>Select a courseware to test.</small>' +
        '</div>' +
        '</div>' +

        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <button class="btn btn-block btn-success btn-lg" id="upload_course">Submit</button>' +
        ' </div>' +
        '</div>' +
        '</form>' +

        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}



function getChangeStatusModalContent(content) {
    var modalContent = '<div class="modal fade" id="changeStatusModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
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
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '<input class="form-control form-control-sm" type="text" id="remarks" placeholder="Write Remarks" />' +
        '<small>Write some remarks(must).</small>' +
        '</div>' +
        '</div>' +

        '<div class="custom-control custom-radio">' +
        '<input id="radio1" name="radio" type="radio" class="custom-control-input">' +
        '<label class="custom-control-label" for="radio1"><span class="badge badge-indicator badge-secondary mr-1">&nbsp;</span>Untested</label>' +
        '</div>' +

        '<div class="custom-control custom-radio">' +
        '<input id="radio2" name="radio" type="radio" class="custom-control-input">' +
        '<label class="custom-control-label" for="radio2"><span class="badge badge-indicator badge-warning mr-1">&nbsp;</span>Testing</label>' +
        '</div>' +


        '<div class="custom-control custom-radio">' +
        '<input id="radio3" name="radio" type="radio" class="custom-control-input">' +
        '<label class="custom-control-label" for="radio3"><span class="badge badge-indicator badge-danger mr-1">&nbsp;</span>Failed</label>' +
        '</div>' +

        '<div class="custom-control custom-radio">' +
        '<input id="radio4" name="radio" type="radio" class="custom-control-input">' +
        '<label class="custom-control-label" for="radio4"><span class="badge badge-indicator badge-success mr-1">&nbsp;</span>Pass Test</label>' +
        '</div>' +



        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <button class="btn btn-block btn-success btn-lg" id="submit_state">Submit</button>' +
        ' </div>' +
        '</div>' +
        '</form>' +

        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}




function getViewBugsModalContent(content) {
    var modalContent = '<div class="modal fade" id="viewBugsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        ' <div class="modal-dialog modal-dialog-centered" role="document">' +
        '  <div class="modal-content">' +
        '   <div class="modal-header">' +
        '    <h5 class="modal-title" id="exampleModalLongTitle">View Bugs</h5>' +
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




function getPicModalContent(obj) {
    var modalContent = ' <div class="modal fade" id="picModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg modal-center-viewport" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-body d-flex justify-content-center">' +
        '<div class="text-center h-75">' +
        '<img alt="Image" src="' + ACE_BASE_IMG_URL + obj.download_file + '" style="max-width:100%;max-height:500px" />' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}


function getAddModuleModalContent(content) {
    var modalContent = '<div class="modal fade" id="addMuduleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
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
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '<input class="form-control form-control-lg" type="text" id="module_name" placeholder="Module Name" />' +
        '<small>Write the name of your module.</small>' +
        '</div>' +
        '</div>' +

        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '<select class="custom-select mb-2" id="module_type">' +
        ' <option selected>Select module type</option>' +
        ' <option value="Guidance">1.Guidance</option>' +
        ' <option value="Interaction">2.Interaction</option>' +
        ' <option value="Competition">3.Competition</option>' +
        '  </select>' +
        '<small>Select a module type to create.</small>' +
        '</div>' +
        '</div>' +

        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <button class="btn btn-block btn-success btn-lg" id="confirm_add_module">Add Module</button>' +
        ' </div>' +
        '</div>' +
        '</form>' +

        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}

function getVideoModalContent(obj) {
    var modalContent = '<div class="modal fade" id="video-modal" tabindex="-1" aria-labelledby="video-modal-label" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg modal-center-viewport">' +
        '<div class="modal-content">' +
        '    <div class="embed-responsive embed-responsive-16by9">' +
        '       <video class="embed-responsive-item" src="' + obj + '" controls id="video"></video>' +
        '  </div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}

function getAnimationModalContent() {
    var modalContent = ' <div class="modal fade" id="animationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg modal-center-viewport" role="document" >' +
        '<div class="modal-content">' +
        '<div class="modal-body d-flex justify-content-center" id="animation_content" >' +

        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}


function getEditModuleModalContent(content) {
    var modalContent = '<div class="modal fade" id="editModuleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
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
        '       <input class="form-control form-control-lg" type="text" id="module_name" placeholder="' + content + ' Name" />' +
        '      </div>' +
        ' </div>' +
        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <textarea class="form-control form-control-lg" name="profileBio" rows="1" id="module_des" placeholder="Add Introduction"></textarea>' +
        '<small>Briefly introduce to this ' + content + '.</small>' +
        '</div>' +
        '</div>' +

        '<div class="form-row form-group">' +
        '<div class="col">' +
        '   <label class="custom-file mb-2" for="module_cover_input">' +
        '         <input type="file" id="module_cover_input" class="custom-file-input height-xs" accept="image/png,image/jpeg,image/jpg">' +
        '        <span class="btn btn-primary col-12" id="cover_name_span"><i class="icon-upload-to-cloud">&nbsp;</i>Upload a Cover</span>' +
        '   </label>' +
        '<p id="cover_file_name">No file has been selected yet.</p>' +
        '</div>' +
        '</div>' +

        '<div class="form-row form-group">' +
        '<div class="col">' +
        '   <label class="custom-file mb-2" for="module_pics_input">' +
        '         <input type="file" id="module_pics_input" class="custom-file-input height-xs" multiple="multiple" accept="image/png,image/jpeg,image/jpg">' +
        '        <span class="btn btn-primary col-12" id="cover_name_span"><i class="icon-upload-to-cloud">&nbsp;</i>Upload screenshots(Up to 4 pictures)</span>' +
        '   </label>' +
        '<p id="pics_file_name" style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;">No file has been selected yet.</p>' +
        '</div>' +
        '</div>' +

        '<div class="form-row form-group">' +
        '   <div class="col">' +
        '      <button class="btn btn-block btn-success btn-lg" id="edit_module">Confirm Edit</button>' +
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

function getShowModuleDetailModalContent(item) {
    var modalContent = ' <div class="modal fade" id="showModuleDetailModal" tabindex="-1" role="dialog">' +
        '<div class="modal-dialog modal-lg modal-center-viewport" role="document" >' +
        '<div class="modal-content">' +
        '<div class="modal-body" style="padding:30px;max-height:600px; overflow-y: auto;">' +

        '<div class="row">' +
        '<div class="col">' +
        '<div class="media align-items-center">' +
        '<img alt="Image" src="' + ACE_BASE_IMG_URL + item.cover + '" class="avatar avatar-lg avatar-square" style="box-shadow: 1px 1px 2px #888888;border-radius: 3px;" />' +
        '<div class="media-body">' +
        '<div class="mb-3">' +
        '<h1 class="h2 mb-2">' + item.title + '</h1>' +
        '<span>' + getTime(item.created_at) + '</span>' +
        '</div>' +
        '<div>' +
        '<ul class="list-inline text-small d-inline-block">' +
        '<li class="list-inline-item" style="color:#666666"><i class="icon-heart mr-1"></i>999+</li>' +
        '<li class="list-inline-item" style="color:#666666"><i class="icon-download mr-1"></i>999+</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="col-auto">' +
        '<button class="btn btn-primary" id="add_module"><i class="icon-download mr-2"></i>Download</button>' +
        '</div>' +
        '</div>' +


        '<div class="row" style="margin-top:30px">' +
        '<div class="col">' +
        '<small>' + item.detail + '</small>' +
        '</div>' +
        '</div>' +

        '<div class="row" style="margin-top:30px">' +
        '<div class="col">' +
        '<div class="main-carousel mb-3">' +
        '</div>' +
        '</div>' +
        '</div>' +

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
function showProgressModalCenter(id) {
    $('#myProgressModal').remove();
    $(id).append(getProgressModalContent());
    $("#myProgressModal").modal();
}

//progress dialog top
function showProgressModal(id, content) {
    $('#myProgressModal2').remove();
    $(id).append(getProgressModalContent2());
    $("#myProgressModal2").modal();
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

//add submit dialog
function showSubmitModal(id, content) {
    $('#uploadCourseWareModal').remove();
    $(id).append(getUploadCourseWareModalContent(content));
    $("#uploadCourseWareModal").modal();
}

//hide submit dialog
function hideSubmitModal() {
    $('#uploadCourseWareModal').remove();
    $('.modal-backdrop').remove();
}

//add change status dialog
function showChangeStatusModal(id, content) {
    $('#changeStatusModal').remove();
    $(id).append(getChangeStatusModalContent(content));
    $("#changeStatusModal").modal();
}

//hide change status dialog
function hideChangeStatusModal() {
    $('#changeStatusModal').remove();
    $('.modal-backdrop').remove();
}

function showViewBugsModal(id, content) {
    $('#viewBugsModal').remove();
    $(id).append(getViewBugsModalContent(content));
    $("#viewBugsModal").modal();
}

function showPicModal(id, obj) {
    $('#picModal').remove();
    $(id).append(getPicModalContent(obj));
    $("#picModal").modal();
}


function showAddModuleModal(id, obj) {
    $('#addMuduleModal').remove();
    $(id).append(getAddModuleModalContent(obj));
    $("#addMuduleModal").modal();
}


function hideAddModuleModal() {
    $('#addMuduleModal').remove();
    $('.modal-backdrop').remove();
}


function showVideoModuleModal(id, obj) {
    $('#video-modal').remove();
    $(id).append(getVideoModalContent(obj));
    $("#video-modal").modal();
}


function showAniModal(id) {
    $('#animationModal').remove();
    $(id).append(getAnimationModalContent());
    $("#animationModal").modal();
}

function showEditModuleModal(id, content) {
    $('#editModuleModal').remove();
    $(id).append(getEditModuleModalContent(content));
    $("#editModuleModal").modal();
}

function hideEditModuleModal() {
    $('#editModuleModal').remove();
    $('.modal-backdrop').remove();
}


function showModuleDetailModal(id, item) {
    $('#showModuleDetailModal').remove();
    $(id).append(getShowModuleDetailModalContent(item));
    $("#showModuleDetailModal").modal();
}


/*判断是否是空*/
function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};



/*获取1到n的随机数*/
function randomNum(n) {
    return Math.floor(Math.random() * n + 1);
}



//用中文分号替换英文分号、中英文逗号或者回车
function ReplaceSeperator(data) {
    var i;
    var result = "";
    var c;
    for (i = 0; i < data.length; i++) {
        c = data.substr(i, 1);
        if (c == "\n")
            result = result + "$";
        else if (c != "\r")
            result = result + c;
    }
    return result;
}



function AddSeperator(data) {
    var i;
    var result = "";
    var c;
    for (i = 0; i < data.length; i++) {
        c = data.substr(i, 1);
        if (c == "$")
            result = result + "<br/>";
        else if (c != "\r")
            result = result + c;
    }
    return result;
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