angular.module('cbbackend', ['ui.router', 'lr.upload'])
	.config(function($stateProvider, $urlRouterProvider, $interpolateProvider) {
 
	  $urlRouterProvider.otherwise("/productos");
	  $interpolateProvider.startSymbol('{[');
	  $interpolateProvider.endSymbol(']}');

	  $stateProvider
	    .state('productos', {
	      url: "/productos",
	      templateUrl: "templates/productos.html",
	      controller: 'productosController as controller'
	    })
	    .state('categorias', {
	      url: "/categorias",
	      templateUrl: "templates/categorias.html",
	       controller: 'categoriasController as cat'
	    })
	    .state('admin', {
	      url: "/admin",
	      templateUrl: "templates/admin.html",
	       controller: 'adminController as admin'
	    });
	});
angular.module('cbbackend')
	.factory('dataBase',  function dataBaseFactory () {
		
		return idb.open('casaBombillo', 1, function(upgradeDb){
			var productos = upgradeDb.createObjectStore("productos", { keyPath: "id"});
			var categorias = upgradeDb.createObjectStore("categorias", { keyPath: "id"});
			var usuarios = upgradeDb.createObjectStore("usuarios", { keyPath: "user_id"});

		});
		//idb.delete('casaBombillo').then(() => console.log('done!'));
	});
angular.module('cbbackend')
	.directive("rzInput",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rzinput.html",
                scope: {
                    type: "@",
                    float: "@",
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    ngRequired: "@",
                    ngModel: "=",
                    list: "@",
                    addOn: "@",
                    addName: "@",
                    addFunc: "="
                },
              }
    })
 .directive("rzTextarea",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rztextarea.html",
                scope: {
                    maxlength: "@",
                    rows: '@',
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    ngRequired: "@",
                    ngModel: "=",
                },
              }
    })
 .directive("rzSelect",function(){
              return {
                restrict: "E",
                templateUrl : "/templates/rzselect.html",
                scope: {
                    label: "@",
                    name: "@",
                    id: "@",
                    error: "=",
                    ngRequired: "@",
                    options: "=",
                    ngModel: "=",
                    filterr: "=",
                    
                },
              }
    });
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
angular.module('cbbackend')
	.controller('categoriasController', ['$http','$scope', 'dataBase', function($http, $scope, dataBase){
		var catController = this;
		this.categorias = [];
		this.categoria = {};
		this.loading = false;
		this.editIndex;
		dataBase.then(function (db){
			var categoriasObj = db.transaction('categorias')
				.objectStore('categorias');
			return categoriasObj.getAll().then(function (categorias) {
				if (categorias.length == 0) return;
				catController.categorias = categorias;
				$scope.$apply();
			});

		});




		this.addCat = function(){
			if(catController.categoria){
				catController.loading = true;

				if(catController.categoria.hasOwnProperty('id')){
					$http.post('/editCategory',catController.categoria)
					.then(function(response){
						catController.categorias[catController.editIndex] = catController.categoria;
						dataBase.then(function(db){
							var catObj = db.transaction('categorias', 'readwrite')
								.objectStore('categorias');

								catObj.put(catController.categoria).then(function(){
									catController.categoria = {};
									catController.loading = false;
									$scope.$apply();
								});
						});

					}).catch(function(error){
						console.log(error);
					})

				} else {
					$http.post('/addCategory', catController.categoria)
					.then(function(response){
						catController.categoria.id = response.data.id;
						catController.categorias.push(catController.categoria);
						dataBase.then(function(db){
							var catObj = db.transaction('categorias', 'readwrite')
								.objectStore('categorias');

							catObj.add(catController.categoria).then(function(){
								catController.categoria = {};
								catController.loading = false;
								$scope.$apply();
							});
						});

					});	
				};
			};
		};

		this.editCategory = function(category){
			var index = catController.categorias.indexOf(category);
			catController.categoria = category;
		};

		this.deleteCategory = function(category){
			var index = catController.categorias.indexOf(category);
			$http.post('/deleteCategory', {id:category.id}).then(function(response){
				dataBase.then(function(db){
				var catObj = db.transaction('categorias', 'readwrite')
					.objectStore('categorias');

					catObj.delete(category.id).then(function(){
						catController.categorias.splice(index, 1);
						$scope.$apply();
					});
				});

			}).catch(function(error){
				console.log(error);
			})

		}



	}]);
