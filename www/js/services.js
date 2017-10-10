app.factory('Profile', function ($resource) {
    return $resource('http://127.0.0.1:3000/categoriaListRoute');
});
app.factory('Profiles', function ($resource) {
    return $resource('http://127.0.0.1:3000/categoriaListRoute/:id');
});


app.service('Users', function($state, $q, $http, FIREBASE_URL, $firebase, $rootScope, store) {

  var usersRef = new Firebase(FIREBASE_URL + '/users');
  usersRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      $state.go('login');
    }
  });

  var usersSync = $firebase(usersRef);
  var users = usersSync.$asArray();

  // function initialize() {
  //   console.log('Users::initialize');
  //   var deferred = $q.defer();
  //
  //   usersRef.once('value',
  //       function(snapshot) {
  //           var exists = (snapshot.val() !== null);
  //           console.log('Users::exists', exists);
  //           if(exists) {
  //               console.log('usersSync', usersSync);
  //               users = usersSync.$asArray();
  //               console.log('Data::initialize() users', users);
  //               users.$loaded().then(function(list) {
  //                 console.log('UsersServiceReady');
  //                 $rootScope.$broadcast('UsersServiceReady');
  //                 deferred.resolve(users);
  //               });
  //
  //           }
  //           else {
  //               console.log('Users::initialize empty db, initializing');
  //               usersSync.$push({users: []});
  //               deferred.resolve(users);
  //           }//else
  //   });//usersRef.once()
  //   return deferred.promise;
  //  };

  // this.init = function() {
  //   return initialize();
  // }

  this.all = function() {
    return users;
  };

  this.add = function(user) {
    users.$add(user);
  };

  this.get = function(id) {
    return users.$getRecord(id);
  };

  this.save = function(user) {
    users.$save(user);
  };

  this.delete = function(user) {
    users.$remove(user);
  };

  this.getOrCreate = function(profile) {
    console.log('Users::getOrCreate profile', profile);
    var userData = {
      name : profile.name,
      picture : profile.picture
    };
    usersRef.child(profile.user_id).transaction(function(currentUserData) {
      if(currentUserData === null) {
        return userData;
      }
    }, function(error, committed) {
      if(!committed) {
        console.log('user ' + profile.user_id + ' already exists!');
      }
      else {
        console.log('Successfully created ' + profile.user_id);
      }
    });
  }

});


/*app.service("EmpresaService", function ($q, $http, $cordovaGeolocation, $ionicPopup, $stateParams) {
console.log($stateParams.empresasId);
  var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
		'lat': 39.50,
		'lon': -98.35,
		'refresh': function () {
			self.page = 1;
			self.isLoading = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page = 1;
		//	return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var deferred = $q.defer();
      console.log('hola');
			ionic.Platform.ready(function () {
        console.log('hola2');
        var referencia ={timeout: 10000, enableHighAccuracy: false};
				$cordovaGeolocation
					.getCurrentPosition(referencia)
					.then(function (position) {
            console.log("hoka");
						self.lat = position.coords.latitude;
						self.lon = position.coords.longitude;
              console.log('k');
						var params = {
							page: self.page,
							lat: self.lat,
							lon: self.lon
						};
            console.log(params);
            var Id = $stateParams.empresasId;
            console.log(Id);
						$http.get('https://frozen-ridge-27058.herokuapp.com/empresa/' +Id , {params: params})
							.success(function (data) {
								console.log(data);

							if (data.length == 0) {
						    self.hasMore = false;
						 	} else {

								//	angular.forEach(data, function (empresa) {
							/*		self.results.push([{data}]);

							//});
								//}


              //  self.isLoading = false;
								deferred.resolve();
							})
							.error(function (data, status, headers, config) {
								//self.isLoading = false;
								deferred.reject(data);
							});

					}, function (err) {
						console.error("Error al obtener la localizacion");
						console.error(err);
						$ionicPopup.alert({
							'title': 'Por favor, active la geolocalización',
							'template': "Parece que has desconectado la geolocalización de la ADService, por favor, enciéndala con la configuración de la aplicación."
						});
					})
			});

			return deferred.promise;
		}
	};

	//Load the data and then paginate twice
	self.load().then(function () {
		self.next().then(function () {
			self.next();
		})
	});

	return self;
});*/
