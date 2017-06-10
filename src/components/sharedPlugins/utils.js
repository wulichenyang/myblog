angular.module('utils', [])

	.constant('musicInitList', [
		[
			{
				songSrc: '/枫.mp3',
				songName: '枫',
				singerName: '李晨阳'
			},
			{
				songSrc: '/一路向北.mp3',
				songName: '一路向北',
				singerName: '李晨阳'
			},
			{

				songSrc: '/最长的电影.mp3',
				songName: '最长的电影',
				singerName: '李晨阳'
			},
			{
				songSrc: '/发如雪.mp3',
				songName: '发如雪',
				singerName: '李晨阳'
			},
		],
		[
			{
				songSrc: '/黑色毛衣.mp3',
				songName: '黑色毛衣',
				singerName: '李晨阳'
			},
			{
				songSrc: '/心雨.mp3',
				songName: '心雨',
				singerName: '李晨阳'
			},
			{
				songSrc: '/烟花易冷.mp3',
				songName: '烟花易冷',
				singerName: '李晨阳'
			},
			{
				songSrc: '/说好的幸福呢.mp3',
				songName: '说好的幸福呢',
				singerName: '李晨阳'
			},
		],
		[
			{
				songSrc: '/夜曲.mp3',
				songName: '夜曲',
				singerName: '李晨阳'
			},
			{
				songSrc: '/我不配.mp3',
				songName: '我不配',
				singerName: '李晨阳'
			},
			{
				songSrc: '/千里之外.mp3',
				songName: '千里之外',
				singerName: '李晨阳'
			},
			{
				songSrc: '/七里香.mp3',
				songName: '七里香',
				singerName: '李晨阳'
			},
		],
		[
			{
				songSrc: '/借口.mp3',
				songName: '借口',
				singerName: '李晨阳'
			},
			{
				songSrc: '/花海.mp3',
				songName: '花海',
				singerName: '李晨阳'
			},
			{
				songSrc: '/兰亭序.mp3',
				songName: '兰亭序',
				singerName: '李晨阳'
			},
			{
				songSrc: '/晴天.mp3',
				songName: '晴天',
				singerName: '李晨阳'
			},
		],
	])
	.factory('music.utils', [() => ({

		transformTime(seconds) {
			let m, s;
			m = Math.floor(seconds / 60);
			m = m.toString().length == 1 ? ('0' + m) : m;
			s = Math.floor(seconds - 60 * m);
			s = s.toString().length == 1 ? ('0' + s) : s;
			return m + ':' + s;
		},

    getPlayingSong(musicQueue) {
      return musicQueue.find(x => true === x.isPlay)
    },

    getSongName(musicQueue) {
      const song = this.getPlayingSong(musicQueue);
      if(undefined === song) {
        return '歌曲';
      } else {
        return song.songName;
      }
		},

    getSingerName(musicQueue) {
      const song = this.getPlayingSong(musicQueue);
      if(undefined === song) {
        return '歌手'
      }
      return song.singerName;
    },

    getCurrentTime(audio) {
      return this.transformTime(audio.currentTime);
    },

    getTotalTime(audio) {
      return this.transformTime(audio.duration);
    },

    getPrevIndex(musicQueue) {
      return musicQueue.findIndex(x => true === x.isPlay); 
    },

    updateStorage(musicQueue) {
      localStorage.music = JSON.stringify(musicQueue)
    },


	})])