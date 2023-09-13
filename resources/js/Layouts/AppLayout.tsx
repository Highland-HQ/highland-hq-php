import { router } from '@inertiajs/core';
import { Link, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Team } from '@/types';
import { SideNav } from '@/Components/Dashboard/SideNav';
import { TopNav } from '@/Components/Dashboard/TopNav';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <div>
      <Head title={title} />

      <Banner />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <TopNav />

        <SideNav />

        <div className="max-w-7xl mx-auto mt-12">
          {/* <!-- Page Content --> */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
