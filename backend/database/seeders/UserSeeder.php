<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $userRole = Role::where('name', 'user')->first();

        $sarah = new User([
            'first_name' => 'Sarah',
            'last_name'=>'Parker',
            'email' => 'sarah@example.com',
            'password' => bcrypt('sarah123'),
        ]);
        $sarah->role_id = $userRole->id;
        $sarah->save();

        $john = new User([
            'first_name' => 'John',
            'last_name'=>'Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('john123'),
        ]);
        $john->role_id = $userRole->id;
        $john->save();
    }
}