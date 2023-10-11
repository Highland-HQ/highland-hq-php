<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class Product extends Model
{
    use HasFactory;
    use Uuids;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'name',
        'description',
        'model_info',
        'sizing',
        'SKU',
        'quantity',
        'price',
        'discount_price',
        'cost_per_item',
        'vendor_id',
        'thumbnail_image_url',
        'status',
        'launch',
    ];

    protected $casts = [];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function variations()
    {
        return $this->hasMany(ProductVariation::class);
    }

    public function collections()
    {
        return $this->hasMany(Collection::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function launch()
    {
        return $this->belongsTo(ProductLaunch::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
