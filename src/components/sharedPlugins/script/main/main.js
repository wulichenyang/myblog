angular.module('main', [])
  .controller('mainCtrl', ['$scope', ($scope) => {
    
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
    $scope.musicAudio = {
      songSrcNow: '',
      ifPlay:''
    }

  }])