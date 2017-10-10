app.controller('AppCtrl', function($scope, $ionicModal, $timeout,$location, $scope, $http, $rootScope,$ionicSideMenuDelegate,auth, $state, store) {
  console.log('auth', auth);
    $scope.profile = auth.profile;
  $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
  //    $ionicNavBarDelegate.show(true);
    }

    $scope.logout = function() {
      auth.signout();
      store.remove('token');
      store.remove('profile');
      store.remove('refreshToken');
      console.log('$state.go');
      //$state.go('app.login');
       $state.go('app.login');
    }
  // Form data for the login modal
/*  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };*/

  // Open the login modal
/*  $scope.login = function(user) {
    //$scope.modal.show();
    //function(user) {
      $http.get('http://127.0.0.1:3000/login', user)
        .success(function(response) {
          $rootScope.currentUser = response;
          $location.url("/profile");
        });
//}
  }; */
/*  $scope.login = function(user) {
      $scope.modal.show();
}
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };*/
});
/*app.controller("LoginCtrl", function($location, $scope, $http, $rootScope) {
  $scope.login = function(user) {
    $http.post('/login', user)
      .success(function(response) {
        $rootScope.currentUser = response;
        $location.url("/profile");
      }); */


app.controller('Categoria',function($scope,$http,$stateParams,auth){

//console.log($scope.profile.identities[0].user_id);
    	$http.get('https://frozen-ridge-27058.herokuapp.com/categoriaListRoute').success(function(response){

    	  console.log("I got the data i requested for Bugs", response);

      	  $scope.categoria = response;



      //  $scope.categoria= "";

    	}); });
app.controller('CatEmpresa',function($scope,$http,$stateParams,auth){

            var currentId = $stateParams.categoriaId;
            console.log($stateParams.categoriaId);

          	$http.get('https://frozen-ridge-27058.herokuapp.com/categoriaListRoute/'+currentId).success(function(response){

          	  console.log("I got the data i requested for Bugs", response);

            	  $scope.empresas = response;



            //  $scope.categoria= "";

          	}); });
app.controller('Empresas',function($scope,$http,$stateParams, auth){


                	$http.get('https://frozen-ridge-27058.herokuapp.com/empresas').success(function(response){

                	  console.log("I got the data i requested for Bugs", response);

                  	  $scope.empresa = response;



                  //  $scope.categoria= "";

                	}); });

  app.controller('empresaServlist',function($scope,$http,$stateParams,auth){
                              var currentId = $stateParams.empresasId;
                              console.log($stateParams.empresasId);

                            	$http.get('https://frozen-ridge-27058.herokuapp.com/servicioList/'+currentId).success(function(response){

                            	  console.log(response);

                              	  $scope.servicio = response;



                              //  $scope.categoria= "";
}); });

app.controller('Promocion',function($scope,$http,$stateParams,auth){


      $http.get('https://frozen-ridge-27058.herokuapp.com/promocion').success(function(response){

        console.log("I got the data i requested for Bugs", response);

          $scope.promociones = response;



      //  $scope.categoria= "";

      }); });
app.controller('PromoEmpresa',function($scope,$http,$stateParams,auth){
                  var currentId = $stateParams.promocionesId;
                  console.log($stateParams.promocionesId);

                	$http.get('https://frozen-ridge-27058.herokuapp.com/promocion/'+currentId).success(function(response){

                	  console.log("I got the data i requested for Bugs", response);

                  	  $scope.empresas = response;
}); });

app.controller('favorito',function($scope,$http,$stateParams, auth){
                  var currentId = $stateParams.empresasId;
                  console.log($stateParams.empresasId);

                	$http.put('https://frozen-ridge-27058.herokuapp.com/empresa/'+currentId).success(function(response){

                	  console.log("I got the data i requested for Bugs", response);
                    $scope.alert = "Favoritos agregada Sastifactoriamente";
                  	  $scope.empresas = response;
}); });

//Iniciar sesion con Auth y Firebase
app.controller('LoginCtrl', function($scope, auth, $state, $location, store) {
  console.log('LoginCtrl');

  function doAuth() {
     auth.signin({
       closable: false,
       // This asks for the refresh token
       // So that the user never has to log in again
       authParams: {
         scope: 'openid offline_access'
       }
     }, function(profile, idToken, accessToken, state, refreshToken) {
       store.set('profile', profile);
       store.set('token', idToken);
       store.set('refreshToken', refreshToken);
       console.log('auth.getToken({api:firebase})');
       auth.getToken({
         api: 'firebase'
       }).then(function(firebaseToken) {
         console.log('setting firebaseToken', firebaseToken.id_token);
         store.set('firebaseToken', firebaseToken.id_token);
          // Users.getOrCreate(profile);
       });

       $state.go('app.categoria');
     }, function(error) {
       console.log("There was an error logging in", error);
     });
   }

   $scope.$on('$ionic.reconnectScope', function() {
     doAuth();
   });

   doAuth();


});


app.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, auth) {

 var options = {timeout: 10000, enableHighAccuracy: true};
 console.log(options);
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      console.log(position);
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

$http.get('https://frozen-ridge-27058.herokuapp.com/empresa/' +Id , {params: params})

google.maps.event.addListenerOnce($scope.map, 'idle', function(){
    console.log('hola');
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });

});

 var infoWindow = new google.maps.InfoWindow({
      content: "Here I am!"
  });

 google.maps.event.addListener(Marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });

  }, function(error){
    console.log("Could not get location");
  });


});

app.controller("mapController", function ($scope, EmpresaService, $stateParams,$http, auth, $cordovaGeolocation, $filter) {
	$scope.yelp = EmpresaService;


//  console.log($scope.yelp.results[1]);
//   console.log(EmpresaService.results[1]);
//  console.log($stateParams.empresasId);
var newTemp = [];
newTemp = $filter("filter")(EmpresaService.results, {_id:$stateParams.empresasId});
console.log(newTemp);
$scope.empresa = newTemp;
console.log($scope.empresa);
	$scope.doRefresh = function () {
		if (!$scope.yelp.isLoading) {
			$scope.yelp.refresh().then(function () {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	};

	$scope.loadMore = function () {
		console.log("loadMore");
		if (!$scope.yelp.isLoading && $scope.yelp.hasMore) {
			$scope.yelp.next().then(function () {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	};

	$scope.getDirections = function (empresa) {
    console.log(empresa.empresaname);
		console.log("Getting directions for empresa");
		var destination = [
			empresa.location[1],
      empresa.location[0]
		];
console.log(destination);
		var source = [
			$scope.yelp.lat,
			$scope.yelp.lon
		];

		launchnavigator.navigate(destination, source);
	};


});
