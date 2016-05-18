app.controller('top_bar_controller', ['user_service', '$http', '$scope', function(user_service, $http, $scope) {
  var self = this;



  /*usersettings populate the topbar with icon and screenname*/

  this.user_settings = {};

  this.getUserSettings = function(){
    this.user_settings = user_service.getUserSettings();
  }

  /*top bar navigation functions*/
  this.logOut = function() {
    window.location.assign("/#/login");
  }

  this.home = function() {
    window.location.assign("/#/main");
  }

  this.profile = function() {
    window.location.assign("/#/profile");
  }

  this.friendPage = function() {
    window.location.assign("/#/loading_1");
  }

  /*user chnages their status, broadcast to server, changed in view*/
  this.statusChange = function(status_update) {
    var update_string = "/user_status_change?status=" + status_update;

    $http.get(update_string).then(function(response) {
      if(response.data) {
        console.log('update');
      }
    })
    user_service.changeStatus(status_update);
  }



  /*innitial call when controller is created populates the user settings*/
  this.getUserSettings();
  // this.updateNumbers();
  // console.log(Number(user_service.getFriendRequests().length));
  // console.log(this.alert_number);
  // console.log(this.user_settings);




  $scope.$on('update', function(event) {
    console.log('some Event');
    $scope.updateNumbers();
    // this.request_number = user_service.getFriendRequests().length;
    // this.messages_number = user_service.getMessages().length;
    // this.alert_number = user_service.getAlert();
  })
}]);
