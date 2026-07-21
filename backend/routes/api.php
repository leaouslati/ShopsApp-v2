<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;

Route::get('/products',[ProductController::class,'index']);
Route::get('/products/{product}',[ProductController::class,'show']);

Route::middleware('guest:sanctum')->group(function(){
Route::post('/login',[AuthController::class,'login']);
Route::post('/register',[AuthController::class,'register']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout']);
    Route::post('/products',[ProductController::class,'store']);
    Route::put('/products/{product}',[ProductController::class,'update']);
    Route::delete('/products/{product}',[ProductController::class,'destroy']);

});
