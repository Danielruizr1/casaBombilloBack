<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', ['as' => 'home', function () {
    return view('welcome');
}]);

Route::get('/auth0/main', '\Auth0\Login\Auth0Controller@callback');

Route::get('/admin', ['middleware' => 'auth','as' => 'admin', function () { 
    
    return view('admin');
}]);

Route::get('/logout', function() {
    Auth::logout();
    \App::make('auth0')->logout();
    return Redirect::home();
});
// PRODS

Route::options('/{all}', function(){
	$headers = [
      'Access-Control-Allow-Origin' => '*',
         'Access-Control-Allow-Methods'=> 'POST, GET, OPTIONS, PUT, DELETE',
         'Access-Control-Allow-Headers'=> 'Content-Type, X-Auth-Token, Origin, Authorization'
     ];


	return Response::make('OK', 200, $headers);

})->where(['all' => '.*']);

Route::post('/addProduct', 'ProductController@addProduct');
Route::post('/editProduct', 'ProductController@editProduct');
Route::post('/deleteProduct', 'ProductController@deleteProduct');
Route::post('/products/pdf', 'ProductController@addPDF');
Route::post('/products/images', 'ProductController@addGalery');

Route::get('/getProducts', 'ProductController@getProducts');//->middleware('auth0.jwt');

//CATS

Route::post('/addCategory', 'CategoryController@addCategory');
Route::post('/editCategory', 'CategoryController@editCategory');
Route::post('/deleteCategory', 'CategoryController@deleteCategory');

Route::get('/getCategories', 'CategoryController@getCategories');





Route::post('/sendMail', 'ProductController@sendMail');