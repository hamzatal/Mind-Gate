<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                return $this->redirectToHome($guard);
            }
        }

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

        return $next($request);
    }

    protected function redirectToHome(?string $guard)
    {
        if ($guard === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        if ($guard === 'web' || $guard === null) {
            $user = Auth::guard('web')->user();

            if ($user && !$user->profile_completed) {
                return redirect()->route('onboarding.create');
            }

            return redirect()->route('home');
        }

        return redirect()->route('home');
    }
}
