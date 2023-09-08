<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Silber\Bouncer\BouncerFacade as Bouncer;

class RolesAndPermissionsSeeder extends Seeder
{
  public function run()
  {
    $roles = ['Customer', 'Employee', 'Manager', 'Administrator'];

    $models = [
      'Products',
      'Vendors',
      'Categories',
      'Users',
      'Collections',
      'Tags',
      'Carts',
      'Orders',
    ];

    $abilities = ['Create', 'Edit', 'Delete'];

    $additionalAbilities = ['access-dashboard', 'access-admin-dashboard'];

    foreach ($roles as $role) {
      Bouncer::role()->firstOrCreate([
        'name' => $role,
        'title' => $role,
      ]);

      foreach ($models as $model) {
        foreach ($abilities as $ability) {
          if ($role === 'Employee' && $ability === 'Delete') {
            continue;
          }

          if ($role === 'Customer') {
            continue;
          }

          Bouncer::allow($role)->to(
            strtolower($ability) . '-' . strtolower($model)
          );
        }
      }

      foreach ($additionalAbilities as $addAbility) {
        if ($role === 'Manager' && $addAbility === 'access-admin-dashboard') {
          continue;
        }

        if ($role === 'Customer' || $role === 'Employee') {
          continue;
        }

        Bouncer::allow($role)->to($addAbility);
      }
    }
  }
}
