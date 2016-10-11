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