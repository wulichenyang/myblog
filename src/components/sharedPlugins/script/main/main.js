angular.module('main', [])
  .controller('mainCtrl', ['$scope', ($scope) => {
    
    $scope.audio = document.getElementById('music-audio');

    $scope.musicAudio = {
      songSrcNow: '/最长的电影.mp3',
      ifPlay:'false'
    }
    
    $scope.musicList = [
      [
        {
          songName: '枫',
          singerName: '李晨阳'
        },
        {
          songName: '一路向北',
          singerName: '李晨阳'
        },
        {
          songName: '最长的电影',
          singerName: '李晨阳'
        },
        {
          songName: '发如雪',
          singerName: '李晨阳'
        },
      ],
      [
        {
          songName: '枫',
          singerName: '李晨阳'
        },
        {
          songName: '一路向北',
          singerName: '李晨阳'
        },
        {
          songName: '最长的电影',
          singerName: '李晨阳'
        },
        {
          songName: '发如雪',
          singerName: '李晨阳'
        },
      ],
      [
        {
          songName: '枫',
          singerName: '李晨阳'
        },
        {
          songName: '一路向北',
          singerName: '李晨阳'
        },
        {
          songName: '最长的电影',
          singerName: '李晨阳'
        },
        {
          songName: '发如雪',
          singerName: '李晨阳'
        },
      ],
      [
        {
          songName: '枫',
          singerName: '李晨阳'
        },
        {
          songName: '一路向北',
          singerName: '李晨阳'
        },
        {
          songName: '最长的电影',
          singerName: '李晨阳'
        },
        {
          songName: '发如雪',
          singerName: '李晨阳'
        },
      ],
    ]

  }])