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
				<a ng-click="" class="song-info">
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
    },
    template: `
			<li class="music-list-item col-sm-6 col-md-3">
				<div class="music-content">
					<div class="music-item-bg" ng-class="bgPosition(index)"></div>
					<i class="music-item-mask"></i>
					<i class="music-play-icon" ng-click="playCurrentFirst(musicListItem)"></i>
					<i class="music-line"></i>
					<div class="music-item-header">
						<a href="">
							<h4>巅峰榜</h4>
							<h3>流行指数</h3>
						</a>
					</div>
					<ul class="song-list">

						<song-list-item ng-click="playSong(songListItem)" ng-repeat="songListItem in musicListItem track by $index" song-list-item="songListItem" index="$index + 1"></song-list-item>
						
					</ul>
				</div>
			</li>
    `,
		link: (scope, elem, attr) => {

			// audio dom
			const audio = document.getElementById('music-audio');

			scope.bgPosition = index => {
				if(2 === index) {
					return 'bg-position2'
				} else if (3 === index) {
					return 'bg-position3'
				} else if (4 === index){
					return 'bg-position4'
				} 
			}

			scope.playSong = songItem =>{
				if(audio.getAttribute('src') !== songItem.songSrc) {
					audio.setAttribute('src', songItem.songSrc);
					audio.play();
					scope.audioInfo.ifPlay = 'true';
				} else {
						if('false' === scope.audioInfo.ifPlay){
							scope.audioInfo.ifPlay = 'true';
							audio.pause();
						} else {
							scope.audioInfo.ifPlay = 'false';
							audio.play();
						}
				}
			}
			scope.playCurrentFirst = musicListItem => {
				if(audio.getAttribute('src') !== musicListItem[0].songSrc) {
					audio.setAttribute('src', musicListItem[0].songSrc);
					audio.play();
					scope.musicAudio.ifPlay = 'true';
				} else {
							if('false' === scope.audioInfo.ifPlay){
								scope.audioInfo.ifPlay = 'true';
								audio.pause();
							} else {
								scope.audioInfo.ifPlay = 'false';
								audio.play();
							}
					}
			}
		}
  }
}])