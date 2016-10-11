<?php

namespace App\Http\Controllers;

use App\User;
use App\Product;
use Log;
use Auth;
use Mail;
use Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller {


   public function addProduct(Request $request){
        $data = $request->except(['tags', 'galery','deletedFiles']);
        $data['created_by'] = Auth::user()->id;
        $tagsArr = $request->input('tags');
        if($tagsArr){
          $data['tags'] = $this->arrToStr($tagsArr);
        };
        $galeryArr = $request->input('galery');
        if($galeryArr) {
          $data['galery'] = $this->arrToStr($galeryArr);
        }
        $deletedFiles = $request->input('deletedFiles');
        if($deletedFiles) {
          $this->deleteFiles($deletedFiles);
        }
        $product = Product::create($data);

        return response()->json(['id' =>  $product->id]);    
   }


   public function getProducts(){
    $products = Product::all();
    Log::info("Acces");

    return response()->json($products)->header('Access-Control-Allow-Origin', '*')->header('Access-Control-Request-Headers', 'Authorization');


   }

   public function deleteProduct(Request $request){
    
    Product::destroy($request->input('id'));

    if($request->input('deleteFiles')){
      $this->deleteFiles($request->input('deleteFiles'));
    };


   }

   public function editProduct(Request $request){
    $data = $request->except(['tags', 'galery','id','deletedFiles']);
    $tagsArr = $request->input('tags');
    if($tagsArr){
      $data['tags'] = $this->arrToStr($tagsArr);
    } else {
      $data['tags'] = '';
    };
     $galeryArr = $request->input('galery');
        if($galeryArr) {
          $data['galery'] = $this->arrToStr($galeryArr);
        } else {
          $data['galery'] = '';
        };
    $deletedFiles = $request->input('deletedFiles');
    if($deletedFiles) {
      $this->deleteFiles($deletedFiles);
    }
    $product = Product::find($request->input('id'));
    $product = $this->update($product,$data);
    $product->save();


   }

   public function addPDF(Request $request){
    $localUrl = 'public/pdf/'.$request->file('file')->getClientOriginalName().'';
    $publicUrl = 'storagee/'.$localUrl.'';
    Storage::put($localUrl, file_get_contents($request->file('file')->getRealPath()));

    return response()->json(['pdf'=>$publicUrl]);

   }

  public function addGalery(Request $request){
    $files = $request->file('file');
    if(gettype($files) == 'object'){
      $files = [];
      array_push($files, $request->file('file'));
    }

    $urls = $this->uploadImgs($files, 'public/galery/');    

    return response()->json(['galery'=>$urls]);

   }


   public function sendMail(Request $request){
        $data = $request->all();
        Log::info($data);
       Mail::send('emails.cotizacion', ['data' => $data], function ($m) use ($data)  {
            $m->from('cotizacion@correo.casadelbombillo2.com', 'Casa Del Bombillo');

            $m->attachData($data['pdf'], 'cotizacion.pdf');

            $m->to($data['email'], "Cotización")->subject('Cotización');
        });


       return response(200)->header('Access-Control-Allow-Origin', '*');

   }


 
   private function deleteFiles($arr){
    foreach ($arr as  $value) {
      $value = str_replace("storagee/","", $value);
      Storage::delete($value);
    }

   }

   private function uploadImgs($arr, $url){
    $urls = [];
    foreach ($arr as  $value) {
      $lUrl = ''.$url.$value->getClientOriginalName().'';
      $pUrl = 'storagee/'.$lUrl.'';
      Storage::put($lUrl, file_get_contents($value->getRealPath()));
      array_push($urls, $pUrl);
      unset($value);
    }

    return $urls;
   }

   private function arrToStr($arr){
    $str = '';
      foreach ($arr as $value) {
        $str.=''.$value.',';
      }
    return $str;
   }

   private function update($obj,$arr){
    foreach ($arr as $key => $value) {
      $obj->{$key} = $value;
    }
    return $obj;
   }
}