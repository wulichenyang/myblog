angular.module('music', [])
  .controller('musicCtrl', ['$scope', 'musicInitList', 'music.utils', ($scope, musicInitList, musicUtils) => {

    $scope.audio = document.querySelector('audio');
    
    $scope.musicAudio = {
      songSrcNow: '',
      isPlay: false
    }

    // fetch localStorage
    $scope.musicQueue = musicUtils.getLocalStorage();

    // init music
    $scope.musicList = musicInitList;
    
    // listen to scroll bar
    window.onpopstate = (e) => {
      if(location.hash.includes('musicBox')) {
        musicUtils.toggleScrollBar(false);
      } else {
        musicUtils.toggleScrollBar(true);
      }
    }


  }])