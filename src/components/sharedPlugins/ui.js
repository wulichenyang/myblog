angular.module('sharedPlugins.ui', [])

	.directive('artIntroItem', [() => {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				data: '=',
			},
			template: `
			<div class="col-xs-12 col-sm-6 col-md-4">
				<div class="art-intro-wrapper">
					<div class="row">
						<a>
							<div class="col-xs-12">
								<div class="art-img-wrapper">
									<img src="{{data.artImg}}" alt="art">
								</div>
								<div class="art-content-wrapper">
									<h2>{{data.artTitle}}</h2>
									<p style="-webkit-box-orient:vertical">{{data.artIntro}}</p>
									<div class="row artist-wrapper">
										<div class="col-xs-12">
											<div>
												<img src="{{data.artistImg}}" alt="artist">
												<span>{{data.artistName}}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
    `,
		}
	}])

	.directive('songListItem', [() => {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				songListItem: '=',
				index: '=',
			},
			template: `
			<li class="song-item">
				<span class="song-number">{{index}}</span>
				<a class="song-info">
					<h4>{{songListItem.songName}}</h4>
					<h5>{{songListItem.singerName}}</h5>
				</a>
			</li>
    `,
		}
	}])

	.directive('musicListItem', [() => {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				musicListItem: '=',
				index: '=',
				audioInfo: '=',
				musicQueue: '=',
				audio: '='
			},
			template: `
			<li class="music-list-item col-sm-6 col-md-3">
				<div class="music-content">
					<div class="music-item-bg" ng-class="bgPosition(index)"></div>
					<i class="music-item-mask"></i>
					<i ui-sref="main.music.musicBox" class="music-play-icon" ng-click="playCurrentFirst(musicListItem); hideScrollBar()"></i>
					<i class="music-line"></i>
					<div class="music-item-header">
						<a ui-sref="main.music.musicBox" ng-click="playCurrentFirst(musicListItem); hideScrollBar()">
							<h4>巅峰榜</h4>
							<h3>流行指数</h3>
						</a>
					</div>
					<ul class="song-list">

						<song-list-item ui-sref="main.music.musicBox" ng-click="playSong(songListItem); addToBox(songListItem); hideScrollBar()" ng-repeat="songListItem in musicListItem track by $index" song-list-item="songListItem" index="$index + 1"></song-list-item>
						
					</ul>
				</div>
			</li>
    `,
			link: (scope, elem, attr) => {

				scope.bgPosition = index => {
					if (2 === index) {
						return 'bg-position2'
					} else if (3 === index) {
						return 'bg-position3'
					} else if (4 === index) {
						return 'bg-position4'
					}
				}

				// play song
				scope.playSong = songItem => {
					if (scope.audio.getAttribute('src') !== songItem.songSrc) {
						scope.audio.setAttribute('src', songItem.songSrc);
						scope.audio.play();
						scope.audioInfo.isPlay = true;
					} else {
						if (false === scope.audioInfo.isPlay) {
							scope.audioInfo.isPlay = true;
							scope.audio.pause();
						} else {
							scope.audioInfo.isPlay = false;
							scope.audio.play();
						}
					}
				}

				// play the first song of one block
				scope.playCurrentFirst = musicListItem => {
					if (scope.audio.getAttribute('src') !== musicListItem[0].songSrc) {
						scope.audio.setAttribute('src', musicListItem[0].songSrc);
						scope.audio.play();
						scope.audioInfo.isPlay = true;
					} else {
						if (false === scope.audioInfo.isPlay) {
							scope.audioInfo.isPlay = true;
							scope.audio.pause();
						} else {
							scope.audioInfo.isPlay = false;
							scope.audio.play();
						}
					}
				}
 
				const updateStorage = () => {
					localStorage.music = JSON.stringify(scope.musicQueue)
				}

				scope.addToBox = (songItem) => {

          // 找到并关闭播放的歌曲
					const idx = scope.musicQueue.findIndex(x => {
						return x.isPlay === true;
					})

					if(idx !== -1 && songItem.songName !== scope.musicQueue[idx].songName || null) {
						scope.musicQueue[idx].isPlay = false
					}

					// 没找到, 添加进 music box
					const song = scope.musicQueue.find(x => {
						return x.songName === songItem.songName;
					})

					if(undefined === song) {
						scope.musicQueue.unshift({
							songSrc: songItem.songSrc,
							songName: songItem.songName,
							singerName: songItem.singerName,
							// duration: songItem.duration,
							isPlay: true,
						})
						updateStorage();
					}
				}

				scope.hideScrollBar = () => {
					// hide scroll bar
					document.body.style.overflowY = 'hidden';
				}

			}
		}
	}])

	.directive('musicBoxSong', [() => {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				song: '=',
				index: '=',
				audioInfo: '=',
				musicQueue: '=',
				audio: '='
			},
			template: `
				<tr class="current-song" ng-dblclick="playThisSong(song)">
					<td>
						<span class="inner-index">{{index}}</span>
						{{song.songName}}
						<div class="inner-tool-wrapper">
							<a href="javascript:;" title="播放"><i class="inner-tool-btn inner-play"></i></a>
							<a href="javascript:;" title="添加"><i class="inner-tool-btn inner-add"></i></a>
							<a href="javascript:;" title="下载"><i class="inner-tool-btn inner-download"></i></a>
						</div>
					</td>
					<td>{{song.singerName}}</td>
					<td><span class="inner-time">{{song.duration}}</span><a href="javascript:;" title="删除"><i class="inner-delete"></i></a></td>
				</tr>	
    `,
			link: (scope, elem, attr) => {

				const updateStorage = () => {
					localStorage.music = JSON.stringify(scope.musicQueue)
				}

				// 播放歌曲
				scope.playThisSong = songItem => {
					scope.audio.setAttribute('src', songItem.songSrc);
					scope.audio.play();
					scope.audioInfo.isPlay = true;
					
          // 找到之前正在播放的歌曲
					const idx = scope.musicQueue.findIndex(x => {
						return x.isPlay === true;
					})

					// 即将播放的歌曲
					const nextIdx = scope.musicQueue.findIndex(x => {
						return x.songName === songItem.songName;
					})
					// 不同则改变播放标识
					if(idx !== nextIdx) {
						if(-1 !== idx) {
							scope.musicQueue[idx].isPlay = false;
						}
						scope.musicQueue[nextIdx].isPlay = true
					}
					// 同步localStorage
					updateStorage();
				}

				// 暂停所有
				const pauseAll = () => {
					const idx = scope.musicQueue.findIndex(x => true === x.isPlay);
					if(-1 !== idx) {
						scope.musicQueue[idx].isPlay = false;
					}
				}

				// 监听播放器停止
				scope.$watch('audioInfo.isPlay', () => {
					if(false === scope.audioInfo.isPlay) {
						pauseAll();
						updateStorage();
					}
				})

				// // play the first song of one block
				// scope.playCurrentFirst = musicListItem => {
				// 	if (audio.getAttribute('src') !== musicListItem[0].songSrc) {
				// 		audio.setAttribute('src', musicListItem[0].songSrc);
				// 		audio.play();
				// 		scope.audioInfo.isPlay = true;
				// 	} else {
				// 		if (false === scope.audioInfo.isPlay) {
				// 			scope.audioInfo.isPlay = true;
				// 			audio.pause();
				// 		} else {
				// 			scope.audioInfo.isPlay = false;
				// 			audio.play();
				// 		}
				// 	}
				// }

				// scope.hideScrollBar = () => {
				// 	// hide scroll bar
				// 	document.body.style.overflowY = 'hidden';
				// }

			}
		}
	}])