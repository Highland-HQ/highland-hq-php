<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

Route::get('/', function () {
  return Inertia::render('Storefront/Index', [
    'assets' => [asset('images/logos/highland-logo-black.png')],
  ]);
})->name('storefront.index');

Route::get('/shop/womens', [StorefrontController::class, 'index'])->name(
  'storefront.womens'
);

Route::get('/shop/mens', [StorefrontController::class, 'index'])->name(
  'storefront.mens'
);

Route::get('/shop/accessories', [StorefrontController::class, 'index'])->name(
  'storefront.accessories'
);

Route::get('/shop/collections', [StorefrontController::class, 'index'])->name(
  'storefront.collections'
);

Route::get('/shop/new', [StorefrontController::class, 'index'])->name(
  'storefront.new'
);

Route::get('/shop/sale', [StorefrontController::class, 'index'])->name(
  'storefront.sale'
);

//-----------------------------------------------

Route::middleware([
  'auth:sanctum',
  config('jetstream.auth_session'),
  'verified',
])->group(function () {
  Route::middleware('can:access-dashboard')->group(function () {
    Route::prefix('dashboard')->group(function () {
      Route::middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'verified',
      ])->group(function () {
        Route::get('/', function () {
          return Inertia::render('Dashboard/Index');
        })->name('dashboard');
      });

      Route::resource('products', ProductsController::class);
    });

    Route::get('/dashboard/orders', [
      DashboardController::class,
      'index',
    ])->name('dashboard.orders');

    Route::get('/dashboard/chat', [DashboardController::class, 'index'])->name(
      'dashboard.chat'
    );

    Route::get('/dashboard/notifications', [
      DashboardController::class,
      'index',
    ])->name('dashboard.notifications');

    Route::middleware('can:access-admin-dashboard')->group(function () {
      Route::get('/dashboard/users', [
        DashboardController::class,
        'index',
      ])->name('dashboard.users');

      Route::get('/dashboard/marketing', [
        DashboardController::class,
        'index',
      ])->name('dashboard.marketing');

      Route::get('/dashboard/discounts', [
        DashboardController::class,
        'index',
      ])->name('dashboard.discounts');

      Route::get('/dashboard/vendors', [
        DashboardController::class,
        'index',
      ])->name('dashboard.vendors');
    });
  });
});
