<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Contact;
use App\Models\HeroSection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        try {
            $admin = Auth::guard('admin')->user();

            if (!$admin) {
                return redirect()->route('admin.login');
            }

            $stats = [
                'users' => User::count(),
                'active_users' => User::where('is_active', 1)->count(),
                'inactive_users' => User::where('is_active', 0)->count(),
                'messages' => Contact::count(),
                'unread_messages' => Contact::where('is_read', 0)->count(),
                'hero_sections' => HeroSection::count(),
                'active_hero_sections' => HeroSection::where('is_active', 1)->count(),
                'inactive_hero_sections' => HeroSection::where('is_active', 0)->count(),
            ];

            $latestUsers = User::select([
                'id',
                'full_name as name',
                'email',
                'is_active',
                'created_at',
            ])
                ->latest('created_at')
                ->take(5)
                ->get();

            $latestMessages = Contact::select([
                'id',
                'name',
                'email',
                'subject',
                'message',
                'is_read',
                'created_at',
            ])
                ->latest('created_at')
                ->take(5)
                ->get();

            $latestHeroSections = HeroSection::select([
                'id',
                'title',
                'subtitle',
                'image',
                'is_active',
                'created_at',
            ])
                ->latest('created_at')
                ->take(4)
                ->get()
                ->map(function ($hero) {
                    return [
                        'id' => $hero->id,
                        'title' => $hero->title,
                        'subtitle' => $hero->subtitle,
                        'image' => $hero->image ? Storage::url($hero->image) : null,
                        'is_active' => (bool) $hero->is_active,
                        'created_at' => $hero->created_at,
                    ];
                });

            $chartDays = collect(range(6, 0))->map(function ($daysAgo) {
                $date = Carbon::today()->subDays($daysAgo);

                return [
                    'label' => $date->format('D'),
                    'date' => $date->toDateString(),
                ];
            });

            $usersChart = $chartDays->map(function ($day) {
                return [
                    'label' => $day['label'],
                    'value' => User::whereDate('created_at', $day['date'])->count(),
                ];
            })->values();

            $messagesChart = $chartDays->map(function ($day) {
                return [
                    'label' => $day['label'],
                    'value' => Contact::whereDate('created_at', $day['date'])->count(),
                ];
            })->values();

            $heroChart = [
                [
                    'label' => 'Active',
                    'value' => HeroSection::where('is_active', 1)->count(),
                ],
                [
                    'label' => 'Inactive',
                    'value' => HeroSection::where('is_active', 0)->count(),
                ],
            ];

            return Inertia::render('Admin/Dashboard', [
                'auth' => [
                    'user' => [
                        'id' => $admin->id,
                        'name' => $admin->name,
                        'email' => $admin->email,
                        'avatar' => null,
                    ],
                ],
                'stats' => $stats,
                'latestUsers' => $latestUsers,
                'latestMessages' => $latestMessages,
                'latestHeroSections' => $latestHeroSections,
                'usersChart' => $usersChart,
                'messagesChart' => $messagesChart,
                'heroChart' => $heroChart,
                'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
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
