<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentalResource extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'type',
        'category',
        'excerpt',
        'cover_image',
        'read_time',
        'content',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];
}
