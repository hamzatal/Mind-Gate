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
    public function create(): Response
    {
        return Inertia::render('Admin/Login');
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
        ]);

        if (!Auth::guard('admin')->attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ], $request->boolean('remember'))) {
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
            'admin_id' => $admin?->id,
            'email' => $admin?->email,
        ]);

        return redirect()->route('admin.dashboard');
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
