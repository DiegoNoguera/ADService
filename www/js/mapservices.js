app.service("EmpresaService", function ($q, $http, $cordovaGeolocation, $ionicPopup, $stateParams) {
console.log($stateParams.empresasId);
  var self = {
		'page': 1,
		'isLoading': false,
		//'hasMore': true,
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
			//return self.load();
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
						$http.get('https://frozen-ridge-27058.herokuapp.com/empresas/' , {params: params})
							.success(function (data) {
								console.log(data);

							/*if (data.length == 0) {
						    self.hasMore = false;
						 	} else {*/

									angular.forEach(data, function (empresa) {
									self.results.push( empresa /*latlon: new google.maps.LatLng(data.location[1], data.location[0]),
                    empresaname: data.empresaname,
                    //gender: empresa.gender,
                    descripcion: data.descripcion,
                    email: data.email,
                    phone: data.phone,
                    cellphone: data.cellphone,
                    direccion: data.direccion*/);

							});
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
	self.load(function () {
		self.next(function () {
			self.next();
		})
	});

	return self;
});
