<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentResult extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'email',
        'anxiety_score',
        'stress_score',
        'sleep_score',
        'mood_score',
        'focus_score',
        'energy_score',
        'total_score',
        'level',
        'summary',
        'recommendation',
        'raw_answers',
    ];

    protected $casts = [
        'raw_answers' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
