

// all required modules listed in package
var express = require('express');
var bodyParser = require('body-parser');
// var fs = require('fs');
// var fd = require('fd');
var path = require('path');
var http = require('http');
var url = require('url');
var methodOverride = require('method-override');
var nodemailer = require('nodemailer');
var app = express();


//node modules used
app.use(express.static(path.join(__dirname + '/')));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
module.exports = app;
//set up express router
var router = express.Router();


//set of users to test the page
var default_login = [
  {"username": "admin", "password": "password"},
  {"username": "oneone", "password": "two"},
  {"username": "BENKIL",  "password": "BENKIL"},
  {"username": "billie",  "password": "billie"},
  {"username": "ono1123",  "password": "ono1123"},
  {"username": "carlbb",  "password": "carlbb"},
  {"username": "gehah89",  "password": "gehah89"},
  {"username": "xxxsdr",  "password": "xxxsdr"},
  {"username": "ghostboy",  "password": "ghostboy"},
  {"username": "holdover",  "password": "holdover"},
  {"username": "jiminie",  "password": "jiminie"},
  {"username": "harry_potter",  "password": "harry_potter"},
  {"username": "hopalong",  "password": "hopalong"},
  {"username": "tupack",  "password": "tupack"},
  {"username": "shitty",  "password": "shitty"},
  {"username": "kennywayne",  "password": "kennywayne"},
  {"username": "username",  "password": "username"},
  {"username": "pickfour",  "password": "pickfour"},
  {"username": "no_name",  "password": "no_name"},
  {"username": "OMGOMG",  "password": "OMGOMG"}
];

