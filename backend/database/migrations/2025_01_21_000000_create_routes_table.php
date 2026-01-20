<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->string('title_zh', 255)->nullable();
            $table->string('subtitle_zh', 255)->nullable();
            $table->text('shortDesc_zh')->nullable();
            $table->string('duration_zh', 50)->nullable();
            $table->integer('likeCount')->default(0);
            $table->longText('images')->nullable();
            $table->text('overview_zh')->nullable();
            $table->text('itinerary_zh')->nullable();
            $table->string('title_en', 255)->nullable();
            $table->string('subtitle_en', 255)->nullable();
            $table->text('shortDesc_en')->nullable();
            $table->string('duration_en', 50)->nullable();
            $table->text('overview_en')->nullable();
            $table->text('itinerary_en')->nullable();
            $table->text('reviews')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('routes');
    }
};
