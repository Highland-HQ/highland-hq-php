import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from '@nextui-org/react';
import useTypedPage from '@/Hooks/useTypedPage';
import { Bell, BellDot, MessageSquare } from 'lucide-react';

export const TopNav = () => {
  const page = useTypedPage();

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
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{page.props.auth.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
