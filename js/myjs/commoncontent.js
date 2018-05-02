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
        // '<div class="modal-footer">' +
        // ' <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
        // '<button type="button" class="btn btn-primary">Save changes</button>' +
        // '</div>' +
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
        // '<div class="modal-footer">' +
        // ' <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
        // '<button type="button" class="btn btn-primary">Save changes</button>' +
        // '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return modalContent;
}

function showModal(id, content) {
    $('#myWarnModal').remove();
    $(id).append(getModalContent(content));
    $("#myWarnModal").modal();
}



function showProgressModal(id) {
    $('#myProgressModal').remove();
    $(id).append(getProgressModalContent());
    $("#myProgressModal").modal();
}


function hideProgressModal() {

    var timeout = setTimeout(function() {
        $('#myProgressModal').remove();
        $('.modal-backdrop').remove();
    }, 1000);


}


function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};