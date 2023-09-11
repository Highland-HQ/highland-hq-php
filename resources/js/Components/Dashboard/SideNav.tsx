import React from 'react';
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Menu,
} from '@nextui-org/react';
import {
  Home,
  Users,
  ShoppingBag,
  PieChart,
  MessageCircle,
  Settings,
  Package2,
  ListChecks,
  Group,
  User,
  Receipt,
  ShoppingCart,
  Building,
  BadgePercent,
  Store,
  AreaChart,
  LayoutDashboard,
} from 'lucide-react';

const employeeLinks = [
  {
    name: 'Dashboard',
    route: 'dashboard.index',
    icon: <LayoutDashboard />,
  },
  {
    name: 'Products',
    route: 'products.show',
    icon: <Package2 />,
  },
  {
    name: 'Collections',
    route: 'collections.show',
    icon: <Group />,
  },
  {
    name: 'Users',
    route: 'users.show',
    icon: <User />,
  },
  {
    name: 'Orders',
    route: 'orders.show',
    icon: <Receipt />,
  },
  {
    name: 'Carts',
    route: 'carts.show',
    icon: <ShoppingCart />,
  },
];

const adminLinks = [
  {
    name: 'Vendors',
    route: 'vendors.show',
    icon: <Store />,
  },
  {
    name: 'Analytics',
    route: 'analytics.show',
    icon: <AreaChart />,
  },
  {
    name: 'Discounts',
    route: 'discounts.show',
    icon: <BadgePercent />,
  },
];

export const SideNav = () => (
  <div className="h-screen w-60 fixed bg-background px-4 border-r border-r-divider">
    <Listbox color="secondary" variant="shadow">
      <ListboxSection title="General" showDivider>
        {employeeLinks.map(({ name, route, icon }) => (
          <ListboxItem key={name.toLowerCase()} startContent={icon}>
            {name}
          </ListboxItem>
        ))}
      </ListboxSection>
      <ListboxSection title="Administrator" showDivider>
        {adminLinks.map(({ name, route, icon }) => (
          <ListboxItem key={name.toLowerCase()} startContent={icon}>
            {name}
          </ListboxItem>
        ))}
      </ListboxSection>
    </Listbox>
  </div>
);
