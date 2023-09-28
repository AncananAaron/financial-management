<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //Function to return the current user details that is authenticated
    public function index()
    {
        return Inertia::render('User', [
            'user' => auth()->user()
        ]);
    }




}
