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
    'main',
    'blog',
    'music',
    'musicBox',
])