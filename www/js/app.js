// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('helloDynamicMap', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	$ionicConfigProvider.navBar.alignTitle('center');
	$ionicConfigProvider.tabs.position('bottom');
	$ionicConfigProvider.backButton.text('').icon('ion-chevron-left');
	$ionicConfigProvider.backButton.previousTitleText(false);

	$stateProvider

		.state('main', {
		url: "/main",
		controller: "PlacesCtrl",
		//abstract: true,
		templateUrl: 'templates/main.html',
		resolve: {
			resultPlaces: function (findPlace, $stateParams) {
				return findPlace.all();
			}
		}
	})

	.state('place', {
		url: "/place/:placeId",
		//abstract: true,
		templateUrl: 'templates/place-tabs.html',
		controller: 'PlaceCtrl',
		resolve: {
			resultPlace: function (findPlace, $stateParams) {
				return findPlace.get($stateParams.placeId);
			}
		}
	})

	.state('place.details', {
		url: '/details',
		views: {
			'tab-details': {
				templateUrl: 'templates/details.html'
			},
		}
	})

	.state('place.map', {
		url: '/map',
		views: {
			'tab-map': {
				templateUrl: 'templates/map.html' //,
					//controller: "MapCtrl"
			}
		}
	});

	$urlRouterProvider.otherwise("/main");

})

.controller('AppCtrl', function ($scope, $state, $rootScope) {

	// button back
	$scope.goBack = function () {
		console.log("back button");
		$state.go("main");
	}
	
})

.controller('PlacesCtrl', function ($scope, $rootScope, $state, resultPlaces) {

	// Get places
	$scope.places = resultPlaces;

	// Button back
	$scope.goTabs = function () {
		$state.go("tab.map");
	}

})

.controller('PlaceCtrl', function ($scope, $rootScope, $state, resultPlace) {

	// Load place's data in scope's model
	$scope.place = resultPlace;

	// Create Map
	var map;
	document.addEventListener("deviceready", function () {
		var div = document.getElementById("map_canvas_" + resultPlace.id);

		// Initialize the map view
		map = plugin.google.maps.Map.getMap(div);

		// Wait until the map is ready status.
		map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
	}, false);

	function onMapReady() {
		var button = document.getElementById("button_" + resultPlace.id);
		button.addEventListener("click", onBtnClicked, false);
	}

	function onBtnClicked() {
		map.showDialog();
	}

})

.factory('findPlace', function ($q) {

	// list all places

	var places = [];
	places = [{
		id: "1",
		name: "Place A",
		details: "details for Place A",
		latitude: "",
		longitude: ""
	}, {
		id: "2",
		name: "Place B",
		details: "details for Place B",
		latitude: "",
		longitude: ""
	}, {
		id: "3",
		name: "Place C",
		details: "details for Place C",
		latitude: "",
		longitude: ""
	}];

	return {
		all: function () {
			var dfd = $q.defer();
			// resolve promise
			dfd.resolve(places);

			// return promise
			return dfd.promise;
		},

		get: function (placeId) {
			for (var i = 0; i < places.length; i++) {
				if (places[i].id == parseInt(placeId)) {
					return places[i];
				}
			}
			return null;
		}
	}
})

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
		setTimeout(function () {
			navigator.splashscreen.hide();
		}, 300);
	});
})