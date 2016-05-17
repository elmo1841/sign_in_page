app.controller('profile_controller', ['user_service', 'password_check_service', '$http', '$scope',
  function(user_service, password_check_service, $http, $scope) {
  var self = this;

  this.current_password = false;
  this.password_control = false;
  this.password_confirm_control = false;

  this.icons = user_service.getIcons();

  this.user_settings = user_service.getUserSettings();

  this.change = function(x) {
    document.getElementById(x).style.display='block';
  }

  this.submit = function(change_type, new_value, display_value) {
    // document.getElementById(y).style.display='none';
    if(change_type === 'icon') {
      var change_vaule = new_value;
    } else {
      var change_vaule = document.getElementById(new_value).value;
    }
    var change_string = "/user_profile_change?type=" + change_type + "&change=" + change_vaule;
    console.log(change_string);
    $http.post(change_string);
    if(user_service.change_profile_setting(change_type, change_vaule)) {
      console.log('return');
      document.getElementById(display_value).style.display='none';
    }

  }

  this.check_current_password = function() {
    if (password_check_service.checkCurrentPassword(this.user_settings.username)) {
      this.current_password = true;
      checkPasswordSubmit(this.password_confirm_control, this.password_control,
           this.current_password);
    } else {
      this.current_password = false;
    }
  }


  this.check_new_password = function() {
    if (password_check_service.checkPasswordRegex()) {
      this.password_control = true;
      checkPasswordSubmit(this.password_confirm_control, this.password_control,
           this.current_password);
    } else {
      this.password_control = false;
    }
  }


  this.check_new_password_confirm = function() {
    if (password_check_service.checkPasswordMatch()) {
      this.password_confirm_control = true;
      checkPasswordSubmit(this.password_confirm_control, this.password_control,
           this.current_password);
    } else {
      this.password_confirm_control = false;
    }
  }

  var checkPasswordSubmit = function(x, y, z) {
    if(x, y, z) {
      document.getElementById('profile_password_submit').disabled = false;
    }
  }

  this.change_icon = function() {
    this.icons = user_service.getIcons();
    document.getElementById('change_icon').style.display='block';
  }

  this.getIcons = function() {
    $http.get('/icon_list').then(function(response) {
      console.log(response.data);
      user_service.setIcons(response.data);
    })
  }
  this.getIcons();
}]);
