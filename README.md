# Highland Ecommerce Platform

*Everything here could be wrong, if it doesn't work pls tell me.. I'll test it later this is just off the top of my head*

## Overview
This repository houses the ecommerce platform for Highland-HQ, a western clothing brand. The platform is a complete solution that includes an admin dashboard for site management and a user storefront for customer transactions.

## Features
Admin Dashboard: A backend interface for managing products, orders, and other site content.
Storefront: A customer-facing interface for product browsing and purchasing.

## 🚀 Up and Running
Clone the Repo:
`git clone (ssh url or http url whichever you would like :D)`

Copy the .env file and configure it (for postgres):
```
DB_CONNECTION=pgql
DB_PORT=5432
```

### 💾 The DB
Create a new postgres db like a chad:
https://www.postgresql.org/docs/current/sql-createdatabase.html

Make sure to set the DB_DATABASE .env variable to the db's name that you just created. (and username, and password)

### The Server
Install Server dependencies:
`composer install`

Migrate the db:
`php artisan migrate:refresh --seed`

Start Her Up:
`php artisan serve`

### The Client
Install dependencies:
`npm i`

Build her just in case:
`npm run build`

Now you're good to listen for changes:
`npm run dev`

### SSR with Inertia
SSR is based, so you need to also run the node based inertia server:
`php artisan inertia:start-ssr`

I think that's all, now you can start contributing 😎

## Docs
- [Laravel Docs](https://laravel.com/docs/10.x/readme)
- [React Docs](https://react.dev/)
- [Jetstream Docs](https://jetstream.laravel.com/introduction.html)
- [Inertia Docs](https://inertiajs.com/)
- [Tailwind Docs](https://tailwindcss.com/docs/installation)
- [NextUI Docs](https://nextui.org/docs/guide/introduction)

*There must be more that I'm forgetting*
