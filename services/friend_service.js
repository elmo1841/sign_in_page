app.factory('friend_service', ['$http', function($http) {
  var self = this;

  var visible_friends_list = [];

  return ({
    setVisibleFriendList: setVisibleFriendList,
    getVisibleFriendList: getVisibleFriendList
  })

  function setVisibleFriendList() {
    $http.get('/visible_friends').then(function(response) {
      visible_friends_list = response.data;
      window.location.assign('/#/friends');
    })
  }

  function getVisibleFriendList() {
    return visible_friends_list;
  }


}]);
