angular.module('musicBox', [])
  .controller('musicBoxCtrl', ['$scope', 'music.utils', ($scope, musicUtils) => {

    const getPlayingSong = () => {
      return $scope.musicQueue.find(x => true === x.isPlay)
    }

    const getSongName = () => {
      const song = getPlayingSong();
      if(undefined === song) {
        return '歌曲';
      } else {
        return song.songName;
      }
    }

    const getSingerName = () => {
      const song = getPlayingSong();
      if(undefined === song) {
        return '歌手'
      }
      return song.singerName;
    }
    
    const updateSongName = () => {
      $scope.songName = getSongName();
    }

    const updateSingerName = () => {
      $scope.singerName = getSingerName();
    }

    const freshSingerAndSong = () =>{
      updateSongName();
      updateSingerName();
      if(!isNaN($scope.audio.duration)) {
        updateTotalTime();
      }
    }

    const getCurrentTime = () => {
      return musicUtils.transformTime($scope.audio.currentTime);
    }

    const updateCurrentTime = () => {
      $scope.currentTime = getCurrentTime();
    }

    const getTotalTime = () =>{
      return musicUtils.transformTime($scope.audio.duration);
    }

    const updateTotalTime = () => {
      $scope.totalTime = getTotalTime();
    }

    const getPrevIndex = () => {
      return $scope.musicQueue.findIndex(x => true === x.isPlay); 
    }

    const updataQueueState = (idx, isPlay) => {
      $scope.musicQueue[idx].isPlay = isPlay;
    }

    const updateStorage = () => {
      localStorage.music = JSON.stringify($scope.musicQueue)
    }
        
    const updatePrev = () => {
        const idx = getPrevIndex();
        if(-1 !== idx) {
          updataQueueState(idx, false);
          updateStorage();
        }
    }

    const updateProcessBar = () => {
      $scope.processBarStyle = {
        'width': ($scope.audio.currentTime / $scope.audio.duration).toFixed(3)*100 + '%'
      }
    }

    updateCurrentTime();
    updateTotalTime();
    freshSingerAndSong();

    // 更新歌名歌手和歌曲长度
    $scope.$watchGroup(['audio.currentSrc', 'audio.duration'], () => {
      console.log('name and time has changed')
      freshSingerAndSong();
    })

    // 更新时间/刷新进程条
    setInterval(() => {
      $scope.$apply(() => {
        if($scope.audio.ended) {
          updatePrev();
        }
        updateCurrentTime();
        updateProcessBar();
      })
      console.log('musicQueue', $scope.musicQueue)
    }, 1000)


  }])