<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;


class Account extends Model
{
    use HasFactory, HasUuids;


    protected $fillable = [
      'user_id',
      'name',
      'type_of_account'
    ];

    public function user(): HasMany
  {
    return $this-hasMany(User::class, 'id', user_id);
  }

}
