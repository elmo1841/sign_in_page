app.controller('index_controller', ['user_service', '$http', '$scope',
  function(user_service, $http, $scope) {

  var self = this;
  this.user_in_view = "";

  //can be used to emit information down to all controllers under it
  $scope.$on('someEvent', function(event) {
    $scope.$broadcast('update');
  })
}])
