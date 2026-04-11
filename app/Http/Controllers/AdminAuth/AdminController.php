<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        try {
            $userColumns = Schema::hasTable('users') ? Schema::getColumnListing('users') : [];
            $nameColumn = $this->resolveFirstExistingColumn($userColumns, [
                'full_name',
                'name',
                'username',
                'user_name',
            ]);
            $emailColumn = $this->resolveFirstExistingColumn($userColumns, [
                'email',
                'user_email',
                'mail',
            ]);
            $activeColumn = in_array('is_active', $userColumns, true) ? 'is_active' : null;
            $createdColumn = in_array('created_at', $userColumns, true) ? 'created_at' : null;

            $select = ['id'];

            if ($nameColumn) {
                $select[] = DB::raw("`{$nameColumn}` as name");
            } else {
                $select[] = DB::raw("'User' as name");
            }

            if ($emailColumn) {
                $select[] = DB::raw("`{$emailColumn}` as email");
            } else {
                $select[] = DB::raw("'' as email");
            }

            if ($activeColumn) {
                $select[] = DB::raw("`{$activeColumn}` as is_active");
            } else {
                $select[] = DB::raw("1 as is_active");
            }

            if ($createdColumn) {
                $select[] = $createdColumn;
            }

            $query = User::query()->select($select);

            if ($search = $request->input('search')) {
                $query->where(function ($q) use ($search, $nameColumn, $emailColumn) {
                    if ($nameColumn) {
                        $q->orWhere($nameColumn, 'like', "%{$search}%");
                    }

                    if ($emailColumn) {
                        $q->orWhere($emailColumn, 'like', "%{$search}%");
                    }
                });
            }

            if ($status = $request->input('status')) {
                if ($activeColumn) {
                    $query->where($activeColumn, $status === 'active' ? 1 : 0);
                }
            }

            if ($createdColumn) {
                $query->latest($createdColumn);
            } else {
                $query->latest('id');
            }

            $users = $query->paginate(10)->withQueryString();
            $admin = Auth::guard('admin')->user();

            return Inertia::render('Admin/Users', [
                'auth' => [
                    'user' => [
                        'id' => $admin->id,
                        'name' => $admin->name ?? 'Admin',
                        'email' => $admin->email ?? null,
                    ],
                ],
                'users' => $users,
                'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
                ],
            ]);
        } catch (\Throwable $e) {
            Log::error('Failed to fetch users', [
                'message' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to load users.');
        }
    }

    public function toggleUserStatus(Request $request, $id)
    {
        try {
            if (!Schema::hasTable('users') || !Schema::hasColumn('users', 'is_active')) {
                return back()->with('error', 'The users table does not contain is_active column.');
            }

            $admin = Auth::guard('admin')->user();
            $isAdmin = Schema::hasTable('admins') ? Admin::where('id', $id)->exists() : false;

            if ($isAdmin && (int) $id === (int) $admin->id) {
                return back()->with('error', 'You cannot deactivate your own admin account.');
            }

            $user = User::findOrFail($id);
            $user->is_active = !$user->is_active;

            if (Schema::hasColumn('users', 'deactivated_at')) {
                $user->deactivated_at = $user->is_active ? null : now();
            }

            if (Schema::hasColumn('users', 'deactivation_reason')) {
                $user->deactivation_reason = $user->is_active ? null : 'Deactivated by admin';
            }

            $user->save();

            if (!$user->is_active && Schema::hasTable('sessions') && Schema::hasColumn('sessions', 'user_id')) {
                DB::table('sessions')->where('user_id', $user->id)->delete();
            }

            return redirect()->route('admin.users.index')->with(
                'success',
                $user->is_active ? 'User activated successfully' : 'User deactivated successfully'
            );
        } catch (\Throwable $e) {
            Log::error('Failed to toggle user status', [
                'message' => $e->getMessage(),
                'user_id' => $id,
            ]);

            return back()->with('error', 'Failed to toggle user status.');
        }
    }

    public function showContacts(Request $request)
    {
        try {
            $query = Contact::query();

            $contactColumns = Schema::hasTable('contacts') ? Schema::getColumnListing('contacts') : [];

            $select = array_values(array_intersect(
                ['id', 'name', 'email', 'subject', 'message', 'is_read', 'created_at'],
                $contactColumns
            ));

            if (!empty($select)) {
                $query->select($select);
            }

            if ($search = $request->input('search')) {
                $query->where(function ($q) use ($search, $contactColumns) {
                    foreach (['name', 'email', 'subject', 'message'] as $column) {
                        if (in_array($column, $contactColumns, true)) {
                            $q->orWhere($column, 'like', "%{$search}%");
                        }
                    }
                });
            }

            if (in_array('created_at', $contactColumns, true)) {
                $query->latest('created_at');
            } else {
                $query->latest('id');
            }

            $messages = $query->paginate(10)->withQueryString();
            $admin = Auth::guard('admin')->user();

            return Inertia::render('Admin/ContactsView', [
                'auth' => [
                    'user' => [
                        'id' => $admin->id,
                        'name' => $admin->name ?? 'Admin',
                        'email' => $admin->email ?? null,
                    ],
                ],
                'messages' => $messages,
                'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
                ],
            ]);
        } catch (\Throwable $e) {
            Log::error('Failed to fetch contacts', [
                'message' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to load contacts.');
        }
    }

    public function markAsRead($id)
    {
        try {
            if (!Schema::hasColumn('contacts', 'is_read')) {
                return back()->with('error', 'The contacts table does not contain is_read column.');
            }

            $contact = Contact::findOrFail($id);
            $contact->is_read = true;
            $contact->save();

            return redirect()->route('admin.messages')->with('success', 'Message marked as read successfully');
        } catch (\Throwable $e) {
            Log::error('Failed to mark message as read', [
                'message' => $e->getMessage(),
                'contact_id' => $id,
            ]);

            return back()->with('error', 'Failed to mark message as read.');
        }
    }

    public function getAdminProfile()
    {
        try {
            $admin = Auth::guard('admin')->user();

            $avatarColumn = $this->resolveFirstExistingColumn(
                Schema::hasTable('admins') ? Schema::getColumnListing('admins') : [],
                ['avatar', 'image']
            );

            return Inertia::render('Admin/Profile', [
                'admin' => [
                    'id' => $admin->id,
                    'name' => $admin->name ?? 'Admin',
                    'email' => $admin->email ?? null,
                    'avatar' => $avatarColumn && !empty($admin->{$avatarColumn})
                        ? Storage::url($admin->{$avatarColumn})
                        : null,
                    'created_at' => $admin->created_at ?? null,
                    'updated_at' => $admin->updated_at ?? null,
                ],
                'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
                ],
            ]);
        } catch (\Throwable $e) {
            Log::error('Failed to fetch admin profile', [
                'message' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to load profile.');
        }
    }

    public function updateAdminProfile(Request $request)
    {
        try {
            $admin = Auth::guard('admin')->user();
            $adminColumns = Schema::hasTable('admins') ? Schema::getColumnListing('admins') : [];
            $avatarColumn = $this->resolveFirstExistingColumn($adminColumns, ['avatar', 'image']);

            $rules = [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'max:255', 'unique:admins,email,' . $admin->id],
            ];

            if ($avatarColumn) {
                $rules['avatar'] = ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'];
            }

            $validated = $request->validate($rules);

            $admin->name = $validated['name'];
            $admin->email = $validated['email'];

            if ($avatarColumn && $request->hasFile('avatar')) {
                if (!empty($admin->{$avatarColumn})) {
                    Storage::disk('public')->delete($admin->{$avatarColumn});
                }

                $path = $request->file('avatar')->store('admin_images', 'public');
                $admin->{$avatarColumn} = $path;
            }

            $admin->save();

            return redirect()->route('admin.profile')->with('success', 'Profile updated successfully');
        } catch (\Throwable $e) {
            Log::error('Failed to update admin profile', [
                'message' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to update profile.');
        }
    }

    public function updateAdminPassword(Request $request)
    {
        try {
            $admin = Auth::guard('admin')->user();

            $validated = $request->validate([
                'current_password' => [
                    'required',
                    function ($attribute, $value, $fail) use ($admin) {
                        if (!Hash::check($value, $admin->password)) {
                            $fail('The current password is incorrect.');
                        }
                    },
                ],
                'new_password' => ['required', 'string', 'min:8', 'confirmed'],
            ]);

            $admin->password = Hash::make($validated['new_password']);
            $admin->save();

            return redirect()->route('admin.profile')->with('success', 'Password updated successfully');
        } catch (\Throwable $e) {
            Log::error('Failed to update admin password', [
                'message' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to update password.');
        }
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
