angular.module('musicBox', [])
  .controller('musicBoxCtrl', ['$scope', 'music.utils', ($scope, musicUtils) => {

    const freshSingerAndSong = (musicQueue, audio) => {
      $scope.songName = musicUtils.getSongName(musicQueue);
      $scope.singerName = musicUtils.getSingerName(musicQueue);
      if(!isNaN(audio.duration)) {
        $scope.totalTime = musicUtils.getTotalTime(audio)
      }
    }

    const getPrevIndex = () => {
      return $scope.musicQueue.findIndex(x => true === x.isPlay); 
    }

    const updataQueueState = (idx, isPlay) => {
      $scope.musicQueue[idx].isPlay = isPlay;
    }
        
    const updatePrev = (musicQueue) => {
        const idx = musicUtils.getPrevIndex(musicQueue);
        if(-1 !== idx) {
          updataQueueState(idx, false);
          musicUtils.updateStorage(musicQueue);
        }
    }

    const updateCurrentTime = audio => {
      $scope.currentTime = musicUtils.getCurrentTime(audio);
    }

    const updateTotalTime = audio => {
      $scope.totalTime = musicUtils.getTotalTime(audio);
    }

    const updateProcessBar = audio => {
      $scope.processBarStyle = {
        'width': (audio.currentTime / audio.duration).toFixed(3)*100 + '%'
      }
    }

    updateCurrentTime($scope.audio);
    updateTotalTime($scope.audio);
    freshSingerAndSong($scope.musicQueue, $scope.audio);

    // 更新歌名歌手和歌曲长度
    $scope.$watchGroup(['audio.currentSrc', 'audio.duration'], () => {
      console.log('name and time has changed')
      freshSingerAndSong($scope.musicQueue, $scope.audio);
    })

    // 更新时间/刷新进程条
    setInterval(() => {
      $scope.$apply(() => {
        if($scope.audio.ended) {
          updatePrev($scope.musicQueue);
        }
        updateCurrentTime($scope.audio);
        updateProcessBar($scope.audio);
      })
      console.log('musicQueue', $scope.musicQueue)
    }, 1000)


  }])