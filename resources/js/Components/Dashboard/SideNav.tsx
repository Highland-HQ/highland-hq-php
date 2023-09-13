import React, { ReactNode, useEffect, useState } from 'react';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';
import {
  Package2,
  Group,
  User,
  Receipt,
  BadgePercent,
  Store,
  AreaChart,
  LayoutDashboard,
} from 'lucide-react';
import useTypedPage from '@/Hooks/useTypedPage';
import useRoute from '@/Hooks/useRoute';
import { Link } from '@inertiajs/react';

interface SideNavLink {
  name: string;
  path: string;
  icon: ReactNode;
}

const employeeLinks: SideNavLink[] = [
  {
    name: 'Dashboard',
    path: 'dashboard.index',
    icon: <LayoutDashboard />,
  },
  {
    name: 'Products',
    path: 'products.index',
    icon: <Package2 />,
  },
  {
    name: 'Collections',
    path: 'collections.index',
    icon: <Group />,
  },
  {
    name: 'Users',
    path: 'users.index',
    icon: <User />,
  },
  {
    name: 'Orders',
    path: 'orders.index',
    icon: <Receipt />,
  },
];

const adminLinks: SideNavLink[] = [
  {
    name: 'Vendors',
    path: 'vendors.index',
    icon: <Store />,
  },
  {
    name: 'Marketing',
    path: 'marketing.index',
    icon: <AreaChart />,
  },
  {
    name: 'Analytics',
    path: 'analytics.index',
    icon: <AreaChart />,
  },
  {
    name: 'Discounts',
    path: 'discounts.index',
    icon: <BadgePercent />,
  },
];

export const SideNav = () => {
  const page = useTypedPage();
  const route = useRoute();

  const [navSections, setNavSections] = useState<JSX.Element[]>([]);

  const generateListboxItems = (links: SideNavLink[]) => {
    return links.map(({ name, path, icon }: SideNavLink) => (
      <ListboxItem key={name.toLowerCase()} startContent={icon}>
        <Link className="w-full" href={route(path ? path : '/')}>
          <div className="w-full">{name}</div>
        </Link>
      </ListboxItem>
    ));
  };

  useEffect(() => {
    const newNavSections: JSX.Element[] = [
      <ListboxSection title="General" showDivider key="general-section">
        {generateListboxItems(employeeLinks)}
      </ListboxSection>,
    ];

    if (page.props.auth.abilities.includes('access-admin-dashboard')) {
      newNavSections.push(
        <ListboxSection title="Administrator" showDivider key="admin-section">
          {generateListboxItems(adminLinks)}
        </ListboxSection>,
      );
    }

    setNavSections(newNavSections);
  }, [page.props.auth.abilities]);

  return (
    <div className="h-screen w-60 fixed bg-background px-4 border-r border-r-divider">
      <Listbox color="secondary" variant="shadow">
        {navSections}
      </Listbox>
    </div>
  );
};
