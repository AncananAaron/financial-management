<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid("id")->primary()->unique();

            $table->enum('type_of_account', ['Inflow', 'Outflow','Payable']);

            $table->uuid("user_id");
            $table->foreign("user_id")->references("id")->on("users")->onDelete('cascade');

            $table->uuid("account_id");
            $table->foreign("account_id")->references("id")->on("accounts")->onDelete('cascade');

            $table->decimal('amount', 9, 2);

            $table->date("date");
            $table->string("remarks");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
