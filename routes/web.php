<?php

use Inertia\Inertia;
use App\Models\Account;
use App\Models\Inflow;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\InflowController;

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

    Route::prefix('/inflow')->group(function(){
      Route::get('/', function () {
        $accounts = Account::all();

        return Inertia::render('Inflow', [
          'accounts' => $accounts
        ]);
      });

      Route::post('/', [InflowController::class, 'store'])
        ->name('Inflow:store');


      // Route::get('/', function(){
      //   $transactions = Inflow::all();

      //   return Inertia::render('Inflow', [
      //     'transactions' => $transactions
      //   ]);
      // });

      Route::get('/', [InflowController::class, 'show'])
        ->name('Inflow:show');
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




