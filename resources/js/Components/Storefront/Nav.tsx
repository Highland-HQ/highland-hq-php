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
  Button,
} from '@nextui-org/react';
import { Heart, Search, ShoppingBag, User } from 'lucide-react';
import useTypedPage from '@/Hooks/useTypedPage';
import { DropdownItemType } from '@/types';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';

const navItems = [
  'Womens',
  'Mens',
  'Collections',
  'Accessories',
  'Sale',
  'New',
];

export const Nav = () => {
  const route = useRoute();
  const page = useTypedPage();

  const [dropdownItems, setDropdownItems] = useState<DropdownItemType[]>([]);

  const { auth } = page?.props;

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

    if (
      auth.abilities &&
      auth.abilities.includes('access-dashboard') &&
      !newDropdownItems.some(item => item.name === 'Dashboard')
    ) {
      newDropdownItems.splice(1, 0, {
        name: 'Dashboard',
        path: 'dashboard.index',
      });
    }

    setDropdownItems(newDropdownItems);
  }, [auth]);

  const logout = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(route('logout'));
  };

  let dropdownContent;

  if (auth?.user) {
    const userAuthItem = (
      <DropdownItem key="heading" className="h-14 gap-2">
        <p className="font-semibold">Signed in as</p>
        <p className="font-semibold">{auth?.user?.email}</p>
      </DropdownItem>
    );

    dropdownContent = [
      userAuthItem,
      ...dropdownItems?.map(({ name, path, color, onClick }) => (
        <DropdownItem
          key={name?.toLowerCase()}
          color={color as 'default' | 'danger'}
        >
          <Link
            onClick={onClick}
            className="w-full"
            href={route(path ? path : '/')}
          >
            <div className="w-full">{name}</div>
          </Link>
        </DropdownItem>
      )),
    ];
  } else {
    dropdownContent = dropdownItems?.map(({ name, path, color, onClick }) => (
      <DropdownItem
        key={name?.toLowerCase()}
        color={color as 'default' | 'danger'}
      >
        <Link
          onClick={onClick}
          className="w-full"
          href={route(path ? path : '/')}
        >
          <div className="w-full">{name}</div>
        </Link>
      </DropdownItem>
    ));
  }

  return (
    <Navbar
      classNames={{ wrapper: 'flex-col h-auto py-4' }}
      maxWidth="xl"
      isBordered
    >
      <NavbarContent className="w-full">
        <div className="flex-1">
          <Input
            classNames={{
              base: 'max-w-full sm:max-w-[15rem] h-10',
              mainWrapper: 'h-full',
              input: 'text-small border-0',
              inputWrapper: 'h-full font-normal dark:bg-default-500/20',
            }}
            placeholder="Type to search..."
            size="sm"
            variant="flat"
            startContent={<Search />}
            type="search"
          />
        </div>
        <NavbarBrand className="flex items-center justify-center flex-1">
          <img src={page.props.assets[0]} className="h-8" />
        </NavbarBrand>
        <div className="flex-1 flex items-center justify-end">
          <Button isIconOnly variant="light" size="sm">
            <Heart />
          </Button>
          <Button isIconOnly variant="light" size="sm">
            <ShoppingBag />
          </Button>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light" size="sm">
                <User />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              {dropdownItems && dropdownContent}
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>

      <NavbarContent justify="start">
        {navItems.map(item => (
          <NavbarItem key={item.toLowerCase()}>
            <NextLink color="foreground" href="#">
              {item}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
};
