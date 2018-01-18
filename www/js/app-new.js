// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	$ionicConfigProvider.navBar.alignTitle('center');
	$ionicConfigProvider.tabs.position('bottom');
	$ionicConfigProvider.backButton.text('').icon('ion-chevron-left');
	$ionicConfigProvider.backButton.previousTitleText(false);

	$stateProvider

	.state('main', {
		url: "/main",
		controller: "MainCtrl",
		//abstract: true,
		templateUrl: 'templates/main.html'
	})
	.state('tab', {
		url: "/tab",
		//abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	.state('tab.details', {
		url: '/details',
		views: {
			'tab-details': {
				templateUrl: 'templates/details.html'
			},
		}
	})

	.state('tab.map', {
		url: '/map',		
		views: {
			'tab-map': {
				templateUrl: 'templates/map.html',
				controller: "MapCtrl"
			}
		}
	});
	
//	$urlRouterProvider.otherwise("/main");

})


.controller('MainCtrl', function ($scope, $rootScope, $state) {

	var map;
	document.addEventListener("deviceready", function () {
		var div = document.getElementById("map_canvas");

		// Initialize the map view
		map = plugin.google.maps.Map.getMap(div);

		// Wait until the map is ready status.
		map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
	}, false);

	function onMapReady() {
		var button = document.getElementById("button");
		button.addEventListener("click", onBtnClicked, false);
	}

	function onBtnClicked() {
		map.showDialog();
	}
	
	$scope.goTabs = function () {
		$state.go("tab.map");
	}

})

.controller('AppCtrl', function ($scope, $rootScope) {
	
	var map;
	document.addEventListener("deviceready", function () {
		var div = document.getElementById("map_canvas_b");

		// Initialize the map view
		map = plugin.google.maps.Map.getMap(div);

		// Wait until the map is ready status.
		map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
	}, false);

	function onMapReady() {
		var button = document.getElementById("button_b");
		button.addEventListener("click", onBtnClicked, false);
	}

	function onBtnClicked() {
		map.showDialog();
	}
	
	
})

.controller('MapCtrl', function ($scope, $rootScope, $state) {

	$scope.goBack = function () {
		console.log("back button");
		$state.go("main");
	}	
	
	var map;
	document.addEventListener("deviceready", function () {
		var div = document.getElementById("map_canvas_b");

		// Initialize the map view
		map = plugin.google.maps.Map.getMap(div);

		// Wait until the map is ready status.
		map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
	}, false);

	function onMapReady() {
		var button = document.getElementById("button_b");
		button.addEventListener("click", onBtnClicked, false);
	}

	function onBtnClicked() {
		map.showDialog();
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

			setTimeout(function () {
				navigator.splashscreen.hide();
			}, 300);

		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})