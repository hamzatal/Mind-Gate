<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HeroSectionController extends Controller
{
    public function index()
    {
        $admin = Auth::guard('admin')->user();

        $heroSections = HeroSection::latest()->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'subtitle' => $item->subtitle,
                'image' => $item->image ? Storage::url($item->image) : null,
                'is_active' => (bool) $item->is_active,
                'created_at' => $item->created_at,
            ];
        });

        return Inertia::render('Admin/HeroSections', [
            'auth' => [
                'user' => [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'avatar' => null,
                ],
            ],
            'heroSections' => $heroSections,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'nullable|string|max:255',
                'subtitle' => 'nullable|string|max:2000',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            $imageName = time() . '.' . $request->image->extension();
            $request->image->storeAs('hero', $imageName, 'public');

            HeroSection::create([
                'title' => $validated['title'] ?? '',
                'subtitle' => $validated['subtitle'] ?? '',
                'image' => 'hero/' . $imageName,
                'is_active' => true,
            ]);

            return redirect()->route('admin.hero.index')->with('success', 'Hero section added successfully.');
        } catch (ValidationException $e) {
            Log::error('Store hero section validation failed:', ['errors' => $e->errors()]);
            return back()->withErrors($e->errors())->with('error', 'Failed to create hero section.');
        } catch (\Exception $e) {
            Log::error('Store hero section failed:', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to create hero section.');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $hero = HeroSection::findOrFail($id);

            $validated = $request->validate([
                'title' => 'nullable|string|max:255',
                'subtitle' => 'nullable|string|max:2000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            $data = [
                'title' => $validated['title'] ?? '',
                'subtitle' => $validated['subtitle'] ?? '',
                'image' => $hero->image,
            ];

            if ($request->hasFile('image')) {
                if ($hero->image) {
                    Storage::disk('public')->delete($hero->image);
                }

                $imageName = time() . '.' . $request->image->extension();
                $request->image->storeAs('hero', $imageName, 'public');
                $data['image'] = 'hero/' . $imageName;
            }

            $hero->update($data);

            return redirect()->route('admin.hero.index')->with('success', 'Hero section updated successfully.');
        } catch (ValidationException $e) {
            Log::error('Update hero section validation failed:', [
                'id' => $id,
                'errors' => $e->errors(),
            ]);
            return back()->withErrors($e->errors())->with('error', 'Failed to update hero section.');
        } catch (\Exception $e) {
            Log::error('Update hero section failed:', [
                'id' => $id,
                'error' => $e->getMessage(),
            ]);
            return back()->with('error', 'Failed to update hero section.');
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            $hero = HeroSection::findOrFail($id);

            if ($hero->image) {
                Storage::disk('public')->delete($hero->image);
            }

            $hero->delete();

            return redirect()->route('admin.hero.index')->with('success', 'Hero section deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Delete hero section failed:', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to delete hero section.');
        }
    }

    public function toggleActive(Request $request, $id)
    {
        try {
            $hero = HeroSection::findOrFail($id);
            $hero->is_active = !$hero->is_active;
            $hero->save();

            $message = $hero->is_active
                ? 'Hero section activated successfully.'
                : 'Hero section deactivated successfully.';

            return redirect()->route('admin.hero.index')->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Toggle hero section active status failed:', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to update active status.');
        }
    }
}
