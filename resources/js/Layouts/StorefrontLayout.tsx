import { router } from '@inertiajs/core';
import { Head } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';
import useRoute from '@/Hooks/useRoute';
import { Nav } from '@/Components/Storefront/Nav';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export const StorefrontLayout = ({
  title,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div>
      <Head title={title} />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Nav />
        <main>{children}</main>
      </div>
    </div>
  );
};
