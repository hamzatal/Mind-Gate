<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        // إذا كان المستخدم أكمل ملفه مسبقًا
        if ((int) ($user->profile_completed ?? 0) === 1) {
            return redirect()->route('home');
        }

        return Inertia::render('Auth/CompleteProfile', [
            'user' => $user,
            'profile' => $user->patientProfile,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_mood' => ['required', 'string', 'max:100'],
            'stress_level' => ['required', 'string', 'max:100'],
            'anxiety_level' => ['required', 'string', 'max:100'],
            'sleep_quality' => ['required', 'string', 'max:100'],
            'focus_level' => ['required', 'string', 'max:100'],
            'energy_level' => ['required', 'string', 'max:100'],
            'support_history' => ['required', 'string', 'max:100'],
            'primary_concern' => ['required', 'string', 'max:2000'],
            'support_goal' => ['required', 'string', 'max:2000'],
            'preferred_support_style' => ['required', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:4000'],
        ]);

        $request->user()->patientProfile()->updateOrCreate(
            ['user_id' => $request->user()->id],
            array_merge($validated, [
                'completed_at' => now(),
            ])
        );

        $request->user()->update([
            'profile_completed' => 1,
        ]);

        return redirect()->route('home');
    }
}
