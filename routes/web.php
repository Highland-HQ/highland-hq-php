<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\CollectionsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DiscountsController;
use App\Http\Controllers\MarketingController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VendorsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

Route::get('/', function () {
    return Inertia::render('Storefront/Index');
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
                Route::get('/', [DashboardController::class, 'index'])->name(
                    'dashboard.index'
                );

                Route::resource('products', ProductsController::class);

                Route::resource('collections', CollectionsController::class);

                Route::resource('users', UsersController::class);

                Route::resource('orders', OrdersController::class);

                Route::get('chat', [DashboardController::class, 'index'])->name(
                    'dashboard.chat'
                );
                Route::get('notifications', [
                    DashboardController::class,
                    'index',
                ])->name('dashboard.notifications');
            });
        });

        Route::middleware('can:access-admin-dashboard')->group(function () {
            Route::resource('vendors', VendorsController::class);

            Route::resource('marketing', MarketingController::class);

            Route::resource('analytics', AnalyticsController::class);

            Route::resource('discounts', DiscountsController::class);
        });
    });
});
