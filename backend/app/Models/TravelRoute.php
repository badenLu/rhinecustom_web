<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravelRoute extends Model
{
    use HasFactory;

    protected $table = 'routes';

    protected $fillable = [
        'title',
        'subtitle',
        'shortDesc',
        'duration',
        'likeCount',
        'images',
        'overview',
        'itinerary'
    ];

    // 如果 images 是 JSON 字段，可以让 Laravel 自动转换成数组
    protected $casts = [
        'images' => 'array',
    ];
}
