angular.module('cbbackend')
	.controller('adminController', ['$http', '$scope', 'dataBase',
	 function ($http, $scope, dataBase) {
		var controller = this;
		this.users = [];
		this.newUser = {};
		this.prodState;
		this.editIndex;	
		this.loading = false;
		var config = {
					headers: {
						'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkN01kSWdnWUwzVUtqWkVaQXZCMjBsNGZGcUVpMXNpSSIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiLCJ1cGRhdGUiLCJjcmVhdGUiLCJkZWxldGUiXX19LCJpYXQiOjE0NzE5MDQ0NjcsImp0aSI6IjNhNzIxZTRiNDM5NjUzZDVlYzU3OThkN2NlMzlhODllIn0.Hf5G9JHP1uPQuJM-gGBaUckMEEnLcOCLDJNY_kY64uM'
					}
			};

		this.getUsers = function(){
			
			$http.get('https://ruizoft.auth0.com/api/v2/users', config).then(
				function(response){
					controller.users = response.data;
					dataBase.then(function(db){
					var usersObj = db.transaction('usuarios', 'readwrite')
						.objectStore('usuarios');
					
					var promiseArray = [];
					controller.users.forEach(function(usuario){
						promiseArray.push(usersObj.add(usuario));

					});

					Promise.all(promiseArray).then(function(){
						console.log("worked");
					}).catch(function(error){
						console.log(error);

					});

				});
				}).catch(function(error){
					console.log(error);
				})
		};

		dataBase.then(function (db){
			var usersObj = db.transaction('usuarios')
				.objectStore('usuarios');
			return usersObj.getAll().then(function (usuarios) {
				if (usuarios.length == 0) controller.getUsers();
				controller.users = usuarios;
				$scope.$apply();
			});

		});



		this.editUser = function(user ){
			controller.editIndex = controller.users.indexOf(user);
			controller.newUser = Object.assign({}, user);
			controller.prodState = 'edit';

		}

		this.back = function(){
		controller.prodState = '';
		controller.newUser = {};
	};

	this.addUser = function(){
		controller.loading = true;
		controller.newUser.connection = 'Username-Password-Authentication';
		$http.post('https://ruizoft.auth0.com/api/v2/users', controller.newUser, config)
		.then(function(response){
			console.log(response);
			controller.users.push(response.data);
			dataBase.then(function(db){
				usersObj = db.transaction('usuarios', 'readwrite')
					.objectStore('usuarios');

				usersObj.add(response.data).then(function(){
					controller.newUser = {};
					controller.prodState = '';
					controller.loading = false;
					$scope.$apply();

				});

			});

		}).catch(function(error){
			console.log(error);

		});
	};

	this.saveUser = function(){
		controller.loading = true;
		var editData = {
			email: controller.newUser.email,
			user_metadata:  {
				descripcion: controller.newUser.user_metadata.descripcion
			}
		};
		if (controller.newUser.hasOwnProperty('password')) editData.password = controller.newUser.password;


		$http.patch('https://ruizoft.auth0.com/api/v2/users/'+controller.newUser.user_id, editData, config)
		.then(function(response){
			console.log(response);
			controller.users[controller.editIndex] = response.data;
			dataBase.then(function(db){
				usersObj = db.transaction('usuarios', 'readwrite')
					.objectStore('usuarios');

				usersObj.put(response.data).then(function(){
					controller.newUser = {};
					controller.prodState = '';
					controller.loading = false;
					$scope.$apply();

				});

			});

		}).catch(function(error){
			console.log(error);

		});

	};
	this.deleteUser = function(user){
		controller.loading = true;
		var index = controller.users.indexOf(user);
		$http.delete('https://ruizoft.auth0.com/api/v2/users/'+user.user_id, config).then(function(response){
			dataBase.then(function(db){
				var usersObj = db.transaction('usuarios', 'readwrite')
					.objectStore('usuarios');

					usersObj.delete(user.user_id).then(function(){
						controller.users.splice(index, 1);
						controller.loading = false;
						$scope.$apply();
					});
			});

		}).catch(function(error){
			console.log(error);

		});

	};

		
	}]);