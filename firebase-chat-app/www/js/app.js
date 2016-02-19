// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('IonicChatApp', ['ionic', 'chatapp.controllers',
'chatapp.services', 'chatapp.directives', 'ngCordova',
'ngCordovaOauth', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.constant('FBURL', 'https://shk33-chat-app.firebaseio.com/')
.constant('GOOGLEKEY', '69018080854-f722la42i4l44lkjiif4ivpr1b9hcesc.apps.googleusercontent.com')
.constant('GOOGLEAUTHSCOPE', ['email'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('main', {
    url: '/',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl',
    cache: false,
    resolve: {
      'currentAuth': ['FBFactory', 'Loader',
      function(FBFactory, Loader) {
        Loader.show('Checking Auth..');
        return FBFactory.auth().$waitForAuth();
      }]
    }
  })
  .state('tab', {
    url: "/tab",
    abstract: true,
    cache: false,
    templateUrl: "templates/tabs.html"
  })
  .state('tab.dash', {
    url: '/dash',
    cache: false,
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    },
    resolve: {
      'currentAuth': ['FBFactory', function(FBFactory) {
        return FBFactory.auth().$requireAuth();
      }]
    }
  })
  .state('tab.chats', {
    url: '/chats',
    cache: false,
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    },
    resolve: {
      'currentAuth': ['FBFactory', function(FBFactory) {
        return FBFactory.auth().$requireAuth();
      }]
    }
  })
  .state('tab.account', {
    url: '/account',
    cache: false,
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    },
    resolve: {
      'currentAuth': ['FBFactory', function(FBFactory) {
        return FBFactory.auth().$requireAuth();
      }]
    }
  })
  .state('chat-detail', {
    url: '/chats/:otherUser',
    templateUrl: 'templates/chat-detail.html',
    controller: 'ChatDetailCtrl',
    cache: false,
    resolve: {
      'currentAuth': ['FBFactory', 'Loader',
      function(FBFactory, Loader) {
        Loader.show('Checking Auth..');
        return FBFactory.auth().$requireAuth();
      }]
    }
  });

  $urlRouterProvider.otherwise('/');

});
