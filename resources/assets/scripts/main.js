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