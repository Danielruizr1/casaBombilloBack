<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subCategories', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('nombre');

            $table->integer('category-id')->unsigned();
            $table->foreign('category-id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('subCategories');
    }
}
