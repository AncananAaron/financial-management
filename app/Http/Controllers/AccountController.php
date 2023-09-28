<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AccountController extends Controller
{




  public function store(Request $request)
    {
      $inputs = $request->all();

      Validator::make($inputs, [
        'name' => ['required', 'string', 'max:30'],
      ])->validate();


      $account = Account::query()->create([
        'name' => $inputs['name'],
      ]);

      return redirect()->back();

    }
}
