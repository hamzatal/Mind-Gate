<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UserProfileController extends Controller
{
    public function show(Request $request)
    {
        try {
            $user = Auth::guard('web')->user();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthenticated.',
                ], 401);
            }

            return response()->json([
                'status' => 'success',
                'user' => $this->formatUser($user),
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Failed to load authenticated profile', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to load profile.',
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $user = Auth::guard('web')->user();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthenticated.',
                ], 401);
            }

            $columns = Schema::hasTable('users') ? Schema::getColumnListing('users') : [];

            $nameColumn = $this->resolveFirstExistingColumn($columns, ['full_name', 'name']);
            $avatarColumn = $this->resolveFirstExistingColumn($columns, ['avatar', 'image']);

            $rules = [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            ];

            if (in_array('bio', $columns, true)) {
                $rules['bio'] = ['nullable', 'string', 'max:1000'];
            }

            if (in_array('phone', $columns, true)) {
                $rules['phone'] = ['nullable', 'string', 'max:30'];
            }

            if ($avatarColumn) {
                $rules['avatar'] = ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'];
            }

            $validated = $request->validate($rules);

            if ($nameColumn) {
                $user->{$nameColumn} = $validated['name'];
            }

            if (in_array('email', $columns, true)) {
                $user->email = $validated['email'];
            }

            if (in_array('bio', $columns, true)) {
                $user->bio = $validated['bio'] ?? null;
            }

            if (in_array('phone', $columns, true)) {
                $user->phone = $validated['phone'] ?? null;
            }

            if ($avatarColumn && $request->hasFile('avatar')) {
                if (!empty($user->{$avatarColumn})) {
                    Storage::disk('public')->delete($user->{$avatarColumn});
                }

                $path = $request->file('avatar')->store('avatars', 'public');
                $user->{$avatarColumn} = $path;
            }

            $user->save();

            return response()->json([
                'status' => 'Profile updated successfully.',
                'user' => $this->formatUser($user->fresh()),
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Failed to update authenticated profile', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'errors' => [
                    'general' => 'Failed to update profile.',
                ],
            ], 500);
        }
    }

    public function updatePassword(Request $request)
    {
        try {
            $user = Auth::guard('web')->user();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthenticated.',
                ], 401);
            }

            $validated = $request->validate([
                'current_password' => ['required', 'string'],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ]);

            if (!Hash::check($validated['current_password'], $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'errors' => [
                        'current_password' => 'Current password is incorrect.',
                    ],
                ], 422);
            }

            $user->password = Hash::make($validated['password']);
            $user->save();

            return response()->json([
                'status' => 'Password updated successfully.',
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Failed to update user password', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'errors' => [
                    'general' => 'Failed to update password.',
                ],
            ], 500);
        }
    }

    public function deactivate(Request $request)
    {
        try {
            $user = Auth::guard('web')->user();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthenticated.',
                ], 401);
            }

            $validated = $request->validate([
                'password' => ['required', 'string'],
                'deactivation_reason' => ['nullable', 'string', 'max:1000'],
            ]);

            if (!Hash::check($validated['password'], $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'errors' => [
                        'password' => 'Password is incorrect.',
                    ],
                ], 422);
            }

            $columns = Schema::hasTable('users') ? Schema::getColumnListing('users') : [];

            if (in_array('is_active', $columns, true)) {
                $user->is_active = 0;
            }

            if (in_array('deactivated_at', $columns, true)) {
                $user->deactivated_at = now();
            }

            if (in_array('deactivation_reason', $columns, true)) {
                $user->deactivation_reason = $validated['deactivation_reason'] ?? null;
            }

            $user->save();

            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'status' => 'Account deactivated successfully.',
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Failed to deactivate user account', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => 'error',
                'errors' => [
                    'general' => 'Failed to deactivate account.',
                ],
            ], 500);
        }
    }

    private function formatUser($user): array
    {
        $columns = Schema::hasTable('users') ? Schema::getColumnListing('users') : [];

        $nameColumn = $this->resolveFirstExistingColumn($columns, ['full_name', 'name']);
        $avatarColumn = $this->resolveFirstExistingColumn($columns, ['avatar', 'image']);

        return [
            'id' => $user->id,
            'name' => $nameColumn ? ($user->{$nameColumn} ?? '') : '',
            'email' => in_array('email', $columns, true) ? ($user->email ?? '') : '',
            'bio' => in_array('bio', $columns, true) ? ($user->bio ?? '') : '',
            'phone' => in_array('phone', $columns, true) ? ($user->phone ?? '') : '',
            'avatar_url' => ($avatarColumn && !empty($user->{$avatarColumn}))
                ? Storage::url($user->{$avatarColumn})
                : null,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ];
    }

    private function resolveFirstExistingColumn(array $columns, array $candidates): ?string
    {
        foreach ($candidates as $candidate) {
            if (in_array($candidate, $columns, true)) {
                return $candidate;
            }
        }

        return null;
    }
}
