import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextLink,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';
import { Search, User } from 'lucide-react';
import useTypedPage from '@/Hooks/useTypedPage';
import { DropdownItemType } from '@/types';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';

const navItems = ['Womens', 'Mens', 'Collections', 'Accessories'];

export const Nav = () => {
  const route = useRoute();
  const page = useTypedPage();

  const [dropdownItems, setDropdownItems] = useState<DropdownItemType[]>([]);

  const { auth } = page?.props;

  const logout = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(route('logout'));
  };

  useEffect(() => {
    const newDropdownItems: DropdownItemType[] = auth?.user
      ? [
          { name: 'Profile', path: 'profile.show' },
          { name: 'Logout', path: 'logout', color: 'danger', onClick: logout },
        ]
      : [
          { name: 'Login', path: 'login' },
          { name: 'Register', path: 'register' },
        ];

    // if (
    //   auth?.user?.permissions &&
    //   auth?.user?.permissions.includes('access-dashboard') &&
    //   !newDropdownItems.some(item => item.name === 'Dashboard')
    // ) {
    //   newDropdownItems.push({ name: 'Dashboard', path: 'dashboard' });
    // }

    setDropdownItems(newDropdownItems);
  }, []);

  useEffect(() => {
    console.log(auth?.user?.permissions);
  }, []);

  return (
    <Navbar maxWidth="xl" isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">Highland</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          {navItems.map(item => (
            <NavbarItem key={item.toLowerCase()}>
              <NextLink color="foreground" href="#">
                {item}
              </NextLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[15rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small border-0',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<Search />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              radius="sm"
              as="button"
              className="transition-transform"
              color="default"
              name={auth?.user?.name[0]}
              size="sm"
              icon={<User className="text-gray-500 dark:text-gray-300" />}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {dropdownItems &&
              dropdownItems.map(({ name, path, color, onClick }) => (
                <DropdownItem key={name?.toLowerCase()}>
                  <Link
                    onClick={onClick}
                    className="w-full"
                    href={route(path ? path : '/')}
                  >
                    <div className="w-full">{name}</div>
                  </Link>
                </DropdownItem>
              ))}
            {/* <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{auth?.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem> */}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
