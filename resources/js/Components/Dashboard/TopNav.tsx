import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from '@nextui-org/react';
import useTypedPage from '@/Hooks/useTypedPage';
import { Bell, MessageSquare } from 'lucide-react';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';

export const TopNav = () => {
  const page = useTypedPage();
  const route = useRoute();

  const logout = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(route('logout'));
  };

  return (
    <Navbar maxWidth="full" isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Highland-HQ</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <Button isIconOnly size="sm" variant="light">
            <MessageSquare />
          </Button>
        </NavbarItem>
        <NavbarItem isActive>
          <Button isIconOnly size="sm" variant="light">
            <Bell />
          </Button>
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={page.props.auth.user?.name[0]}
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              textValue={`Signed in as ${page.props.auth.user?.email}`}
              className="h-14 gap-2"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{page.props.auth.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="storefront" textValue="Storefront">
              <Link href={route('storefront.index')}>Storefront</Link>
            </DropdownItem>
            <DropdownItem key="settings" textValue="My Settings">
              <Link href={route('profile.show')}>My Profile</Link>
            </DropdownItem>
            <DropdownItem
              key="logout"
              textValue="Log Out"
              color="danger"
              onClick={logout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
