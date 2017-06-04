'use strict';

angular.module('app.modules', [

    // plugins
	'sharedPlugins.ui',

    // REST api
    'app.restapi',

    // controller modules
    'header',
    'main',
    'blog',
    'music',
    'musicBox',
])