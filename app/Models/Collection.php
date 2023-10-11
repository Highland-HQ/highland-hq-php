<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class Collection extends Model
{
    use HasFactory;
    use Uuids;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['title', 'launch_date', 'description', 'status'];

    protected $casts = [
        'launch_date' => 'datetime',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
