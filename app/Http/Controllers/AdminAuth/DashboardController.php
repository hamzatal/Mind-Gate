<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class DashboardController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        try {
            $admin = Auth::guard('admin')->user();

            if (!$admin) {
                return redirect()->route('admin.login');
            }

            return Inertia::render('Admin/Dashboard', [
                'auth' => [
                    'user' => [
                        'id' => $admin->id,
                        'name' => $admin->name,
                        'email' => $admin->email,
                    ],
                ],
            ]);
        } catch (\Throwable $e) {
            Log::error('Failed to load admin dashboard', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return redirect()->route('admin.login')->withErrors([
                'email' => 'Dashboard failed to load. Check laravel.log.',
            ]);
        }
    }
}
