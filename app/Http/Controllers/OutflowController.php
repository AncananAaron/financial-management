<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Outflow;
use Inertia\Inertia;
use App\Models\Account;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OutflowController extends Controller
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

      $inflow = Outflow::query()->create([
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

        $transactions = Outflow::join('accounts', 'accounts.id', '=', 'outflows.account_id')
            ->where('outflows.user_id', '=', $id)
            ->select('outflows.*', 'accounts.name')
            ->orderBy('outflows.date', 'desc')
            ->get();

        return Inertia::render('Outflow', [
            'transactions' => $transactions,
            'accounts' => $accounts
        ]);
    }

    public function getTotalSpent()
    {
        $id = Auth::id();

        $totalSpent = Outflow::where('user_id', '=', $id)->sum('amount');

        return Inertia::render('Outflow', [
            'totalSpent' => $totalSpent
        ]);
    }
}
