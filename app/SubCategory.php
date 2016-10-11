<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    //

    protected $table = 'subCategories';
    protected $guarded = [];

     public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
