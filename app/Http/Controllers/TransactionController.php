<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Transaction;
use App\Models\Account;

class TransactionController extends Controller
{
  public function store(Request $request)
  {
    $inputs = $request->all();

    $id = Auth::id();

    Validator::make($inputs, [
      'type_of_account' => ['required', 'in:Inflow,Outflow,Payable'],
      'account_id' => ['required', 'uuid', 'exists:App\Models\Account,id'],
      'amount' => ['required','numeric', 'min:1'],
      'date' => ['required', 'date'],
      'remarks' => ['required', 'string', 'max:500'],
    ])->validate();

    Transaction::query()->create([
      'type_of_account' => $inputs['type_of_account'],
      'user_id' => $id,
      'account_id' => $inputs['account_id'],
      'amount' => $inputs['amount'],
      'date' => $inputs['date'],
      'remarks' => $inputs['remarks'],
    ]);

    return redirect()->back();
  }
}