angular.module('cbbackend')
	.controller('productosController',['$http','$scope', 'dataBase', function ($http, $scope, dataBase) {
		var controller = this;
		this.selectedCat;
		this.newProduct = {};
		this.editIndex;
		this.newProduct.tags = [];
		this.categorias = [];
		this.productos = [];
		this.loading = false;
		CKEDITOR.replace( 'descripcion',{
		    language: 'es',
		});
		this.getProducts = function(){
			$http.get('/getProducts').then(function(response){
				controller.productos = response.data;
				dataBase.then(function(db){
					var productsObj = db.transaction('productos', 'readwrite')
						.objectStore('productos');
					
					var promiseArray = [];
					controller.productos.forEach(function(product){
						product.tags = product.tags.split(',');
						product.galery = product.galery.split(',');
						product.tags.pop();
						product.galery.pop();

						promiseArray.push(productsObj.add(product));

					});

					Promise.all(promiseArray).then(function(){
						$scope.$apply();
					}).catch(function(error){
						console.log(error);

					});

				});

			}).catch(function(error){
				console.log(error);
			});

		};

		this.getCategories = function (){
			$http.get('/getCategories').then(function(response){
				controller.categorias = response.data;
				controller.selectedCat = controller.categorias[0].id;
				dataBase.then(function(db){
					var catObj = db.transaction('categorias', 'readwrite')
						.objectStore('categorias');
					
					var promiseArray = [];
					controller.categorias.forEach(function(categoria){
						promiseArray.push(catObj.add(categoria));

					});

					Promise.all(promiseArray).then(function(){
						console.log("worked");
					}).catch(function(error){
						console.log(error);

					});

				});


			}).catch(function(error){
					console.log(error);
			});

		};

		dataBase.then(function (db){
			var categoriasObj = db.transaction('categorias')
				.objectStore('categorias');
			return categoriasObj.getAll().then(function (categorias) {
				if (categorias.length == 0) controller.getCategories();
				controller.categorias = categorias;
				controller.selectedCat = categorias[0].id;
				$scope.$apply();
			});

		});

		/*dataBase.then(function (db){
			var productsObj = db.transaction('productos')
				.objectStore('productos');
			return productsObj.getAll().then(function (productos) {
				if (productos.length == 0) controller.getProducts();
				controller.productos = productos;
				$scope.$apply();
			});

		});*/

		controller.getProducts();

		

		this.addTag = function () {
			if (controller.tag != ''){
				if (!controller.newProduct.hasOwnProperty('tags')) controller.newProduct.tags = [];
				controller.newProduct.tags.push(controller.tag);
				controller.tag = '';
			}
			
		};

		this.addProduct = function(){
			controller.loading = true;
			controller.newProduct.descripcion = CKEDITOR.instances.descripcion.getData();
			$http.post('/addProduct',controller.newProduct).then(function(response){
				controller.newProduct.id = response.data.id;
				if(controller.newProduct.hasOwnProperty('deletedFiles'))controller.newProduct.deletedFiles = [];				
				controller.productos.push(controller.newProduct);
				dataBase.then(function(db){
					var productsObj = db.transaction('productos', 'readwrite')
						.objectStore('productos');

					productsObj.add(controller.newProduct)
					.then(function(){
						controller.newProduct = {};
						controller.prodState = '';
						controller.loading = false;
						$scope.$apply();

					});

				});


				

			}).catch(function(error){
				console.log(error);

			});




			



			/**/
			
		};

		this.editProduct = function(product){
			var index = controller.productos.indexOf(product);
			controller.editIndex = index;
			controller.newProduct =  Object.assign({}, product);
			CKEDITOR.instances.descripcion.setData(controller.newProduct.descripcion);
			controller.prodState = 'edit';

		};

		this.saveProduct = function(){
			controller.loading = true;
			controller.newProduct.descripcion = CKEDITOR.instances.descripcion.getData();
			controller.newProduct.descripcion = controller.newProduct.descripcion.replace(/\n|\t/g, ' ');
			console.log(controller.newProduct.descripcion.length);
			$http.post('/editProduct', controller.newProduct).then(function(response){
				if(controller.newProduct.hasOwnProperty('deletedFiles'))controller.newProduct.deletedFiles = [];
				controller.productos[controller.editIndex] = controller.newProduct;	
				dataBase.then(function(db){
					var productsObj = db.transaction('productos','readwrite')
						.objectStore('productos');

						productsObj.put(controller.newProduct).then(function(){
							controller.prodState = '';
							controller.newProduct =  {};
							controller.loading = false;
							$scope.$apply();

						});

				});

			}).catch(function(error){
				console.log(error);
			})
		};

	this.deleteProduct = function(producto) {
		var index = controller.productos.indexOf(producto);
		var deletedFiles = [];
		if(controller.newProduct.hasOwnProperty('galery')) deletedFiles = deletedFiles.concat(controller.newProduct.galery);
		if(controller.newProduct.hasOwnProperty('pdf')) deletedFiles = deletedFiles.concat(controller.newProduct.pdf);
		$http.post('/deleteProduct', {id:producto.id, deletedFiles:deletedFiles}).then(function(response){
			dataBase.then(function(db){
				var productsObj = db.transaction('productos', 'readwrite')
					.objectStore('productos');

					productsObj.delete(producto.id).then(function(){
						controller.productos.splice(index, 1);
						$scope.$apply();
					});
			});

		}).catch(function(error){
			console.log(error);

		});
		
	};

	this.addPDF = function(response) {
		controller.newProduct.pdf = response.data.pdf;
	};

	this.addGalery = function(response) {
		if(controller.newProduct.hasOwnProperty('galery')) {
			controller.newProduct.galery = controller.newProduct.galery.concat(response.data.galery);
		} else 	{
			controller.newProduct.galery = [];
			controller.newProduct.galery = controller.newProduct.galery.concat(response.data.galery);
		};

	};

	this.back = function(){
		controller.prodState = '';
		controller.newProduct = {};
	};

	this.deleteFile = function(index) {
		if(controller.newProduct.hasOwnProperty('deleteFiles')) {
			controller.newProduct.deletedFiles.push(controller.newProduct.galery.splice(index, 1));
		} else 	{
			controller.newProduct.deletedFiles = [];
			controller.newProduct.deletedFiles.push(controller.newProduct.galery.splice(index, 1));
		};

	};

	this.deletePDF = function(){
		if(controller.newProduct.hasOwnProperty('deleteFiles')) {
			controller.newProduct.deletedFiles.push(controller.newProduct.pdf);
			controller.newProduct.pdf = '';
		} else 	{
			controller.newProduct.deletedFiles = [];
			controller.newProduct.deletedFiles.push(controller.newProduct.pdf);
			controller.newProduct.pdf = '';
		};

	};

	this.setMain = function(index){
		if(controller.newProduct.hasOwnProperty('image')){
			if(!controller.newProduct.hasOwnProperty('galery')) controller.newProduct.galery = [];
			controller.newProduct.galery.push(controller.newProduct.image);
			
		};
		var item = controller.newProduct.galery.splice(index, 1);
		controller.newProduct.image =  item[0];
	};



		
	}]);


 