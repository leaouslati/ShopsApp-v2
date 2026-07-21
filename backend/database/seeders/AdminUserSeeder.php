<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();

        $admin = new User([
            'first_name' => 'Emma',
            'last_name' =>'Brown',
            'email' => 'admin@shopsapp.com',
            'password' => bcrypt('admin123'),
        ]);

        $admin->role_id = $adminRole->id;
        $admin->save();
    }
}