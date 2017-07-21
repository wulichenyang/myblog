const locat = "blog-data-web";

const apolloApp = angular.module('blogApp', ['myApp']);

angular.module('myApp', ['ui.router', 'app.modules'])
	.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			// go to main page
			.state('index', {
				'abstract': true,
				'views': {
					'header': {
						'templateUrl': locat + '/html/header/header.html',
						'controller': 'headerCtrl'
					},
				},
			})
			.state('index.home', {
				'url': '/',
				'views': {
					'content': {
						'templateUrl': locat + '/html/home/home.html',
						'controller': 'homeCtrl'
					},
				},
			})

			// main page for blog, music, ...
			.state('main', {
				'abstract': true,
				'views': {
					'header': {
						'templateUrl': locat + '/html/main/main.html',
						'controller': 'mainCtrl'
					},
				},
			})
			.state('main.blog', {
				'url': '/blog',
				'views': {
					'mainContent': {
						'templateUrl': locat + '/html/main/blog/blog.html',
						'controller': 'blogCtrl'
					},
				},
			})
			.state('main.music', {
				'url': '/music',
				'views': {
					'mainContent': {
						'templateUrl': locat + '/html/main/music/music.html',
						'controller': 'musicCtrl'
					},
				},
			})
			.state('main.music.musicBox', {
				'url': '/musicBox',
				'views': {
					'musicBoxContent': {
						'templateUrl': locat + '/html/main/music/musicBox.html',
						'controller': 'musicBoxCtrl'
					},
				},
			})
	}])