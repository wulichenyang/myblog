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

	.directive('musicListItem', ['music.utils', (musicUtils) => {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				musicListItem: '=',
				index: '=',
				audioInfo: '=',
				musicQueue: '=',
				audio: '=',
				currentTime: '=',
				processBarStyle: '=',
			},
			template: `
			<li class="music-list-item col-sm-6 col-md-3">
				<div class="music-content">
					<div class="music-item-bg" ng-class="bgPosition(index)"></div>
					<i class="music-item-mask"></i>
					<i ui-sref="main.music.musicBox" class="music-play-icon" ng-click="playCurrentFirst(musicListItem)" ng-touchend="playCurrentFirst(musicListItem)"></i>
					<i class="music-line"></i>
					<div class="music-item-header">
						<a ui-sref="main.music.musicBox" ng-click="playCurrentFirst(musicListItem)" ng-touchend="playCurrentFirst(musicListItem)">
							<h4>巅峰榜</h4>
							<h3>流行指数</h3>
						</a>
					</div>
					<ul class="song-list">

						<song-list-item ui-sref="main.music.musicBox" ng-click="playSong(songListItem); updateBox(songListItem)" ng-touchend="playSong(songListItem); updateBox(songListItem)" ng-repeat="songListItem in musicListItem track by $index" song-list-item="songListItem" index="$index + 1"></song-list-item>
						
					</ul>
				</div>
			</li>
    `,
			link: (scope, elem, attr) => {

				const getSongSrc = () => {
					return scope.audio.getAttribute('src')
				}

				const setSongSrc = song => {
					scope.audio.setAttribute('src', song.songSrc);
				}

				const play = () => {
					scope.audio.play();
				}
				
				const pause = () =>{
					scope.audio.pause();
				}

				const currentTime = () => {
					return scope.audio.currentTime;
				}

				const freshTime = () => {
					scope.currentTime = musicUtils.transformTime(currentTime());
				}

				const getPrevIndex = () => {
					return scope.musicQueue.findIndex(x => true === x.isPlay); 
				}

				const getNextIndex = song => {
					return scope.musicQueue.findIndex(x => x.songName === song.songName);
				}

				const findSong = song => {
					return scope.musicQueue.find(x => {
						return x.songName === song.songName;
					})
				}

				const updataQueueState = (idx, isPlay) => {
					scope.musicQueue[idx].isPlay = isPlay;
				}

				const updateStorage = () => {
					localStorage.music = JSON.stringify(scope.musicQueue)
				}
				
				const appendQueue = (song, isPLay = true) => {
					scope.musicQueue.unshift({
							songSrc: song.songSrc,
							songName: song.songName,
							singerName: song.singerName,
							// duration: song.duration,
							isPlay: isPLay,
					});
				}

				// 只负责更新数据
				const updateNext = (song, isPlay) => {
					const idx = getNextIndex(song);
					// 队列里已有该歌曲
					if(-1 !== idx) {
						updataQueueState(idx, isPlay);
						updateStorage();
					} else {
						// 不在队列则加入并更新
						appendQueue(song);
						updateStorage();
					}
				}
				
				const updatePrev = () => {
					const idx = getPrevIndex();
					if(-1 !== idx) {
						updataQueueState(idx, false);
						updateStorage();
					}
				}

				const closeAndUpdatePrev = () =>{
					updatePrev();
					pause();
				}

				// 播放更新该歌曲
				const playAndUpdateNext = song => {
						setSongSrc(song);
						play();
						updateNext(song, true);
				}

				const deleteSong = id => {
					if(-1 !== id) {
						scope.musicQueue.splice(id, 1)
					}
				}

				const unshiftSong = song => {
					scope.musicQueue.unshift({
						songSrc: song.songSrc,
						songName: song.songName,
						singerName: song.singerName,
						// duration: song.duration,
						isPlay: true,
					})
				}

				const rankFirst = song => {
					deleteSong(getNextIndex(song))
					unshiftSong(song)
				}

				const updateProcessBar = () => {
					scope.processBarStyle = {
						'width': (scope.audio.currentTime / scope.audio.duration).toFixed(3)*100 + '%'
					}
				}

				scope.bgPosition = index => {
					return `bg-position${index}`;
				}

				// 播放选中歌曲
				scope.playSong = songItem => {
					// 播放的是其他歌曲
					if (getSongSrc() !== songItem.songSrc) {
						updatePrev();
						playAndUpdateNext(songItem);
						rankFirst(songItem);
					// 播放与之前相同歌曲
					} else if(false === scope.audio.paused) {
						updateProcessBar();
						
					}	else if (true === scope.audio.paused) {
						// 播放暂停的该歌曲
						play();
						// 更新队列
						updateNext(songItem, true);
					}
				}

				// 播放当前音乐榜榜首歌曲
				scope.playCurrentFirst = musicListItem => {
					scope.playSong(musicListItem[0]);
				}

				// scope.updateBox = songItem => {

        //   // 设置之前歌曲的播放标识
				// 	const idx = getPrevIndex();

				// 	if(idx !== -1 && songItem.songName !== scope.musicQueue[idx].songName || null) {
				// 		updataQueueState(idx, false)
				// 	}

				// 	// 没找到则将下一首添加进 music box
				// 	if(undefined === findSong(songItem)) {
				// 		scope.musicQueue.unshift({
				// 			songSrc: songItem.songSrc,
				// 			songName: songItem.songName,
				// 			singerName: songItem.singerName,
				// 			// duration: songItem.duration,
				// 			isPlay: true,
				// 		})
				// 		updateStorage();
				// 	}
				// }

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
				audio: '=',
				currentTime: '=',
			},
			template: `
				<tr ng-class="{'current-song': song.isPlay, 'current-pause': audio.paused}" ng-dblclick="playThisSong(song)" ng-touchend="playThisSong(song)">
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

				const getSongSrc = () => {
					return scope.audio.getAttribute('src')
				}

				const setSongSrc = song => {
					scope.audio.setAttribute('src', song.songSrc);
				}

				const play = () => {
					scope.audio.play();
				}
				
				const pause = () =>{
					scope.audio.pause();
				}

				const currentTime = () => {
					return scope.audio.currentTime;
				}

				const freshTime = () => {
					scope.currentTime = musicUtils.transformTime(currentTime());
				}

				const getPrevIndex = () => {
					return scope.musicQueue.findIndex(x => true === x.isPlay); 
				}

				const getNextIndex = song => {
					return scope.musicQueue.findIndex(x => x.songName === song.songName);
				}

				const findSong = song => {
					return scope.musicQueue.find(x => {
						return x.songName === song.songName;
					})
				}

				const updataQueueState = (idx, isPlay) => {
					scope.musicQueue[idx].isPlay = isPlay;
				}

				const updateStorage = () => {
					localStorage.music = JSON.stringify(scope.musicQueue)
				}
				
				const appendQueue = (song, isPLay = true) => {
					scope.musicQueue.unshift({
							songSrc: song.songSrc,
							songName: song.songName,
							singerName: song.singerName,
							// duration: song.duration,
							isPlay: isPLay,
					});
				}

				// 只负责更新数据
				const updateNext = (song, isPlay) => {
					const idx = getNextIndex(song);
					// 队列里已有该歌曲
					if(-1 !== idx) {
						updataQueueState(idx, isPlay);
						updateStorage();
					} else {
						// 不在队列则加入并更新
						appendQueue(song);
						updateStorage();
					}
				}
				
				const updatePrev = () => {
					const idx = getPrevIndex();
					if(-1 !== idx) {
						updataQueueState(idx, false);
						updateStorage();
					}
				}

				const closeAndUpdatePrev = () =>{
					updatePrev();
					pause();
				}

				// 播放更新该歌曲
				const playAndUpdateNext = song => {
						setSongSrc(song);
						play();
						updateNext(song, true);
				}

				const updateProcessBar = () => {
					scope.processBarStyle = {
						'width': (scope.audio.currentTime / scope.audio.duration).toFixed(3)*100 + '%'
					}
				}

				// 播放歌曲
				scope.playThisSong = songItem => {
          updatePrev();
					playAndUpdateNext(songItem);
				}

				// 监听播放器停止
				scope.$watch('audio.ended', () => {
					if(true === scope.audio.ended || scope.audio.paused) {
						updatePrev();
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

				// scope () => {
				// 	// hide scroll bar
				// 	document.body.style.overflowY = 'hidden';
				// }

			}
		}
	}])