<?php

namespace App\Http\Controllers;

use App\Category;
use App\SubCategory;
use Log;
use Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends Controller {


   public function addCategory(Request $request){
        $data = $request->all();
        $category = Category::create($data);
        //['nombre'=>$data['nombre'],'created_by'=> Auth::user()->id]

        return response()->json(['id' =>  $category->id]);    
   }


   public function getCategories(){
    $categories = Category::all();

    return response()->json($categories)->header('Access-Control-Allow-Origin', '*');


   }

   public function editCategory(Request $request){
      $data = $request->all();
      $category = Category::find($data['id']);
      $category->nombre = $data['nombre'];
      $category->save();

   }

   public function deleteCategory(Request $request){
     Category::destroy($request->input('id'));
   }
}