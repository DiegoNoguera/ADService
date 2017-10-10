// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//var servicesModule = angular.module('starter.services', ["firebase"])
//var Auth0Cordova = require('@auth0/cordova');
//var Auth0Cordova = require('@auth0/cordova');

var app = angular.module('starter',
          [
          'ionic',
          'ngResource', 'auth0','angular-storage','angular-jwt', 'firebase','ngCordova','ngMap'//,'addCtrl' //,'headerCtrl','gservice','geolocation'
          ]
       ).constant('FIREBASE_URL', 'https://tesis-aa91c.firebaseio.com');

app.run(function(auth, $ionicPlatform) {
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
});

app.config(function($stateProvider, $urlRouterProvider,authProvider, $httpProvider, jwtInterceptorProvider) {


  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.login', {
        url: '/login',
        views: {
      'menuContent': {  templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
           }
        }
      })
  .state('app.CatEmpresa', {
    url: '/categoria/:categoriaId',
    views: {
      'menuContent': {
        templateUrl: 'templates/CatxEmpresa.html',
        controller: 'CatEmpresa'
      }
    }
  })
  .state('app.empresa', {
    url: '/empresa',
    views: {
      'menuContent': {
        templateUrl: 'templates/empresas.html',
        controller: 'Empresas'
      }
    }
  })
  .state('app.categoria', {
    url: '/categoria',
    views: {
      'menuContent': {
        templateUrl: 'templates/categoria.html',
        controller: 'Categoria'
      }
    }
  })
  .state('app.promocion', {
    url: '/promocion',
    views: {
      'menuContent': {
        templateUrl: 'templates/promociones.html',
        controller: 'Promocion'
      }
    }
  })
  .state('app.proEmpresa', {
    url: '/promocion/:promocionId',
    views: {
      'menuContent': {
        templateUrl: 'templates/promoxEmpresa.html',
        controller: 'PromoEmpresa'
      }
    }
  })
  .state('app.map', {
    url: '/map/:empresasId',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'mapController'
      }
    }
  });

  //  $urlRouterProvider.otherwise('/app/categoria');
  // if none of the above states are matched, use this as the fallback
  console.log('authProvider.init');

    authProvider.init({
      domain: AUTH0_DOMAIN,
        clientID: AUTH0_CLIENT_ID,
        //packageIdentifier: AUTH0_PACKAGE_ID,
        loginState: 'app.login'
   });

   function handleUrl(url) {
         Auth0Cordova.onRedirectUri('/app/categoria');
       }

       window.handleOpenURL = handleUrl;

 $urlRouterProvider.otherwise('/app/categoria');

   // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/account');

   jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
     var idToken = store.get('token');
     var refreshToken = store.get('refreshToken');

     if (!idToken || !refreshToken) {
       return null;
     }
     if (jwtHelper.isTokenExpired(idToken)) {
       return auth.refreshIdToken(refreshToken).then(function(idToken) {
         store.set('token', idToken);
         return idToken;
       });
     } else {
       return idToken;
     }
   }

  // $httpProvider.interceptors.push('jwtInterceptor');

}).run(function($rootScope, auth, store) {
$rootScope.$on('$locationChangeStart', function() {
  if (!auth.isAuthenticated) {
    var token = store.get('token');
    if (token) {
      auth.authenticate(store.get('profile'), token);
    }
  }

});
});
/*app.filter("join", function () {
	return function (arr, sep) {
		return arr.join(sep);
	};
});*/
