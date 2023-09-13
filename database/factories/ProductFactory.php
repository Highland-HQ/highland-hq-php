<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
  protected $model = Product::class;

  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */

  public function definition()
  {
    return [
      'name' => $this->faker->word,
      'description' => $this->faker->paragraph,
      'model_info' => $this->faker->sentence,
      'sizing' => $this->faker->sentence,
      'SKU' => $this->faker->unique()->uuid,
      'quantity' => $this->faker->numberBetween(0, 100),
      'price' => $this->faker->randomFloat(2, 10, 100),
      'discount_price' => $this->faker->optional(0.3)->randomFloat(2, 5, 50),
      'cost_per_item' => $this->faker->optional(0.5)->randomFloat(2, 5, 50),
      'vendor_id' => \App\Models\Vendor::pluck('id')->random(),
      'thumbnail_image_url' => $this->faker->imageUrl(),
      'status' => $this->faker->randomElement(['Draft', 'Active', 'Archived']),
    ];
  }
}
