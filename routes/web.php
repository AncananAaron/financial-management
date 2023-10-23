<?php

use Inertia\Inertia;
use App\Models\Account;
use App\Models\Inflow;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\InflowController;
use App\Http\Controllers\OutflowController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::middleware('guest')->group(function () {
  Route::get('/', function () {
    return redirect()->route('login');
  })->name('welcome');

  Route::get('/login', function () {
      return Inertia::render('Auth/Login');
  })->name('login');

  Route::get('/signup', function () {
    return Inertia::render('Auth/SignUp');
  })->name('signup');
});


Route::prefix('/outflow')->middleware('auth:sanctum')->group(function(){

    Route::get('/', function () {
      return Inertia::render('Outflow');
    });

    Route::post('/', [OutflowController::class, 'store'])
    ->name('Outflow:store');

  Route::get('/', [OutflowController::class, 'show'])
    ->name('Outflow:show');

});


Route::prefix('/account')->middleware('auth:sanctum')->group(function(){
  Route::get('/', function () {
    $accounts = Account::all();

    return Inertia::render('Account', [
      'accounts' => $accounts
    ]);
  });

  Route::post('/', [AccountController::class, 'store'])
    ->name('account:store');
});


Route::prefix('/inflow')->middleware('auth:sanctum')->group(function(){
  Route::get('/', function () {
    $accounts = Account::all();

    return Inertia::render('Inflow', [
      'accounts' => $accounts
    ]);
  });

  Route::post('/', [InflowController::class, 'store'])
    ->name('Inflow:store');

  Route::get('/', [InflowController::class, 'show'])
    ->name('Inflow:show');
});

Route::prefix('/dashboard')->middleware('auth:sanctum')->group(function(){
  Route::get('/', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');
});
