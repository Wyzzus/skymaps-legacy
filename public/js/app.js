require.config({
	paths: {
		'backbone': '../assets/backbone',
		'jquery': '../assets/jquery.min',
		'leaflet': '../assets/leaflet',
		'leaflet.label': '../assets/leaflet.label',
		'underscore': '../assets/underscore-min'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'leaflet': {
			exports: 'L'
		},
		'leaflet.label': {
			deps: ['leaflet']
		}
	}
});

require(['backbone', 'models/app', 'views/container', 'router'], function(Backbone, AppModel, ContainerView, Router) {
	'use strict';

	var appModel = new AppModel(),
		containerView = new ContainerView({ model: appModel }),
		router = new Router(appModel);

	Backbone.history.start({ pushState: true, root: '/' });
});