//settings for each user page
var user_setting = [
  {"username": "admin", "password": "password", "email": "xxx@zz.yyy", "screenname": "Admin105", "icon": "images/icons/Spider-Man Old-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "oneone", "password": "password", "email": "xxx@zz.yyy", "screenname": "three", "icon": "images/icons/OptinMonster-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "BENKIL", "password": "password", "email": "xxx@zz.yyy", "screenname": "BENKIL", "icon": "images/icons/AngelList-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "billie", "password": "password", "email": "xxx@zz.yyy", "screenname": "billie", "icon": "images/icons/Black Tie-48.png", "online": false, "status": "offline", "visible": false},
  {"username": "ono1123", "password": "password", "email": "xxx@zz.yyy", "screenname": "ono1123", "icon": "images/icons/Cylon Head New-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "carlbb", "password": "password", "email": "xxx@zz.yyy", "screenname": "carlbb", "icon": "images/icons/Drupal-48.png", "online": false, "status": "offline", "visible": false},
  {"username": "gehah89", "password": "password", "email": "xxx@zz.yyy", "screenname": "gehah89", "icon": "images/icons/Hangar-48.png", "online": false, "status": "offline"},
  {"username": "xxxsdr", "password": "password", "email": "xxx@zz.yyy", "screenname": "xxxsdr", "icon": "images/icons/Hellraiser Pinhead-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "ghostboy", "password": "password", "email": "xxx@zz.yyy", "screenname": "ghostboy", "icon": "images/icons/Jason Voorhees-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "holdover", "password": "password", "email": "xxx@zz.yyy", "screenname": "holdover", "icon": "images/icons/Opencart-48.png", "online": false, "status": "offline", "visible": false},
  {"username": "jiminie", "password": "password", "email": "xxx@zz.yyy", "screenname": "jiminie", "icon": "images/icons/Pied Piper 2-48.png", "online": false, "status": "offline", "visible": false},
  {"username": "harry_potter", "password": "password", "email": "xxx@zz.yyy", "screenname": "harry_potter", "icon": "images/icons/Pied Piper-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "hopalong", "password": "password", "email": "xxx@zz.yyy", "screenname": "hopalong", "icon": "images/icons/Sauce-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "tupack", "password": "password", "email": "xxx@zz.yyy", "screenname": "tupack", "icon": "images/icons/SlideShare-48.png", "online": false, "status": "offline", "visible": false},
  {"username": "shitty", "password": "password", "email": "xxx@zz.yyy", "screenname": "shitty", "icon": "images/icons/Space Shuttle-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "kennywayne", "password": "password", "email": "xxx@zz.yyy", "screenname": "kennywayne", "icon": "images/icons/Spawn-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "username", "password": "password", "email": "xxx@zz.yyy", "screenname": "username", "icon": "images/icons/Spider-Man Head-48.png", "online": false, "status": "offline", "visible": true},
  {"username": "pickfour", "password": "password", "email": "xxx@zz.yyy", "screenname": "pickfour", "icon": "images/icons/Subway-48.png", "online": false, "status": "offline", "visible": false},
  {"username": "no_name", "password": "password", "email": "xxx@zz.yyy", "screenname": "no_name", "icon": "images/icons/Superman-48.png", "online": false, "status": "offline", "visible": false},
  {"username": "OMGOMG", "password": "password", "email": "xxx@zz.yyy", "screenname": "OMGOMG", "icon": "images/icons/Thruster-48.png", "online": false, "status": "offline", "visible": true}
];

//friends list for each user
var friend_lists = [
  {"username": "admin", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "oneone", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "BENKIL", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "billie", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "ono1123", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "carlbb", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "gehah89", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "xxxsdr", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "ghostboy", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "holdover", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "jiminie", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "harry_potter", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "hopalong", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "tupack", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "shitty", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "kennywayne", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "username", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "pickfour", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "no_name", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]},
  {"username": "OMGOMG", "friends": ["oneone", "BENKIL", "ono1123", "gehah89", "tupack", "no_name"]}
]

//list of all icons that users can set
var icon_list = [
  {'icon': '../../images/icons/AngelList-48.png'},
  {'icon': '../../images/icons/Black Tie-48.png'},
  {'icon': '../../images/icons/Cylon Head New-48.png'},
  {'icon': '../../images/icons/Drupal-48.png'},
  {'icon': '../../images/icons/gramphone-128.png'},
  {'icon': '../../images/icons/Hangar-48.png'},
  {'icon': '../../images/icons/Hellraiser Pinhead-48.png'},
  {'icon': '../../images/icons/Jason Voorhees-48.png'},
  {'icon': '../../images/icons/Logo_256.png'},
  {'icon': '../../images/icons/Opencart-48.png'},
  {'icon': '../../images/icons/OptinMonster-48.png'},
  {'icon': '../../images/icons/pacman.png'},
  {'icon': '../../images/icons/Pied Piper 2-48.png'},
  {'icon': '../../images/icons/Pied Piper-48.png'},
  {'icon': '../../images/icons/retro_mushroom.jpg'},
  {'icon': '../../images/icons/Sauce-48.png'},
  {'icon': '../../images/icons/SlideShare-48.png'},
  {'icon': '../../images/icons/Space Shuttle-48.png'},
  {'icon': '../../images/icons/Spawn-48.png'},
  {'icon': '../../images/icons/Spider-Man Head-48.png'},
  {'icon': '../../images/icons/Spider-Man Old-48.png'},
  {'icon': '../../images/icons/Subway-48.png'},
  {'icon': '../../images/icons/Superman-48.png'},
  {'icon': '../../images/icons/Thruster-48.png'},
  {'icon': '../../images/icons/Viacoin-48.png'}
]

//when nerw user signs up, information is stored here until they enter confirmation code
var temp_users = []
//stores name of new users to put into input box
var confirmation_username = ""


//returns icon list to service for display in html
app.get('/icon_list', function(req, res) {
  res.send(icon_list);
})


//checks username against username/password combo to confirm login
//  each http call uses url_parts:
//  '/xxx' to route request
//  '?xxx=yyy' as additional parts
//  '&' separates additional pieces
//  url parse separates each one to an item that can be called like an object
app.get('/password', function(req, res) {
  var url_parts = url.parse(req.url, true)
  var query = url_parts.query;
  var returner = false;
  default_login.forEach(function(o){
    if(o.username === query.username && o.password === query.password) {
      returner = true;
    }
  })
  res.send(returner); //response sent back to requester
  //all work done in the server so that username/passwords are not sent to the page
})



// on user login, user settings are packaged into an object and delivered
// url request carries username
app.get('/setting', function(req, res) {
  var url_parts = url.parse(req.url, true)
  var query = url_parts.query;
  var user_to_send = {"username": "", "password": "", "email": "", "screenname": "",
      "icon": "", "online": false, "status": ""};
  user_setting.forEach(function(o){
      if(o.username === query.username) {
        user_to_send.username = o.username;
        user_to_send.password = o.password;
        user_to_send.email = o.email;
        user_to_send.screenname = o.screenname;
        user_to_send.icon = o.icon;
        user_to_send.online = o.online;
        user_to_send.status = o.status;
      };
    });
  res.send(user_to_send);
})



// on user login, user friend list is packaged into an object and delivered
// url request carries username
app.get('/friend', function(req, res) {
  var url_parts = url.parse(req.url, true)
  var query = url_parts.query;
  var user_to_send = [];
  //search through the users to find the appropriate list
  friend_lists.forEach(function(o) {
      if(o.username === query.username) {
        for(i = 0; i < o.friends.length; i++) {
          for(j = 0; j < user_setting.length; j++) {
            if(o.friends[i] === user_setting[j].username) {
              var friend_to_push = {"screenname": "", "icon": "", "online": false, "status": ""};
              friend_to_push.screenname = user_setting[j].screenname;
              friend_to_push.icon = user_setting[j].icon;
              friend_to_push.online = user_setting[j].online;
              friend_to_push.status = user_setting[j].status;
              user_to_send.push(friend_to_push);
            }
          }
        }
      };
    });
  res.send(user_to_send);
})


//searches through possible new user names to see if the one in the url is taken
//sends back a boolean based on availibility
app.get('/username', function(req, res) {
  var url_parts = url.parse(req.url, true)
  var query = url_parts.query;
  var taken = true;
  default_login.forEach(function(o) {
    if(o.username === query.username) {
      taken = false;
    }
  })
  res.send(taken);
})



//post function takes new user information and sends confirmation email
app.post('/email', function(req, res) {
  //nodemailer smtpConfig to send out emails
  var smtpConfig = {
    service: "Gmail",
    auth: {
        user: "ecsu.software.project@gmail.com",
        pass: "softwareprojectECSU"
      }
  };
  //transport object created based on smtpConfig variables
  var smtpTransport = nodemailer.createTransport(smtpConfig);
  //url information passed to mailer
  var url_parts = url.parse(req.url, true)
  var query = url_parts.query;
  var mailData = {
    from: 'ecsu.software.project@gmail.com',
    to: query.useraddress,
    subject: 'Video Chat Sign Up',
    text: query.usercode,
  };
  //nodemailer sends out email
  smtpTransport.sendMail(mailData, function(error, response){
   if(error){
    //in a '/get' function this could be used with a boolean to alert that the email is not valid
    console.log(error);
   }else{
    //logs that email was successful
    console.log("Message sent: " + response.message);
    //if successful a new user is added to new user array
    var new_temp_user = {"username": query.username, "usercode": query.usercode,
      "email": query.useraddress, "screenname": query.username, "password": query.password};
    if(temp_users == null) {
      temp_users = [new_temp_user];
    } else {
      temp_users[temp_users.length] = new_temp_user;
    }
   }
  });
  //close nodemailer transport
  smtpTransport.close();
})


//new user puts in confirmation code
app.get('/confirm_check', function(req, res) {
  var url_parts = url.parse(req.url, true)
  var query = url_parts.query;
  var returner = false;
  //check new user array and match to stored confirmation number
  temp_users.forEach(function(o){
    if(o.username === query.username && o.usercode === query.usercode) {
      returner = true;
      newUser(o.username);
    }
  })
  res.send(returner);
})



//on email confirmation a new user is added to the system
app.post('/new_user', function(req, res) {
  var url_parts = url.parse(req.url, true)
  var query = url_parts.query;
  var new_user_to_push = {"username": query.username,
    "password": query.password};
  var new_user_settings = {"username": query.username,
    "screenname": ""};
  default_login.push(new_user_to_push); //added to list for login confirmation
  user_setting.push(new_user_settings); //added to list for setings
})



//change to user status so that friends can be updated
app.get('/user_status_change', function(req, res) {
  var url_parts = url.parse(req.url, true)
  var query = url_parts.query;
  res.send(true);
})


//change to user profile so that friends can be updated
app.post('/user_profile_change', function(req, res) {
  var url_parts = url.parse(req.url, true)
  var query = url_parts.query;
  res.send(true);
})

//request all searchable people on the network
app.get('/visible_friends', function(req, res) {
  var visible_friends = [];
  user_setting.forEach(function(o){
    if(o.visible) {
      var friend_to_push = {"username": o.username, "icon": o.icon};
      if(visible_friends == null) {
        visible_friends = [friend_to_push];
      } else {
        visible_friends[visible_friends.length] = friend_to_push;
      }
    }
  })
  console.log(visible_friends);
  res.send(visible_friends);
})


//function to create new user
var newUser = function(username) {
  temp_users.forEach(function(o){
    if(o.username === username) {
      var user_to_send = {"username": "", "password": "", "email": "", "screenname": "",
          "icon": "", "online": true, "status": ""};

            user_to_send.username = o.username;
            user_to_send.password = o.password;
            user_to_send.email = o.email;
            user_to_send.screenname = o.username;
            user_to_send.icon = "";
            user_setting.push(user_to_send);
    }
  })
}
