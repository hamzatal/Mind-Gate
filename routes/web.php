<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\ChatBotController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\DailyCheckinController;
use App\Http\Controllers\Site\SpecialistController;
use App\Http\Controllers\Site\ResourceController;


use App\Http\Controllers\AdminAuth\AdminController;
use App\Http\Controllers\AdminAuth\DashboardController;
use App\Http\Controllers\AdminAuth\HeroSectionController;
use App\Http\Controllers\AdminAuth\LoginController;

require __DIR__ . '/auth.php';

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect()->route('home');
})->name('welcome');

Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/about-us', fn() => Inertia::render('about-us'))->name('about-us');
Route::get('/ContactPage', fn() => Inertia::render('ContactPage'))->name('ContactPage');

Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');

Route::get('/specialists', [SpecialistController::class, 'index'])->name('specialists.index');

Route::get('/resources', [ResourceController::class, 'index'])->name('resources.index');
Route::get('/resources/{slug}', [ResourceController::class, 'show'])->name('resources.show');

Route::get('/assessment/quick', [AssessmentController::class, 'index'])->name('assessment.quick.page');
Route::post('/assessment/quick', [AssessmentController::class, 'store'])->name('assessment.quick');

/*
|--------------------------------------------------------------------------
| Admin Guest Routes
|--------------------------------------------------------------------------
*/

Route::middleware('guest:admin')->group(function () {
    Route::get('/admin/login', [LoginController::class, 'create'])->name('admin.login');
    Route::post('/admin/login', [LoginController::class, 'store'])->name('admin.login.submit');
});

/*
|--------------------------------------------------------------------------
| User Auth Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:web', 'verified', 'active'])->group(function () {
    Route::get('/onboarding', [OnboardingController::class, 'create'])->name('onboarding.create');
    Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');
});

Route::middleware(['auth:web', 'verified', 'active', 'profile.completed'])->group(function () {
    Route::get('/UserProfile', function () {
        return Inertia::render('UserProfile', [
            'user' => Auth::guard('web')->user(),
        ]);
    })->name('UserProfile');

    Route::post('/daily-checkins', [DailyCheckinController::class, 'store'])->name('daily-checkins.store');

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password.update');
        Route::delete('/', [ProfileController::class, 'deactivate'])->name('deactivate');
    });
});



/*|--------------------------------------------------------------------------
| User Profile API Routes
|--------------------------------------------------------------------------*/

Route::middleware(['auth:web', 'verified', 'active'])->group(function () {
    Route::get('/UserProfile', function () {
        return Inertia::render('UserProfile');
    })->name('UserProfile');

    Route::prefix('api/profile')->group(function () {
        Route::get('/', [UserProfileController::class, 'show']);
        Route::post('/', [UserProfileController::class, 'update']);
        Route::put('/password', [UserProfileController::class, 'updatePassword']);
        Route::put('/deactivate', [UserProfileController::class, 'deactivate']);
    });
});



/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [AdminController::class, 'getAdminProfile'])->name('profile');
    Route::put('/profile', [AdminController::class, 'updateAdminProfile'])->name('profile.update');
    Route::post('/profile/password', [AdminController::class, 'updateAdminPassword'])->name('profile.password');

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('index');
        Route::post('/{id}/toggle-status', [AdminController::class, 'toggleUserStatus'])->name('toggle-status');
    });

    Route::get('/messages', [AdminController::class, 'showContacts'])->name('messages');
    Route::patch('/messages/{id}/read', [AdminController::class, 'markAsRead'])->name('messages.read');

    Route::prefix('hero')->name('hero.')->group(function () {
        Route::get('/', [HeroSectionController::class, 'index'])->name('index');
        Route::post('/', [HeroSectionController::class, 'store'])->name('store');
        Route::post('/{id}', [HeroSectionController::class, 'update'])->name('update');
        Route::patch('/{id}/toggle', [HeroSectionController::class, 'toggleActive'])->name('toggle');
        Route::delete('/{id}', [HeroSectionController::class, 'destroy'])->name('delete');
    });
});

/*
|--------------------------------------------------------------------------
| Chatbot
|--------------------------------------------------------------------------
*/

Route::post('/chatbot', [ChatBotController::class, 'handleChat'])->name('chatbot.handle');

/*
|--------------------------------------------------------------------------
| Fallback
|--------------------------------------------------------------------------
*/

Route::get('/404', fn() => Inertia::render('Errors/404'))->name('404');
Route::fallback(fn() => Inertia::render('Errors/404'));
