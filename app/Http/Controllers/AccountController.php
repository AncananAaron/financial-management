<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{




  public function store(Request $request)
    {
      $inputs = $request->all();
      $id = Auth::id();

      Validator::make($inputs, [
        'name' => ['required', 'string', 'max:30'],
      ])->validate();


      $account = Account::query()->create([
        'name' => $inputs['name'],
        'user_id' => $id,
      ]);

      return redirect()->back();

    }
}
