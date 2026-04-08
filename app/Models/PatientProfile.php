<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PatientProfile extends Model
{
    protected $fillable = [
        'user_id',
        'current_mood',
        'stress_level',
        'anxiety_level',
        'sleep_quality',
        'focus_level',
        'energy_level',
        'support_history',
        'primary_concern',
        'support_goal',
        'preferred_support_style',
        'notes',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
