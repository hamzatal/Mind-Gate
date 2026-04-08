<?php

namespace App\Http\Controllers;

use App\Models\HeroSection;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index()
    {
        $heroSections = HeroSection::select(['id', 'title', 'subtitle', 'image'])
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($hero) {
                $hero->image = $hero->image ? Storage::url($hero->image) : null;
                return $hero;
            });

        $translations = [
            'journey_planner_title' => __('Welcome to Mind Gate'),
            'journey_planner_subtitle' => __('Your mental health companion'),
            'hero_section_title' => __('Mind Gate'),
            'benefits_section_title' => __('Why Choose Mind Gate'),
            'search_placeholder' => __('Search for assessments, specialists...'),
        ];

        return Inertia::render('Home', [
            'heroSections' => $heroSections,
            'translations' => $translations,
        ]);
    }
}
