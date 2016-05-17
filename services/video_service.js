app.factory('video_service', ['$http', function($http) {

  var video_streams = [];

  return ({
    getVideoStreams: getVideoStreams,
    updateVideoStreams: updateVideoStreams,
  })

  function getVideoStreams() {
    return video_streams;
  }

  function updateVideoStreams(name) {
    if(video_streams == null) {
      video_streams = [name];
    } else {
      video_streams[video_streams.length] = name;
    }
  }



}]);
