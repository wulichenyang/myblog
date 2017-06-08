angular.module('musicBox', [])
  .controller('musicBoxCtrl', ['$scope', ($scope) => {

    const transformTime = seconds => {
      let m, s;
      m = Math.floor(seconds / 60);
      m = m.toString().length == 1 ? ('0' + m) : m;
      s = Math.floor(seconds - 60 * m);
      s = s.toString().length == 1 ? ('0' + s) : s;
      return m + ':' + s;
    }

    const getSongName = () => {
      const name = $scope.musicQueue.find(x => {
        return true === x.isPlay;
      })
      if(undefined === name) {
        return '歌曲';
      } else {
        return name.songName;
      }
    }
    
    const getSingerName = () => {
      const singer = $scope.musicQueue.find(x => {
        return true === x.isPlay;
      })
      if(undefined === singer) {
        return '歌手'
      }
      return singer.singerName;
    }

    let currentTime = 0;

    $scope.currentTime = '00:00';
    $scope.totalTime = '00:00';
    $scope.songName = getSongName();
    $scope.singerName = getSingerName();

    // 更新歌名和歌手
    $scope.$watchGroup(['audio.currentSrc', 'audio.duration'], () => {
      console.log('name has changed')
      $scope.songName = getSongName();
      $scope.singerName = getSingerName();
    })

    // 获得歌曲长度
    $scope.$watchGroup(['audio.currentSrc', 'audio.duration'], () => {
      console.log($scope.audio.duration)
      console.log($scope.musicAudio.isPlay)
      if(!isNaN($scope.audio.duration)) {
        $scope.totalTime = transformTime($scope.audio.duration);
      }
    })

    // 更新时间/刷新进程条
    setInterval(() => {
      currentTime = $scope.audio.currentTime;
      $scope.$apply(() => {
        if($scope.audio.ended) {
          $scope.musicAudio.isPlay = false;
        }
        $scope.currentTime = transformTime(currentTime);
        $scope.processBarStyle = {
          'width': (currentTime / $scope.audio.duration).toFixed(3)*100 + '%'
        }
      })
    }, 1000)



  }])