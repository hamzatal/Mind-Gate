<?php

namespace App\Http\Controllers;

use App\Models\AssessmentResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Assessment/Quick');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'anxiety' => ['required', 'integer', 'min:1', 'max:5'],
            'stress' => ['required', 'integer', 'min:1', 'max:5'],
            'sleep_quality' => ['required', 'integer', 'min:1', 'max:5'],
            'mood_balance' => ['required', 'integer', 'min:1', 'max:5'],
            'focus' => ['required', 'integer', 'min:1', 'max:5'],
            'energy' => ['required', 'integer', 'min:1', 'max:5'],
        ]);

        $anxietyScore = (int) $validated['anxiety'];
        $stressScore = (int) $validated['stress'];
        $sleepScore = 6 - (int) $validated['sleep_quality'];
        $moodScore = 6 - (int) $validated['mood_balance'];
        $focusScore = 6 - (int) $validated['focus'];
        $energyScore = 6 - (int) $validated['energy'];

        $total = $anxietyScore + $stressScore + $sleepScore + $moodScore + $focusScore + $energyScore;

        if ($total <= 10) {
            $level = 'low';
            $summary = 'The answers suggest a relatively stable state with mild emotional strain.';
            $recommendation = 'Start with daily check-ins and calming resources.';
        } elseif ($total <= 18) {
            $level = 'moderate';
            $summary = 'The answers show noticeable pressure that could benefit from more structure and support.';
            $recommendation = 'Use guided resources, daily tracking, and consider connecting with a specialist.';
        } else {
            $level = 'high';
            $summary = 'The answers suggest a higher level of strain across more than one area.';
            $recommendation = 'Prioritize structured support and consider booking with a specialist soon.';
        }

        $record = AssessmentResult::create([
            'user_id' => Auth::guard('web')->check() ? Auth::guard('web')->id() : null,
            'full_name' => $validated['full_name'] ?? null,
            'email' => $validated['email'] ?? null,
            'anxiety_score' => $anxietyScore,
            'stress_score' => $stressScore,
            'sleep_score' => $sleepScore,
            'mood_score' => $moodScore,
            'focus_score' => $focusScore,
            'energy_score' => $energyScore,
            'total_score' => $total,
            'level' => $level,
            'summary' => $summary,
            'recommendation' => $recommendation,
            'raw_answers' => $validated,
        ]);

        return response()->json([
            'message' => 'Assessment submitted successfully.',
            'result' => [
                'id' => $record->id,
                'level' => $record->level,
                'total_score' => $record->total_score,
                'summary' => $record->summary,
                'recommendation' => $record->recommendation,
            ],
        ]);
    }
}
