angular.module('music', [])
  .controller('musicCtrl', ['$scope', 'musicInitList', ($scope, musicInitList) => {

    $scope.musicAudio = {
      songSrcNow: '',
      isPlay: false
    }

    const getLocalStorage = () => {
      if(localStorage.music) {
        return JSON.parse(localStorage.music);
      } else {
        return [];
      }
    }

    // fetch localStorage
    $scope.musicQueue = getLocalStorage();

    console.log($scope.musicQueue)

    // init music
    $scope.musicList = musicInitList;
    
  }])