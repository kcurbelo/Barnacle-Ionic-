// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
     

// Home ========================================================================
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })  

// San Luis Obispo ========================================================================
    .state('app.SanLuisObispo', {
      url: "/SanLuisObispo",
      views: {
        'menuContent': {
          templateUrl: "templates/SanLuisObispo.html",
          controller: 'PlaylistsCtrl'
        }
      }
    }) 

// Santa Barbara ========================================================================
    .state('app.SantaBarbara', {
      url: "/SantaBarbara",
      views: {
        'menuContent': {
          templateUrl: "templates/SantaBarbara.html",
          controller: 'PlaylistsCtrl'
        }
      }
    }) 

// Ventura ========================================================================
    .state('app.Ventura', {
      url: "/Ventura",
      views: {
        'menuContent': {
          templateUrl: "templates/Ventura.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })        

// LosAngeles ========================================================================
    .state('app.LosAngeles', {
      url: "/LosAngeles",
      views: {
        'menuContent': {
          templateUrl: "templates/LosAngeles.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

// Orange County ========================================================================
    .state('app.OrangeCounty', {
      url: "/OrangeCounty",
      views: {
        'menuContent': {
          templateUrl: "templates/OrangeCounty.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

// San Diego ========================================================================
    .state('app.SanDiego', {
      url: "/SanDiego",
      views: {
        'menuContent': {
          templateUrl: "templates/SanDiego.html",
          controller: 'PlaylistsCtrl'
        }
      }
    }) 

// Suggesstion form ========================================================================
    .state('app.SuggestionForm', {
      url: "/SuggestionForm",
      views: {
        'menuContent': {
          templateUrl: "templates/SuggestionForm.html",
          controller: 'SuggestCtrl'
        }
      }
    })          

// Map ========================================================================
    .state('app.map', {
      url: "/map",
      views: {
        'menuContent': {
          templateUrl: "templates/map.html",
          controller: 'MapCtrl'
        }
      }
    }); 



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
});
