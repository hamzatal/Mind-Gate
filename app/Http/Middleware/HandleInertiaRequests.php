<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $adminAvatarColumn = null;

        if (Schema::hasTable('admins')) {
            if (Schema::hasColumn('admins', 'avatar')) {
                $adminAvatarColumn = 'avatar';
            } elseif (Schema::hasColumn('admins', 'image')) {
                $adminAvatarColumn = 'image';
            }
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => function () {
                    if (!Auth::guard('web')->check()) {
                        return null;
                    }

                    $user = Auth::guard('web')->user();

                    return [
                        'id' => $user->id,
                        'name' => $user->full_name ?? $user->name ?? 'User',
                        'email' => $user->email ?? null,
                        'profile_completed' => (bool) ($user->profile_completed ?? false),
                        'role' => 'user',
                    ];
                },
                'admin' => function () use ($adminAvatarColumn) {
                    if (!Auth::guard('admin')->check()) {
                        return null;
                    }

                    $admin = Auth::guard('admin')->user();

                    return [
                        'id' => $admin->id,
                        'name' => $admin->name ?? 'Admin',
                        'email' => $admin->email ?? null,
                        'avatar' => $adminAvatarColumn && !empty($admin->{$adminAvatarColumn})
                            ? asset('storage/' . $admin->{$adminAvatarColumn})
                            : null,
                        'role' => 'admin',
                    ];
                },
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
        ]);
    }
}
