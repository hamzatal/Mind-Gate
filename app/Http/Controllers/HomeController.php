<?php

namespace App\Http\Controllers;

use App\Models\HeroSection;
use App\Models\Specialist;
use App\Models\MentalResource;
use App\Models\DailyCheckin;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $heroSections = HeroSection::query()
            ->where('is_active', true)
            ->latest('id')
            ->get()
            ->map(function ($hero) {
                return [
                    'id' => $hero->id,
                    'title' => $hero->title,
                    'subtitle' => $hero->subtitle,
                    'image' => $hero->image ? Storage::url($hero->image) : null,
                ];
            });

        $featuredSpecialists = Specialist::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->latest('id')
            ->take(4)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'full_name' => $item->full_name,
                    'job_title' => $item->job_title,
                    'specialization' => $item->specialization,
                    'languages' => $item->languages,
                    'session_mode' => $item->session_mode,
                    'city' => $item->city,
                    'bio' => $item->bio,
                    'image' => $item->image ? Storage::url($item->image) : null,
                ];
            });

        $featuredResources = MentalResource::query()
            ->where('is_published', true)
            ->orderByDesc('is_featured')
            ->latest('published_at')
            ->latest('id')
            ->take(6)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'type' => $item->type,
                    'category' => $item->category,
                    'excerpt' => $item->excerpt,
                    'cover_image' => $item->cover_image ? Storage::url($item->cover_image) : null,
                    'read_time' => $item->read_time,
                ];
            });

        $stats = [
            'users' => User::count(),
            'specialists' => Specialist::where('is_active', true)->count(),
            'resources' => MentalResource::where('is_published', true)->count(),
            'today_checkins' => Schema::hasTable('daily_checkins')
                ? DailyCheckin::whereDate('checkin_date', now()->toDateString())->count()
                : 0,
        ];

        $latestCheckin = null;
        $hasTodayCheckin = false;

        if (Auth::guard('web')->check()) {
            $user = Auth::guard('web')->user();

            $latestCheckin = DailyCheckin::query()
                ->where('user_id', $user->id)
                ->latest('checkin_date')
                ->latest('id')
                ->first();

            $hasTodayCheckin = DailyCheckin::query()
                ->where('user_id', $user->id)
                ->whereDate('checkin_date', now()->toDateString())
                ->exists();
        }

        return Inertia::render('Home', [
            'heroSections' => $heroSections,
            'featuredSpecialists' => $featuredSpecialists,
            'featuredResources' => $featuredResources,
            'stats' => $stats,
            'latestCheckin' => $latestCheckin,
            'hasTodayCheckin' => $hasTodayCheckin,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
