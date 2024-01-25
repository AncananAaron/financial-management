<?php

use Inertia\Inertia;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\TransactionController;

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

Route::prefix('/transactions')->middleware('auth:sanctum')->group(function(){
  Route::get('/', [TransactionController::class, 'index'])
    ->name('transaction:index');

  Route::post('/store', [TransactionController::class, 'store'])
    ->name('transaction:store');

  Route::post('/update', [TransactionController::class, 'update'])
    ->name('transaction:update');

  Route::post('/delete', [TransactionController::class, 'delete'])
    ->name('transaction:delete');

});


Route::prefix('/accounts')->middleware('auth:sanctum')->group(function(){
  Route::get('/', [AccountController::class, 'index'])
    ->name('account:index');

  Route::post('/store', [AccountController::class, 'store'])
    ->name('account:store');

  Route::post('/update', [AccountController::class, 'update'])
    ->name('account:update');

  Route::post('/delete', [AccountController::class, 'delete'])
    ->name('account:delete');
});