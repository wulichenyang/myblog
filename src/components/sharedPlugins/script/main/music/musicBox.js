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
      return name.songName;
    }
    
    const getSingerName = () => {
      const singer = $scope.musicQueue.find(x => {
        return true === x.isPlay;
      })
      return singer.singerName;
    }

    const audio = document.querySelector('audio');
    let currentTime = 0;

    $scope.currentTime = '00:00';
    $scope.totalTime = '00:00';
    $scope.songName = getSongName();
    $scope.singerName = getSingerName();

    // 获得歌曲长度
    setInterval(() => {
      console.log(audio.duration)
      if(!isNaN(audio.duration)) {
        $scope.totalTime = transformTime(audio.duration);
      }
    }, 1000)

    // 更新时间/刷新进程条
    setInterval(() => {
      currentTime = audio.currentTime;
      $scope.$apply(() => {
        $scope.currentTime = transformTime(currentTime);
        $scope.processBarStyle = {
          'width': (currentTime / audio.duration).toFixed(3)*100 + '%'
        }
      })
    }, 1000)



  }])