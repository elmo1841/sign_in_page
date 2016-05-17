app.controller('signup_controller', ['password_check_service', '$http', function(password_check_service, $http) {

  var self = this;

  this.username = password_check_service.getUserName();

  this.user_confirmation_code = 0;
  this.enter_code = 0;

  this.name_control = password_check_service.getNameControl();
  this.password_control = false;
  this.password_confirm_control = false;
  this.email_control = false;


  this.log_in = function() {
    window.location.assign('/#/login');
  }

  this.check_new_username = function() {
    document.getElementById('username_explain').style.display='none';
    var username = document.getElementById('new_user_name').value;
    var name_string = "/username?username=" + username;

    $http.get(name_string).then(function(response) {

      if(response.data) {
        password_check_service.checkNewUsernameTaken(true, 'username_error_1', 'new_user_name');
        if(password_check_service.checkUserNameRegex()) {
          password_check_service.setNameControl(true);
        } else {
          password_check_service.setNameControl(false);
        }
      } else {
        password_check_service.setNameControl(false);
        password_check_service.checkNewUsernameTaken(false, 'username_error_1', 'new_user_name');
      }
    })
    password_check_service.setUserName(username);
    this.name_control = password_check_service.getNameControl();
    this.check_submit();
  }


  this.check_new_password = function() {
    document.getElementById('password_explain').style.display='none';
    if (password_check_service.checkPasswordRegex()) {

      this.password_control = true;
      this.check_submit();
    } else {
      password_check_service.displayError();
      this.password_control = false;
    }
  }


  this.check_new_password_confirm = function() {
    if (password_check_service.checkPasswordMatch()) {
      this.password_confirm_control = true;
      this.check_submit();
    } else {
      this.password_confirm_control = false;
    }
  }

  this.check_new_user_email = function() {
    document.getElementById('email_explain').style.display='none';
    if(this.new_user_email === null || this.new_user_email === "") {
      document.getElementById('enter_email').style.display='block';

      document.getElementById('new_user_email').style.backgroundColor='rgba(255, 100, 100, 0.5)';
      this.email_control = false;
    } else {
      document.getElementById('enter_email').style.display='none';
      document.getElementById('new_user_email').style.backgroundColor='rgba(100, 255, 100, 0.8)';
      this.email_control = true;
      this.check_submit();
    }
  }

  this.check_submit = function() {
    console.log(this. name_control);
    console.log(this. password_control);
    console.log(this. password_confirm_control);
    console.log(this. email_control);

    if(this. name_control && this.password_control &&
      this.password_confirm_control && this.email_control) {

        document.getElementById('sign_in_submit').disabled = false;
      }
  }

  this.send_email = function() {

    this.username = password_check_service.getUserName();

    var new_code = this.create_code();
    this.user_confirmation_code = new_code;


    var email_string = "/email?useraddress=" + document.getElementById('new_user_email').value
        + "&username=" + document.getElementById('new_user_name').value
        + "&usercode=" + new_code + "&password=" + document.getElementById('new_password').value;
      $http.post(email_string);

    document.getElementById('user_confirm_block').style.display='block';
    document.getElementById('sign_up_hide_1').style.display='none';
    document.getElementById('sign_up_hide_2').style.display='none';
    document.getElementById('sign_up_hide_3').style.display='none';
    document.getElementById('sign_up_hide_4').style.display='none';
    document.getElementById('sign_up_hide_5').style.display='none';

  }

  this.create_code = function() {
    return Math.floor((Math.random() * 10000) + 1);
  }

  this.check_confirmation = function(new_route_string) {
    password_check_service.setRouteString(new_route_string);
    var username_check = document.getElementById('enter_username').value;
    var code_check = document.getElementById('enter_code').value;
    var confirm_string = "/confirm_check?username=" + username_check + "&usercode=" + code_check;
    $http.get(confirm_string).then(function(response) {
      if(response.data) {
        console.log("correct");
        password_check_service.setLoginStatus(true);
        window.location.assign("/#/loading");
      } else {
        console.log("wrong");
      }
    })

  }



  this.display_explain = function(explain_id) {
    console.log('explain');
    document.getElementById(explain_id).style.display='block';
  }



}]);
