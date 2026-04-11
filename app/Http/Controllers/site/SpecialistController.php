<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Specialist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SpecialistController extends Controller
{
    public function index(Request $request)
    {
        $query = Specialist::query()->where('is_active', true);

        if ($search = $request->string('search')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('job_title', 'like', "%{$search}%")
                    ->orWhere('specialization', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('languages', 'like', "%{$search}%");
            });
        }

        if ($mode = $request->string('mode')->toString()) {
            if (in_array($mode, ['online', 'in_person', 'both'], true)) {
                $query->where('session_mode', $mode);
            }
        }

        $specialists = $query
            ->orderBy('sort_order')
            ->latest('id')
            ->paginate(9)
            ->withQueryString()
            ->through(function ($item) {
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

        return Inertia::render('Specialists/Index', [
            'specialists' => $specialists,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'mode' => $request->string('mode')->toString(),
            ],
        ]);
    }
}
