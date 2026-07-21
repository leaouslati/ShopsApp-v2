<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{

    public function register(Request $request){

    $validated=$request->validate([
        'first_name'=>'required|string',
        'last_name'=>'required|string',
         'email'=>'required|string|email|unique:users,email',
        'password'=>'required|string|min:8',

    ]);

    $user= new User([
        'first_name'=>$validated['first_name'],
        'last_name'=>$validated['last_name'],
        'email'=>$validated['email'],
        'password'=>bcrypt($validated['password']),

    ]);

    $userRole = Role::where('name', 'user')->first();
    $user->role_id=$userRole->id;
    $user->save();
    $user->load('role');

    $token=$user->createToken('auth_token')->plainTextToken;

    return response()->json(['user'=>$user, 'token'=>$token]);


    }
    public function login(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|string',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $validated['email'])->first();

    if (!$user || !Hash::check($validated['password'], $user->password)) {
        return response()->json(['message' => 'Invalid Credentials'], 401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;
    $user->load('role');
    return response()->json(['user' => $user, 'token' => $token]);
}

    public function logout(Request $request){
         $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully'
        ]);

    }


}
