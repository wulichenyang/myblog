const locat = "blog-data-web";

const apolloApp = angular.module('blogApp', ['myApp']);

angular.module('myApp', ['ui.router', 'app.modules'])
	.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			// go to main page
			.state('index', {
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
						// 'controller': 'homeCtrl'
					},
				},
			})
	}])