<?php

namespace App\Http\Controllers;

use App\Models\DailyCheckin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DailyCheckinController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::guard('web')->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $validated = $request->validate([
            'mood' => ['required', 'integer', 'min:1', 'max:10'],
            'stress' => ['required', 'integer', 'min:1', 'max:10'],
            'energy' => ['required', 'integer', 'min:1', 'max:10'],
            'focus' => ['required', 'integer', 'min:1', 'max:10'],
            'sleep_hours' => ['nullable', 'numeric', 'min:0', 'max:24'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $checkin = DailyCheckin::updateOrCreate(
            [
                'user_id' => $user->id,
                'checkin_date' => now()->toDateString(),
            ],
            [
                'mood' => $validated['mood'],
                'stress' => $validated['stress'],
                'energy' => $validated['energy'],
                'focus' => $validated['focus'],
                'sleep_hours' => $validated['sleep_hours'] ?? null,
                'notes' => $validated['notes'] ?? null,
            ]
        );

        return response()->json([
            'message' => 'Check-in saved successfully.',
            'checkin' => $checkin,
        ]);
    }
}
