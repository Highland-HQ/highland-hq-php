<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariationOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function variation()
    {
        return $this->belongsTo(ProductVariation::class);
    }
}
