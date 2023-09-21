import './bootstrap';
import '../css/app.css';

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { RouteContext } from '@/Hooks/useRoute';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { NextUIProvider } from '@nextui-org/react';

const appName = 'Highland';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  progress: {
    color: '#4B5563',
  },
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <RouteContext.Provider value={(window as any).route}>
        <NextUIProvider>
          <App {...props} />
        </NextUIProvider>
      </RouteContext.Provider>,
    );
  },
});
