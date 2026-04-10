<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Contact;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = User::select([
                'id',
                'full_name as name',
                'email',
                'is_active',
                'created_at',
            ])->latest('created_at');

            if ($search = $request->input('search')) {
                $query->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            }

            if ($status = $request->input('status')) {
                $query->where('is_active', $status === 'active' ? 1 : 0);
            }

            $users = $query->paginate(10)->withQueryString();
            $admin = Auth::guard('admin')->user();

            return Inertia::render('Admin/Users', [
                'auth' => [
                    'user' => [
                        'id' => $admin->id,
                        'name' => $admin->name,
                        'email' => $admin->email,
                        'avatar' => null,
                    ],
                ],
                'users' => $users,
                'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch users:', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to load users.');
        }
    }

    public function toggleUserStatus(Request $request, $id)
    {
        try {
            $admin = Auth::guard('admin')->user();
            $isAdmin = Admin::where('id', $id)->exists();

            if ($isAdmin && $id == $admin->id) {
                return back()->with('error', 'You cannot deactivate your own admin account.');
            }

            $user = User::findOrFail($id);
            $user->is_active = !$user->is_active;
            $user->save();

            if (!$user->is_active) {
                DB::table('sessions')
                    ->where('user_id', $user->id)
                    ->delete();
            }

            $status = $user->is_active ? 'activated' : 'deactivated';

            Log::info("User {$user->id} {$status} by admin {$admin->id}");

            return redirect()->route('admin.users.index')->with('success', "User {$status} successfully");
        } catch (\Exception $e) {
            Log::error('Failed to toggle user status:', [
                'user_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to toggle user status.');
        }
    }

    public function showContacts(Request $request)
    {
        try {
            $query = Contact::select([
                'id',
                'name',
                'email',
                'subject',
                'message',
                'created_at',
                'is_read',
            ])->orderBy('created_at', 'desc');

            if ($search = $request->input('search')) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%")
                        ->orWhere('message', 'like', "%{$search}%");
                });
            }

            $messages = $query->paginate(10)->withQueryString();
            $admin = Auth::guard('admin')->user();

            return Inertia::render('Admin/ContactsView', [
                'auth' => [
                    'user' => [
                        'id' => $admin->id,
                        'name' => $admin->name,
                        'email' => $admin->email,
                        'avatar' => null,
                    ],
                ],
                'messages' => $messages,
                'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch contacts:', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to load contacts.');
        }
    }

    public function markAsRead($id)
    {
        try {
            $contact = Contact::findOrFail($id);
            $contact->is_read = true;
            $contact->save();

            return redirect()->route('admin.messages')->with('success', 'Message marked as read successfully');
        } catch (\Exception $e) {
            Log::error('Failed to mark message as read:', [
                'contact_id' => $id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to mark message as read.');
        }
    }

    public function getAdminProfile()
    {
        try {
            $admin = Auth::guard('admin')->user();

            return Inertia::render('Admin/Profile', [
                'admin' => [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'avatar' => null,
                    'created_at' => $admin->created_at,
                    'updated_at' => $admin->updated_at,
                ],
                'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch admin profile:', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to load profile.');
        }
    }

    public function updateAdminProfile(Request $request)
    {
        try {
            $admin = Auth::guard('admin')->user();

            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'max:255', 'unique:admins,email,' . $admin->id],
            ]);

            $admin->name = $validated['name'];
            $admin->email = $validated['email'];
            $admin->save();

            return redirect()->route('admin.profile')->with('success', 'Profile updated successfully');
        } catch (\Exception $e) {
            Log::error('Failed to update admin profile:', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to update profile.');
        }
    }

    public function updateAdminPassword(Request $request)
    {
        try {
            $admin = Auth::guard('admin')->user();

            $validated = $request->validate([
                'current_password' => ['required', function ($attribute, $value, $fail) use ($admin) {
                    if (!Hash::check($value, $admin->password)) {
                        $fail('The current password is incorrect.');
                    }
                }],
                'new_password' => ['required', 'string', 'min:8', 'confirmed'],
            ]);

            $admin->update([
                'password' => Hash::make($validated['new_password']),
            ]);

            return redirect()->route('admin.profile')->with('success', 'Password updated successfully');
        } catch (\Exception $e) {
            Log::error('Failed to update admin password:', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to update password.');
        }
    }
}
