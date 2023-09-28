<?php

use Inertia\Inertia;
use App\Models\Account;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountController;

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


Route::middleware('auth:sanctum')->group(function(){
    Route::get('/dashboard', function () {
      return Inertia::render('Dashboard');
    });
    Route::get('/account', function () {
      return Inertia::render('Account');
    });

    Route::get('/inflow', function () {
      return Inertia::render('Inflow');
    });

    Route::get('/outflow', function () {
      return Inertia::render('Outflow');
    });




    Route::prefix('/account')->group(function(){
      Route::get('/', function () {
        $accounts = Account::all();

        return Inertia::render('Account', [
          'accounts' => $accounts
        ]);
      });


      Route::post('/', [AccountController::class, 'store'])
        ->name('account:store');
    });

});




