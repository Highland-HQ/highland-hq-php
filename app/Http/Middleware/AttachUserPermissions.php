<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AttachUserPermissions
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    Inertia::share([
      'auth.abilities' => function () {
        return auth()->check()
          ? auth()
            ->user()
            ->getAbilities()
            ->pluck('name')
            ->all()
          : [];
      },
    ]);

    return $next($request);
  }
}
