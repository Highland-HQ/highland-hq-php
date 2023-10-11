<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vendor>
 */
class VendorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'country' => $this->faker->country,
            'city' => $this->faker->city,
            'phone_number' => $this->faker->phoneNumber,
            'email' => $this->faker->email,
            'website' => $this->faker->domainName,
        ];
    }
}
