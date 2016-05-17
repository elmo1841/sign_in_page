app.factory('password_check_service', ['$http', function($http) {
  var self = this;

  var login_status = false;
  var username = "";
  var name_control = true;
  var route_string = "";

  return ({
    getLoginStatus: getLoginStatus,
    setLoginStatus: setLoginStatus,
    setUserName: setUserName,
    getUserName: getUserName,
    getNameControl: getNameControl,
    setNameControl: setNameControl,
    getRouteString: getRouteString,
    setRouteString: setRouteString,

    checkNewUsernameTaken: checkNewUsernameTaken,
    checkUserNameRegex: checkUserNameRegex,

    checkCurrentPassword: checkCurrentPassword,
    checkPasswordMatch: checkPasswordMatch,
    checkPasswordRegex: checkPasswordRegex,

    displayError: displayError,
    removeError: removeError,
    logOut: logOut,
  })

  /*functions that set and return basic variables for logging in and signing up*/
  function getLoginStatus() {
    return login_status;
  }

  function setLoginStatus(new_status) {
    login_status = new_status;
  }

  function getUserName() {
    return username;
  }

  function setUserName(new_username) {
    username = new_username;
  }

  function getNameControl() {
    return name_control;
  }

  function setNameControl(name_control_status) {
    name_control = name_control_status;
  }

  function getRouteString() {
    return route_string;
  }

  function setRouteString(new_route_string) {
    route_string = new_route_string;
  }



  /*called to check when a user puts in a new username in profile or sign up*/
  function checkNewUsernameTaken(server_response, message_display, message_highlight) {

    if(server_response) {
      removeError(message_display, message_highlight);
    } else {
      displayError(message_display, message_highlight);
    }
  }

  function checkUserNameRegex() {
    console.log('here');
    if(/^([a-zA-Z0-9]{5,})$/.test(document.getElementById('new_user_name').value)) {
      removeError('username_error_2', 'new_user_name');
      return true;
    } else {
      displayError('username_error_2', 'new_user_name');
      return false;
    }
  }



  /*checks password standards on new password or password change, signup or profile*/
  function checkCurrentPassword(new_username) {
    var password = document.getElementById('current_password').value;
    var search_string = "/password?username=" + new_username + "&password=" + password;
    username = new_username;


    $http.get(search_string).then(function(response) {
      if(response.data) {
        removeError('password_error_1', 'current_password');

        if(!login_status) {
          login_status =  true;
          window.location.assign('/#/loading');
        }

      } else {
        displayError('password_error_1', 'current_password');
      }
    })
    return login_status;
  }

  function checkPasswordMatch() {
    var new_password = document.getElementById('new_password').value;
    var confirm_new_password = document.getElementById('confirm_new_password').value;

    if(new_password === confirm_new_password) {
      removeError('password_error_3', 'confirm_new_password');
      return true;
    } else {
      displayError('password_error_3', 'confirm_new_password');
      return false;
    }

  }

  function checkPasswordRegex() {
    var password_check = document.getElementById('new_password').value;
    console.log(password_check);
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$%^&*]).{4,8}$/.test(password_check)) {
    removeError('password_error_2', 'new_password');
      return true;
    } else {
      displayError('password_error_2', 'new_password');
      return false;
    }
  }


  /*display and remove error take id's from html and change style=display:*/

  function displayError(display_id, input_background) {
    document.getElementById(display_id).style.display='block';
    document.getElementById(input_background).style.backgroundColor='rgba(255, 100, 100, 0.5)';


  }

  function removeError(display_id, input_background) {
    document.getElementById(display_id).style.display='none';
    document.getElementById(input_background).style.backgroundColor='rgba(100, 255, 100, 0.8)';
  }


  /*userlogout*/
  function logOut() {
      login_status = false;
      username = "";
    }




}]);
