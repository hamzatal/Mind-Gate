<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class LoginController extends Controller
{
    public function create(): Response|RedirectResponse
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }

        if (Auth::guard('web')->check()) {
            $user = Auth::guard('web')->user();

            if ($user && !$user->profile_completed) {
                return redirect()->route('onboarding.create');
            }

            return redirect()->route('home');
        }

        return Inertia::render('Admin/Login', [
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            Log::warning('Admin login failed', [
                'email' => $request->email,
            ]);

            throw ValidationException::withMessages([
                'email' => 'The provided admin credentials are incorrect.',
            ]);
        }

        $request->session()->regenerate();

        $admin = Auth::guard('admin')->user();

        Log::info('Admin logged in', [
            'admin_id' => $admin->id,
            'email' => $admin->email,
        ]);

        return redirect()->intended(route('admin.dashboard'));
    }

    public function destroy(Request $request): RedirectResponse
    {
        $adminId = Auth::guard('admin')->id();

        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        Log::info('Admin logged out', [
            'admin_id' => $adminId,
        ]);

        return redirect()->route('admin.login');
    }
}
