#!/bin/bash

cd /var/www/highland-hq || exit

git pull origin trunk

composer install --optimize-autoloader --no-dev

php artisan migrate --force

npm i
npm run build

php artisan config:cache
php artisan event:cache
php artisan route:cache
php artisan view:cache

echo "Deployment completed successfully!"