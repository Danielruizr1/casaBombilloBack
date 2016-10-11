angular.module('cbbackend')
	.factory('dataBase',  function dataBaseFactory () {
		
		return idb.open('casaBombillo', 1, function(upgradeDb){
			var productos = upgradeDb.createObjectStore("productos", { keyPath: "id"});
			var categorias = upgradeDb.createObjectStore("categorias", { keyPath: "id"});
			var usuarios = upgradeDb.createObjectStore("usuarios", { keyPath: "user_id"});

		});
		//idb.delete('casaBombillo').then(() => console.log('done!'));
	});