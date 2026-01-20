<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('city_en', 255)->nullable();
            $table->string('country_en', 255)->nullable();
            $table->string('description_en', 255)->nullable();
            $table->string('image', 255)->nullable();
            $table->string('category_en', 255);
            $table->timestamps();
            $table->text('overview_en')->nullable();
            $table->text('attractions_en')->nullable();
            $table->text('travelTips_en')->nullable();
            $table->string('city_zh', 255)->nullable();
            $table->string('country_zh', 255)->nullable();
            $table->text('description_zh')->nullable();
            $table->text('overview_zh')->nullable();
            $table->text('attractions_zh')->nullable();
            $table->text('travelTips_zh')->nullable();
            $table->string('category_zh', 255)->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('destinations');
    }
};
