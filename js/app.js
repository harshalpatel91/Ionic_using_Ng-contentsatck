// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','contentstack','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(['$locationProvider', 'stackProvider','$stateProvider', '$urlRouterProvider',
    function($locationProvider, stackProvider,$stateProvider,$urlRouterProvider) {
        //$locationProvider.html5Mode(false).hashPrefix('!');
        stackProvider.initialize({
            'api_key': 'blt7863f9429b8342c3',
            'access_token': 'blt5671eb7bcd506306de3e7334',
            'environment': 'development'
        });
        $stateProvider
          .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
        })

        .state('app.overview', {
          url: '/overview',
          views: {
            'menuContent': {
              templateUrl: 'templates/overview.html'
            }
          }
        })

        .state('app.architecture', {
            url: '/architecture',
            views: {
              'menuContent': {
                templateUrl: 'templates/architecture.html'
              }
            }
          })
          .state('app.dependencyInjection', {
            url: '/dependencyInjection',
            views: {
              'menuContent': {
                templateUrl: 'templates/dependencyInjection.html'
              }
            }
          })

          .state('app.displayData', {
            url: '/displayData',
            views: {
              'menuContent': {
                templateUrl: 'templates/displayData.html'
              }
            }
          })

        .state('app.userInput', {
          url: '/userInput',
          views: {
            'menuContent': {
              templateUrl: 'templates/userInput.html'
            }
          }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/overview');
    }
]);
