app.factory('user_service', ['$http', function($http) {
  var self = this;

  var user_in_view_setting = {"username": "", "password": "", "email": "",
        "screenname": "", "icon": "", "online": false, "status": ""};


  var user_in_view_friend = [];
  var friend_requests = [{"to": "", "from": "", "requestId": ""}];
  var messages = [{"to": "", "from": "", "messageId": ""}];
  var icons = [];


  return ({
    getLoginUser: getLoginUser,
    getUserSettings: getUserSettings,
    getFriends: getFriends,
    getFriendRequests: getFriendRequests,
    getMessages: getMessages,
    getAlert: getAlert,

    getIcons: getIcons,
    setIcons: setIcons,

    change_profile_setting: change_profile_setting,

    changeStatus: changeStatus,
  })

  /*   getLoginUser retreives the settings and friend list of the user who logged in
  called by app upon successful login or signup
  */



  function getLoginUser(log_string, route_string) {
    var setting_string = "/setting" + log_string;
    var friend_string = "/friend" + log_string;
    var friend_request_string = "/friend_requests" + log_string;
    var message_string = "/messages" + log_string;

    var new_route_string = "/#/" + route_string;

    $http.get(setting_string).then(function(response) {
      var temp_user_setting = response.data;

      user_in_view_setting.username = temp_user_setting.username;
      user_in_view_setting.password = temp_user_setting.password;
      user_in_view_setting.email = temp_user_setting.email;
      user_in_view_setting.screenname = temp_user_setting.screenname;
      user_in_view_setting.icon = temp_user_setting.icon;
      user_in_view_setting.online = true;
      user_in_view_setting.status = temp_user_setting.status;

      $http.get(friend_string).then(function(response) {
        var temp_user_friend = response.data;
        for(i = 0; i < temp_user_friend.length; i++) {
          user_in_view_friend.push(temp_user_friend[i]);
        }

        $http.get(friend_request_string).then(function(response) {
          var temp_friend_request = response.data;
          for(i=0; i < temp_friend_request.length; i ++) {
            friend_requests.push(temp_friend_request[i]);
          }

          $http.get(message_string).then(function(response) {
            var temp_messages = response.data;
            for(i=0; i < temp_messages.length; i ++) {
              messages.push(temp_messages[i]);
            }
            window.location.assign(new_route_string);
          })
        })
      })
    })
  }



/* functions called by controller to populate web page with user settings
  and friend list
*/
  function getUserSettings() {
    return user_in_view_setting;
  }
  function getFriends() {
    return user_in_view_friend;
  }
  function getFriendRequests() {
    return friend_requests;
  }
  function getMessages() {
    return messages;
  }

  function getAlert() {
    return (friend_requests.length + messages.length);
  }


  /*populates icon list for when user wants to change their icon
  */
  function getIcons() {
    return icons;
  }

  function setIcons(icon_list) {
    icons = icon_list;
    console.log(icons);
  }


  /*after successful profile setting change, controller calls for the service to change
    relevant info, then view is updated*/
  function change_profile_setting(change_type, change_vaule) {
    var display = false;
    if(change_type === 'screenname') {
      user_in_view_setting.screenname = change_vaule;
      display = true;
    }
    if(change_type === 'password') {
      user_in_view_setting.password = change_vaule;
      display = true;
    }
    if(change_type === 'email') {
      user_in_view_setting.email = change_vaule;
      display = true;
    }
    if(change_type === 'icon') {
      user_in_view_setting.icon = change_vaule;
      display = true;
    }
    return display;
  }

  /*when user updates their status, this updates the view*/
    function changeStatus(status_update) {
      user_in_view_setting.status = status_update;
    }

}]);
