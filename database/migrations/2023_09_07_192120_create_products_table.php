<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('products', function (Blueprint $table) {
      $table->uuid('id')->primary();
      $table->string('name');
      $table->text('description');
      $table->text('model_info')->nullable();
      $table->text('sizing')->nullable();
      $table->string('SKU')->unique();
      $table->integer('quantity')->default(0);
      $table->decimal('price', 8, 2);
      $table->decimal('discount_price', 8, 2)->nullable();
      $table->decimal('cost_per_item', 8, 2)->nullable();
      $table
        ->foreignId('vendor_id')
        ->nullable()
        ->constrained()
        ->onDelete('cascade');
      $table->string('thumbnail_image_url');
      $table->enum('status', ['Draft', 'Active', 'Archived'])->default('Draft');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
