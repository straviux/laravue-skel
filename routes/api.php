<?php

use App\Http\Controllers\AuthController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('/articles', App\Http\Controllers\ArticleController::class);
    Route::resource('/carousels', App\Http\Controllers\CarouselController::class);
    Route::resource('/gallery', App\Http\Controllers\GalleryImageController::class);
});

// Route::get('/news-by-slug/{article:slug}', [App\Http\Controllers\ArticleController::class, 'showForPublic']);
Route::get('/article-by-slug/{article:slug}', [App\Http\Controllers\ArticleController::class, 'showForPublic']);
Route::get('/articles-public/', [App\Http\Controllers\ArticleController::class, 'showPublicList']);
// Route::get('/news-list/', [App\Http\Controllers\ArticleController::class, 'showPublicList']);
// Route::get('/featured-list/', [App\Http\Controllers\ArticleController::class, 'showFeaturedList']);
Route::get('/latest-list/', [App\Http\Controllers\ArticleController::class, 'showPublicList']);
Route::get('/carousel-list/', [App\Http\Controllers\CarouselController::class, 'showPublic']);
Route::get('/gallery-list/', [App\Http\Controllers\GalleryImageController::class, 'showPublic']);

// Route::get('/story-by-slug/{article:slug}', [App\Http\Controllers\ArticleController::class, 'showForPublic']);
Route::get('/story-list/', [App\Http\Controllers\ArticleController::class, 'showPublicList']);
Route::get('/featured-story-list/', [App\Http\Controllers\ArticleController::class, 'showFeaturedList']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::get('/test', function () {
    return view('welcome');
});
