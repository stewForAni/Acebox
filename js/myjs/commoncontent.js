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
    '<button  class="btn btn-lg btn-success btn-block" id="login">Sign in for Acebox</button>';



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


function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};