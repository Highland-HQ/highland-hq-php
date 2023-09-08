<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    \Log::info('Is Authenticated: ' . auth()->check());
    \Log::info('Authenticated User: ' . auth()->user());
    // \Log::info(
    //   auth()
    //     ->user()
    //     ->getAbilities()
    //     ->pluck('name')
    //     ->all()
    // );

    Inertia::share('auth.permissions', function () {
      if (auth()->check()) {
        return auth()
          ->user()
          ->getAbilities()
          ->pluck('name')
          ->all();
      }
      return [];
    });
  }
}
