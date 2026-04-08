<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfProfileIncomplete
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return $next($request);
        }

        if (!(int) $user->profile_completed) {
            if (!$request->routeIs('onboarding.*')) {
                return redirect()->route('onboarding.create');
            }

            return $next($request);
        }

        if ($request->routeIs('onboarding.*')) {
            if ($request->query('completed') == 1) {
                return $next($request);
            }

            return redirect()->route('home');
        }

        return $next($request);
    }
}
