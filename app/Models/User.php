<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'phone',
        'date_of_birth',
        'gender',
        'organization_id',
        'is_active',
        'profile_completed',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'date_of_birth' => 'date',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'profile_completed' => 'boolean',
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }
    public function patientProfile()
    {
        return $this->hasOne(\App\Models\PatientProfile::class);
    }
    public function moodLogs()
    {
        return $this->hasMany(MoodLog::class);
    }
}
