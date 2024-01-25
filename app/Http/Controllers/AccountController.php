<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Transaction;
use Inertia\Inertia;

class AccountController extends Controller
{

  public function index (Request $request)
  {
    $id = $request->user()->id;

    $accounts = Account::where('user_id', '=', $id)->get();

    $total_spent = Transaction::where('user_id', '=', $id)
      ->where('type_of_account', '=', 'Outflow')
      ->sum('amount');

    $total_earned = Transaction::where('user_id', '=', $id)
      ->where('type_of_account', '=', 'Inflow')
      ->sum('amount');

    $total_payable = Transaction::where('user_id', '=', $id)
      ->where('type_of_account', '=', 'Payable')
      ->sum('amount');

    $total_spent_per_account = Transaction::join('accounts', 'accounts.id', '=', 'transactions.account_id')
      ->where('transactions.user_id', '=', $id)
      ->where('transactions.type_of_account', '=', 'Outflow')
      ->select('transactions.*', 'accounts.name')
      ->orderBy('transactions.date', 'desc')
      ->get()
      ->groupBy('name')
      ->map(function ($item, $key) {
        return $item->sum('amount');
      });

    $total_earned_per_account = Transaction::join('accounts', 'accounts.id', '=', 'transactions.account_id')
      ->where('transactions.user_id', '=', $id)
      ->where('transactions.type_of_account', '=', 'Inflow')
      ->select('transactions.*', 'accounts.name')
      ->orderBy('transactions.date', 'desc')
      ->get()
      ->groupBy('name')
      ->map(function ($item, $key) {
        return $item->sum('amount');
      });

    $total_payable_per_account = Transaction::join('accounts', 'accounts.id', '=', 'transactions.account_id')
      ->where('transactions.user_id', '=', $id)
      ->where('transactions.type_of_account', '=', 'Payable')
      ->select('transactions.*', 'accounts.name')
      ->orderBy('transactions.date', 'desc')
      ->get()
      ->groupBy('name')
      ->map(function ($item, $key) {
          $totalAmount = $item->sum('amount');


          $account_id = Account::where('type_of_account', '=', 'Outflow')
              ->where('user_id', '=', Auth::id())
              ->where('name', '=', $key)
              ->get();


          $totalPaid = Transaction::where('user_id', '=', Auth::id())
              ->where('type_of_account', '=', 'Outflow')
              ->where('account_id', $account_id[0]->id)
              ->sum('amount');


          $remainingPayable = $totalAmount - $totalPaid;

          return [
              'total_amount' => $totalAmount,
              'total_paid' => $totalPaid,
              'remaining_payable' => $remainingPayable,
          ];
      });

    $transactions = Transaction::join('accounts', 'accounts.id', '=', 'transactions.account_id')
      ->where('transactions.user_id', '=', $id)
      ->select('transactions.*', 'accounts.name')
      ->orderBy('transactions.date', 'desc')
      ->paginate(5);

    return Inertia::render('Account', [
      'transactions' => $transactions,
      'accounts' => $accounts,
      'dashboard_data' => [
        'total_spent' => $total_spent,
        'total_earned' => $total_earned,
        'total_payable' => $total_payable,
        'total_spent_per_account' => $total_spent_per_account,
        'total_earned_per_account' => $total_earned_per_account,
        'total_payable_per_account' => $total_payable_per_account,
      ],
    ]);
  }



  public function store(Request $request)
  {
    $inputs = $request->all();
    $id = Auth::id();

    Validator::make($inputs, [
      'name' => ['required', 'string', 'max:30'],
      'type_of_account' => ['required', 'in:Inflow,Outflow,Payable'],
    ])->validate();


    $account = Account::query()->create([
      'name' => $inputs['name'],
      'user_id' => $id,
      'type_of_account' => $inputs['type_of_account'],
    ]);

    return redirect()->back();

  }

  public function update(Request $request)
  {
    $inputs = $request->all();
    $id = Auth::id();

    Validator::make($inputs, [
      'name' => ['required', 'string', 'max:30'],
      'type_of_account' => ['required', 'in:Inflow,Outflow,Payable'],
      'id' => ['required', 'uuid', 'exists:App\Models\Account,id'],
    ])->validate();

    $account = Account::query()->where('id', '=', $inputs['id'])->update([
      'name' => $inputs['name'],
      'type_of_account' => $inputs['type_of_account'],
    ]);

    return redirect()->back();
  }

  public function delete(Request $request)
  {
    $inputs = $request->all();
    $id = Auth::id();

    Validator::make($inputs, [
      'id' => ['required', 'uuid', 'exists:App\Models\Account,id'],
    ])->validate();

    $account = Account::query()->where('id', '=', $inputs['id'])->firstOrFail();

    if (!$account)
    {
      return redirect()->back()->with('error', 'Account not found');
    }

    $account->delete();

    return redirect()->back();
  }
}
