app.controller('login_controller', ['password_check_service', function(password_check_service) {

  var self = this;

  this.user_name = "";
  this.user_password = "";

  //takes in username and password to verify for login
  this.authenticate = function(new_route_string) {
    password_check_service.setRouteString(new_route_string);
    password_check_service.checkCurrentPassword(this.user_name, this.user_password);
  }

  this.sign_up = function() {
    window.location.assign('/#/signup');
  }



}]);
