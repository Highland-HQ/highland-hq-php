# Stage 1: Build dependencies
FROM composer:2 as composer

WORKDIR /app

COPY . /app/

RUN composer install --no-dev --optimize-autoloader

# Stage 2: Production image
FROM php:8.1-fpm

# Remove unnecessary dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

# Enable PHP production settings
COPY php.ini /usr/local/etc/php/php.ini

# Set working directory
WORKDIR /var/www/html

# Copy application files and Composer dependencies from the build stage
COPY --from=composer /app/vendor /var/www/html/vendor
COPY artisan /var/www/html/artisan
COPY . /var/www/html

# Change ownership for storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 9000 and start php-fpm server
EXPOSE 9000

CMD ["php-fpm"]