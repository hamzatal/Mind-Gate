<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\MentalResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function index(Request $request)
    {
        $query = MentalResource::query()->where('is_published', true);

        if ($search = $request->string('search')->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($type = $request->string('type')->toString()) {
            $query->where('type', $type);
        }

        $resources = $query
            ->orderByDesc('is_featured')
            ->latest('published_at')
            ->latest('id')
            ->paginate(9)
            ->withQueryString()
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'type' => $item->type,
                    'category' => $item->category,
                    'excerpt' => $item->excerpt,
                    'cover_image' => $item->cover_image ? Storage::url($item->cover_image) : null,
                    'read_time' => $item->read_time,
                    'published_at' => $item->published_at,
                ];
            });

        return Inertia::render('Resources/Index', [
            'resources' => $resources,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'type' => $request->string('type')->toString(),
            ],
        ]);
    }

    public function show(string $slug)
    {
        $resource = MentalResource::query()
            ->where('is_published', true)
            ->where('slug', $slug)
            ->firstOrFail();

        $related = MentalResource::query()
            ->where('is_published', true)
            ->where('id', '!=', $resource->id)
            ->when($resource->category, fn($q) => $q->where('category', $resource->category))
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'type' => $item->type,
                    'category' => $item->category,
                    'read_time' => $item->read_time,
                ];
            });

        return Inertia::render('Resources/Show', [
            'resource' => [
                'id' => $resource->id,
                'title' => $resource->title,
                'slug' => $resource->slug,
                'type' => $resource->type,
                'category' => $resource->category,
                'excerpt' => $resource->excerpt,
                'cover_image' => $resource->cover_image ? Storage::url($resource->cover_image) : null,
                'read_time' => $resource->read_time,
                'content' => $resource->content,
                'published_at' => $resource->published_at,
            ],
            'related' => $related,
        ]);
    }
}
