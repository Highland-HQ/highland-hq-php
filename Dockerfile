# Use PHP 8.1 as the base image
FROM php:8.1-fpm

# Install required extensions and dependencies
RUN apt-get update \
    && apt-get install -y \
        libzip-dev \
        libpq-dev \
        zip \
        unzip \
    && docker-php-ext-install \
        zip \
        pdo_pgsql \
        bcmath

# Set the working directory
WORKDIR /var/www/html

# Copy the project files to the working directory
COPY . .

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --no-scripts --optimize-autoloader

RUN composer install

# Set the ownership and permissions for Laravel files
RUN chown -R www-data:www-data \
        /var/www/html/storage \
        /var/www/html/bootstrap/cache

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]