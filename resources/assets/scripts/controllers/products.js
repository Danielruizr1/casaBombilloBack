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


 