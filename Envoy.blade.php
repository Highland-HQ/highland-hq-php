@servers(['web' => 'root@107.172.79.23'])

@story('deploy')
    git_pull
    composer_install
    migrate
    npm_install
    build_assets
    generate_app_key
    optimize_laravel
    symlink
    reload_php
    reload_nginx
@endstory

@task('git_pull')
    cd /var/www/highland-hq
    git pull origin trunk
@endtask

@task('composer_install')
    cd /var/www/highland-hq
    composer install --optimize-autoloader --no-dev
@endtask

@task('migrate')
    cd /var/www/highland-hq
    php artisan migrate --force
@endtask

@task('npm_install')
    cd /var/www/highland-hq
    npm i
@endtask

@task('build_assets')
    cd /var/www/highland-hq
    npm run build
@endtask

@task('generate_app_key')
    cd /var/www/highland-hq
    php artisan key:generate
@endtask

@task('optimize_laravel')
    cd /var/www/highland-hq
    php artisan config:cache

    php artisan event:cache
    php artisan route:cache
    php artisan view:cache
@endtask

@task('symlink')
    ln -nfs /var/www/highland-hq/public /var/www/highland-hq/current
@endtask

@task('reload_php')
    sudo service php8.1-fpm reload
@endtask

@task('reload_nginx')
    sudo service nginx reload
@endtask