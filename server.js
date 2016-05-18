var app = require('../video-server.js'); //requires the file with all node commands
app.set('port', process.env.PORT || 3125); //sets port to listen to

var server = app.listen(app.get('port'), function() {
  console.log('server is live on ' + server.address().port); //log to console that the page is live
});
