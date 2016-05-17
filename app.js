var app = angular.module('app', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {


    $routeProvider  //route provider catches all '/#' and deals with them instead of passing to server
    .when('/login', { //login page
      templateUrl: 'html/mainWindowSections/login.html',  //template html injected into ng-view
      controller: 'login_controller',                     //login injected into html
      controllerAs: 'login_ctrl',                         //names controller
      resolve: {                                          //function that needs to be resolved before app will route the html
        clear_user: function(password_check_service) {
          document.getElementById('top_row').style.display='none';
          password_check_service.logOut();
        }
      }
    })

    .when('/signup', {
      templateUrl: 'html/mainWindowSections/signup.html',
      controller: 'signup_controller',
      controllerAs: 'signup_ctrl',
      resolve: {
        hideTop: function() {
          document.getElementById('top_row').style.display='none';
        }

      }
    })

    .when('/loading', { //loading pages display while services are gathering information
      templateUrl: 'html/mainWindowSections/loading.html',
      resolve: {
        setUser: function(password_check_service, user_service) {
          var route_string = password_check_service.getRouteString();
          var log_name = password_check_service.getUserName();
          var log_string = "?username=" + log_name;
          user_service.getLoginUser(log_string, route_string);
        }
      }
    })

    .when('/loading_1', { //loading pages display while services are gathering information
      templateUrl: 'html/mainWindowSections/loading.html',
      resolve: {
        friendLists: function(friend_service) {
          friend_service.setVisibleFriendList();
        }
      }
    })

    // routing for Main pages
    .when('/profile', {
      templateUrl: 'html/mainWindowSections/profile.html',
      controller: 'profile_controller',
      controllerAs: 'profile_ctrl',
    })

    .when('/friends', {
      templateUrl: 'html/mainWindowSections/friends.html',
      controller: 'friends_controller',
      controllerAs: 'friends_ctrl',
    })

    .otherwise({redirectTo: '/login'}); //default routing

}]);


//on every route app checks to make sure a user is logged in, if not they are redirected to login pages
//exception is signup page
app.run(['$rootScope', '$location', 'password_check_service', function ($rootScope, $location, password_check_service) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (password_check_service.getLoginStatus()
            || $location.path() === '/signup') {

          if(!($location.path() === '/signup')) {
            document.getElementById('top_row').style.display='block';
          }
          console.log('ALLOW');
        }
        else {
          console.log('DENY');
          $location.path('/login');
        }
    });
}]);
