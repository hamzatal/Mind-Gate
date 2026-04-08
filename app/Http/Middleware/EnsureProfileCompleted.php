<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureProfileCompleted
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard('web')->check()) {
            $user = Auth::guard('web')->user();

            if (!$user->profile_completed && !$request->routeIs('onboarding.*')) {
                return redirect()->route('onboarding.create');
            }
        }

        return $next($request);
    }
}
