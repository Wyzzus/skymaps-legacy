define(['backbone', 'leaflet', 'views/map', 'views/navigator'], function(Backbone, L, MapView, NavigatorView) {
	'use strict';

	return Backbone.View.extend({
		el: $('#map'),
		initialize: function() {
			this.leafletMap = new L.Map('map', {
				attributionControl: false,
				crs: L.CRS.Simple,
				zoomControl: false
			});
			this.mapNavigator = new NavigatorView({
				model: this.model
			});
			this.listenTo(this.model, 'change:location', this.open);
			this.listenTo(this.model, 'change:center', this.center);
		},
		open: function() {
			var mapView = new MapView({
				container: this.leafletMap,
				model: this.model
			});
		},
		center: function() {
			var center = this.model.get('center');
			this.leafletMap.setView([ -center.y, center.x ], 0);
		}
	});

});
