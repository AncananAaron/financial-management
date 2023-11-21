<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\User;


class Transaction extends Model
{
  use HasFactory, HasUuids;

  protected $fillable = [
    'type_of_account',
    'user_id',
    'account_id',
    'amount',
    'date',
    'remarks',
  ];



  public function user(): HasMany
  {
    return $this-hasMany(User::class, 'id', user_id);
  }
}
