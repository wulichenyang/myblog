angular.module('musicBox', [])
  .controller('musicBoxCtrl', ['$scope', 'music.utils', ($scope, musicUtils) => {

    const freshSingerAndSong = (musicQueue, audio) => {
      $scope.songName = musicUtils.getSongName(musicQueue);
      $scope.singerName = musicUtils.getSingerName(musicQueue);
      if(!isNaN(audio.duration)) {
        $scope.totalTime = musicUtils.getTotalTime(audio)
      }
    }

    const updateQueueState = (idx, isPlay) => {
      $scope.musicQueue[idx].isPlay = isPlay;
    }
        
    const updatePrev = (musicQueue, audio) => {
        const idx = musicUtils.getPrevIndex(musicQueue, audio);
        if(-1 !== idx) {
          updateQueueState(idx, false);
          musicUtils.updateStorage(musicQueue);
        }
    }
    const playAndOnNext = idx => {
        $scope.audio.setAttribute('src', $scope.musicQueue[idx].songSrc);
        updateQueueState(idx, true);
        $scope.audio.play();
        musicUtils.updateStorage($scope.musicQueue);
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

    const process = document.getElementById('process');

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
          updatePrev($scope.musicQueue, $scope.audio);
        }
        updateCurrentTime($scope.audio);
        updateProcessBar($scope.audio);
      })
      console.log('musicQueue', $scope.musicQueue)
    }, 1000)

    $scope.toggleSong = () => {
      if($scope.audio.paused && '' !== $scope.audio.currentSrc) $scope.audio.play()
      else $scope.audio.pause();
    }

    $scope.prevOrNext = isPrev => {
      const len = $scope.musicQueue.length;
      if(len > 1) {
        let idx = musicUtils.getPrevIndex($scope.musicQueue, $scope.audio);
        updatePrev($scope.musicQueue, $scope.audio);
        if(isPrev) {
          idx = (idx + len - 1) % len;
        } else {
          idx = (idx + len + 1) % len;
        }
        playAndOnNext(idx);
      }
    }

    $scope.changeTime = e => {
      let toWidth = e.offsetX;
      let totalWidth = process.offsetWidth;

      if(!isNaN($scope.audio.duration)) {
        if(totalWidth < 0) {
          $scope.audio.currentTime = 0;
        } else {
          $scope.audio.currentTime = (toWidth / totalWidth) * $scope.audio.duration;
        }
        updateCurrentTime($scope.audio);
        updateProcessBar($scope.audio);
      }
    }

    // listen to process bar
    window.onpopstate = (e) => {
      if(location.hash.includes('musicBox')) updateProcessBar($scope.audio)
      else return;
    }

  }])