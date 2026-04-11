<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\HeroSection;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        try {
            $admin = Auth::guard('admin')->user();

            if (!$admin) {
                return redirect()->route('admin.login');
            }

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

            $stats = [
                'users' => Schema::hasTable('users') ? User::count() : 0,
                'inactive_users' => Schema::hasTable('users') && $activeColumn
                    ? User::where($activeColumn, 0)->count()
                    : 0,
                'messages' => Schema::hasTable('contacts') ? Contact::count() : 0,
                'unread_messages' => Schema::hasTable('contacts') && Schema::hasColumn('contacts', 'is_read')
                    ? Contact::where('is_read', 0)->count()
                    : 0,
                'specialists' => Schema::hasTable('specialists')
                    ? DB::table('specialists')->where('is_active', 1)->count()
                    : 0,
                'resources' => Schema::hasTable('mental_resources')
                    ? DB::table('mental_resources')->where('is_published', 1)->count()
                    : 0,
                'assessments' => Schema::hasTable('assessment_results')
                    ? DB::table('assessment_results')->count()
                    : 0,
                'checkins' => Schema::hasTable('daily_checkins')
                    ? DB::table('daily_checkins')->count()
                    : 0,
                'organizations' => Schema::hasTable('organizations')
                    ? DB::table('organizations')->count()
                    : 0,
                'hero_sections' => Schema::hasTable('hero_sections')
                    ? HeroSection::count()
                    : 0,
            ];

            $latestUsers = collect();

            if (Schema::hasTable('users')) {
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

                $latestUsersQuery = User::query()->select($select);

                if ($createdColumn) {
                    $latestUsersQuery->latest($createdColumn);
                } else {
                    $latestUsersQuery->latest('id');
                }

                $latestUsers = $latestUsersQuery->take(5)->get();
            }

            $latestMessages = collect();

            if (Schema::hasTable('contacts')) {
                $contactSelect = ['id', 'name', 'email', 'subject', 'message'];

                if (Schema::hasColumn('contacts', 'is_read')) {
                    $contactSelect[] = 'is_read';
                }

                if (Schema::hasColumn('contacts', 'created_at')) {
                    $contactSelect[] = 'created_at';
                }

                $latestMessages = Contact::select($contactSelect)
                    ->latest('id')
                    ->take(5)
                    ->get();
            }

            return Inertia::render('Admin/Dashboard', [
                'admin' => [
                    'id' => $admin->id,
                    'name' => $admin->name ?? 'Admin',
                    'email' => $admin->email ?? null,
                ],
                'stats' => $stats,
                'latest_users' => $latestUsers,
                'latest_messages' => $latestMessages,
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
