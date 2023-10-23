<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Inflow;
use Inertia\Inertia;
use App\Models\Account;

class InflowController extends Controller
{
    public function store(Request $request)
    {
      $inputs = $request->all();

      $id = Auth::id();

      Validator::make($inputs, [
        'account_id' => ['required', 'uuid', 'exists:App\Models\Account,id'],
        'amount' => ['required','numeric', 'min:1'],
        'date' => ['required', 'date'],
        'remarks' => ['required', 'string', 'max:500'],
      ])->validate();

      $inflow = Inflow::query()->create([
        'user_id' => $id,
        'account_id' => $inputs['account_id'],
        'amount' => $inputs['amount'],
        'date' => $inputs['date'],
        'remarks' => $inputs['remarks'],
      ]);

      return redirect()->back();
    }

    public function show()
    {

        $accounts = Account::all();
        $id = Auth::id();

        $transactions = Inflow::join('accounts', 'accounts.id', '=', 'inflows.account_id')
            ->where('inflows.user_id', '=', $id)
            ->select('inflows.*', 'accounts.name')
            ->orderBy('inflows.date', 'desc')
            ->get();

        return Inertia::render('Inflow', [
            'transactions' => $transactions,
            'accounts' => $accounts
        ]);
    }
}
