'use strict';

angular.module('app.modules', [

    // plugins
	'sharedPlugins.ui',

    // REST api
    'app.restapi',

    // utils
    'utils',

    // controller modules
    'header',
    'home',
    'main',
    'blog',
    'music',
    'musicBox',
])