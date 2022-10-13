<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class, 'user_id');
            $table->foreignIdFor(\App\Models\ArticleType::class, 'article_type_id');
            $table->string('headline', 1000);
            $table->string('excerpt', 1000);
            $table->string('slug', 1000);
            $table->text('content');
            $table->string('cover_photo', 255)->nullable();
            $table->tinyInteger('status');
            $table->tinyInteger('featured');
            $table->timestamp('posted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
