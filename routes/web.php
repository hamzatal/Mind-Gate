<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ChatBotController;
use App\Http\Controllers\OnboardingController;

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
Route::get('/', [HomeController::class, 'index'])->name('welcome');

Route::get('/about-us', fn() => Inertia::render('about-us'))->name('about-us');
Route::get('/ContactPage', fn() => Inertia::render('ContactPage'))->name('ContactPage');
Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');

/*
|--------------------------------------------------------------------------
| Admin Auth Routes
|--------------------------------------------------------------------------
*/
Route::get('/admin/login', [LoginController::class, 'create'])->name('admin.login');
Route::post('/admin/login', [LoginController::class, 'store'])->name('admin.login.submit');

/*
|--------------------------------------------------------------------------
| User Onboarding Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:web', 'verified', 'active'])->group(function () {
    Route::get('/onboarding', [OnboardingController::class, 'create'])->name('onboarding.create');
    Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.store');
});

/*
|--------------------------------------------------------------------------
| User Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:web', 'verified', 'active', 'profile.completed'])->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::get('/UserProfile', fn() => Inertia::render('UserProfile', [
        'user' => Auth::user(),
    ]))->name('UserProfile');

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password.update');
        Route::delete('/', [ProfileController::class, 'deactivate'])->name('deactivate');
    });
});

/*
|--------------------------------------------------------------------------
| Admin Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [AdminController::class, 'getAdminProfile'])->name('profile');
    Route::post('/profile', [AdminController::class, 'updateAdminProfile'])->name('profile.update');
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
