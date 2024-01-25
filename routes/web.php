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


// Route::prefix('/accounts')->middleware('auth:sanctum')->group(function(){
//   Route::get('/', function () {
//     $accounts = Account::all();

//     return Inertia::render('Account', [
//       'accounts' => $accounts
//     ]);
//   });

//   Route::post('/', [AccountController::class, 'store'])
//     ->name('account:store');
// });


// Route::prefix('/dashboard')->middleware('auth:sanctum')->group(function(){
//   Route::get('/', function () {

//     $id = Auth::id();

//     $accounts = Account::where('user_id', '=', $id)->get();

//     $transactions = Transaction::join('accounts', 'accounts.id', '=', 'transactions.account_id')
//         ->where('transactions.user_id', '=', $id)
//         ->select('transactions.*', 'accounts.name')
//         ->orderBy('transactions.date', 'desc')
//         ->paginate(5);


//     $total_spent = Transaction::where('user_id', '=', $id)
//         ->where('type_of_account', '=', 'Outflow')
//         ->sum('amount');

//     $total_earned = Transaction::where('user_id', '=', $id)
//         ->where('type_of_account', '=', 'Inflow')
//         ->sum('amount');

//     $total_payable = Transaction::where('user_id', '=', $id)
//         ->where('type_of_account', '=', 'Payable')
//         ->sum('amount');

//     $total_spent_per_account = Transaction::join('accounts', 'accounts.id', '=', 'transactions.account_id')
//         ->where('transactions.user_id', '=', $id)
//         ->where('type_of_account', '=', 'Outflow')
//         ->select('transactions.*', 'accounts.name')
//         ->orderBy('transactions.date', 'desc')
//         ->get()
//         ->groupBy('name')
//         ->map(function ($item, $key) {
//           return $item->sum('amount');
//         });

//     $total_earned_per_account = Transaction::join('accounts', 'accounts.id', '=', 'transactions.account_id')
//         ->where('transactions.user_id', '=', $id)
//         ->where('type_of_account', '=', 'Inflow')
//         ->select('transactions.*', 'accounts.name')
//         ->orderBy('transactions.date', 'desc')
//         ->get()
//         ->groupBy('name')
//         ->map(function ($item, $key) {
//           return $item->sum('amount');
//         });

//     $total_payable_per_account = Transaction::join('accounts', 'accounts.id', '=', 'transactions.account_id')
//         ->where('transactions.user_id', '=', $id)
//         ->where('type_of_account', '=', 'Payable')
//         ->select('transactions.*', 'accounts.name')
//         ->orderBy('transactions.date', 'desc')
//         ->get()
//         ->groupBy('name')
//         ->map(function ($item, $key) {
//             $totalAmount = $item->sum('amount');


//             $totalPaid = Transaction::where('user_id', '=', Auth::id())
//                 ->where('type_of_account', '=', 'Outflow')
//                 ->where('account_id', '=', $item[0]->account_id)
//                 ->sum('amount');


//             $remainingPayable = $totalAmount - $totalPaid;

//             return [
//                 'total_amount' => $totalAmount,
//                 'total_paid' => $totalPaid,
//                 'remaining_payable' => $remainingPayable,
//             ];
//         });


//     return Inertia::render('Transactions',[
//       'transactions' => $transactions,
//       'accounts' => $accounts,
//       'total_spent' => $total_spent,
//       'total_earned' => $total_earned,
//       'total_payable' => $total_payable,
//       'total_spent_per_account' => $total_spent_per_account,
//       'total_earned_per_account' => $total_earned_per_account,
//       'total_payable_per_account' => $total_payable_per_account,
//     ]);
//   });

//   Route::post('/', [TransactionController::class, 'store'])
//     ->name('transaction:store');

// });



Route::prefix('/transactions')->middleware('auth:sanctum')->group(function(){
  Route::get('/', [TransactionController::class, 'index'])
    ->name('transaction:index');

  // Route::get('/', [DashboardController::class], 'getData')->name('dashboard:getData');

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

  // Route::get('/', [DashboardController::class], 'getData')->name('dashboard:getData');

  Route::post('/', [AccountController::class, 'store'])
    ->name('account:store');

});