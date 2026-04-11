<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyCheckin extends Model
{
    protected $fillable = [
        'user_id',
        'mood',
        'stress',
        'energy',
        'focus',
        'sleep_hours',
        'notes',
        'checkin_date',
    ];

    protected $casts = [
        'checkin_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
