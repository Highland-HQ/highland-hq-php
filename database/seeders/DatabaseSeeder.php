<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\ProductFactory;
use Database\Factories\VendorFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        VendorFactory::factoryForModel('App\Models\Vendor')
            ->count(10)
            ->create();

        ProductFactory::factoryForModel('App\Models\Product')
            ->count(100)
            ->create();
    }
}
