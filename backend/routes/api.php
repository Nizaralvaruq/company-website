<?php

use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('authenticate',[AuthenticationController::class,'authenticate']);


// Route::get('/user', function (Request $request) {
//  return $request->user();
//})->middleware('auth:sanctum');

Route::group(['middleware'=>['auth:sanctum']], function () {
    //Protect Route
Route::get('dashboard',[DashboardController::class,'index']); 
Route::get('logout',[AuthenticationController::class,'logout']); 
    //Service Route
Route::get('services',[ServiceController::class,'index']);
Route::post('services',[ServiceController::class,'store']);

//Temp Image Route
Route::post('temp-images',[TempImageController::class,'store']);
});
