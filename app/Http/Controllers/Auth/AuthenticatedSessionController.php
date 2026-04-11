<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response|RedirectResponse
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }

        if (Auth::guard('web')->check()) {
            $user = Auth::guard('web')->user();

            if (!$user->profile_completed) {
                return redirect()->route('onboarding.create');
            }

            return redirect()->route('home');
        }

        return Inertia::render('Auth/Login', [
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        if (!Auth::attempt([
            'email' => $request->email,
            'password' => $request->password,
            'is_active' => 1,
        ], $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => 'Your account is deactivated or the login details are incorrect.',
            ]);
        }

        $request->session()->regenerate();

        $user = Auth::user();

        if (!$user->profile_completed) {
            return redirect()->route('onboarding.create');
        }

        return redirect()->route('home');
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
