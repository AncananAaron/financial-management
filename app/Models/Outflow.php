<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

class Outflow extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
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
