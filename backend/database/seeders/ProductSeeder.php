<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $base = config('app.url') . '/storage/';

        Product::create([
            'title' => 'POS Terminal',
            'description' => 'Compact all-in-one payment terminal with touchscreen.',
            'price' => 299.99,
            'image_path' => $base . 'products/pos.png',
        ]);

        Product::create([
            'title' => 'Card Reader',
            'description' => 'Portable Bluetooth card reader compatible with all devices.',
            'price' => 79.99,
            'image_path' => $base . 'products/cardreader.png',
        ]);

        Product::create([
            'title' => 'NFC Payment Device',
            'description' => 'Contactless payment device supporting all NFC enabled cards.',
            'price' => 149.99,
            'image_path' => $base . 'products/contactless.png',
        ]);

        Product::create([
            'title' => 'Receipt Printer',
            'description' => 'High speed thermal receipt printer with wireless connectivity.',
            'price' => 199.99,
            'image_path' => $base . 'products/printer.png',
        ]);

        Product::create([
            'title' => 'Cash Drawer',
            'description' => 'Heavy duty steel cash drawer with automatic open trigger.',
            'price' => 89.99,
            'image_path' => $base . 'products/drawer.png',
        ]);
    }
}