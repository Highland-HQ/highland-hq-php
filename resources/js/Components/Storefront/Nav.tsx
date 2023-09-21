import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextLink,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import {
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User,
  UserPlus,
} from 'lucide-react';
import useTypedPage from '@/Hooks/useTypedPage';
import { DropdownItemType } from '@/types';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';

const navItems = [
  'Home',
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { auth } = page?.props;

  useEffect(() => {
    const newDropdownItems: DropdownItemType[] = auth?.user
      ? [
          { name: 'Profile', path: 'profile.show', icon: <User size={18} /> },
          { name: 'Wishlist', path: 'profile.show', icon: <Heart size={18} /> },
          {
            name: 'Logout',
            path: 'logout',
            color: 'danger',
            onClick: logout,
            icon: <LogOut size={18} />,
          },
        ]
      : [
          { name: 'Login', path: 'login', icon: <LogIn size={18} /> },
          { name: 'Register', path: 'register', icon: <UserPlus size={18} /> },
        ];

    if (
      auth.abilities &&
      auth.abilities.includes('access-dashboard') &&
      !newDropdownItems.some(item => item.name === 'Dashboard')
    ) {
      newDropdownItems.splice(2, 0, {
        name: 'Dashboard',
        color: 'primary',
        path: 'dashboard.index',
        icon: <LayoutDashboard size={18} />,
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
      <DropdownItem
        key="heading"
        className="h-14 gap-2"
        textValue={`Signed in as ${auth?.user?.email}`}
      >
        <p className="font-semibold">Signed in as</p>
        <p className="font-semibold">{auth?.user?.email}</p>
      </DropdownItem>
    );

    dropdownContent = [
      userAuthItem,
      ...dropdownItems?.map(({ name, path, color, onClick, icon }) => (
        <DropdownItem
          key={name?.toLowerCase()}
          textValue={name}
          startContent={icon}
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
    dropdownContent = dropdownItems?.map(
      ({ name, path, color, onClick, icon }) => (
        <DropdownItem
          key={name?.toLowerCase()}
          textValue={name}
          startContent={icon}
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
      ),
    );
  }

  return (
    <Navbar
      isBordered
      classNames={{ wrapper: 'flex-col h-auto py-4' }}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="w-full">
        <div className="flex-1 flex items-center justify-start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
            icon={<Menu />}
          />
          <Button isIconOnly variant="light" size="sm">
            <Search />
          </Button>
        </div>
        <NavbarBrand className="flex items-center justify-center flex-1">
          <Link href={route('storefront.index')}>
            <img src={page.props.assets[0]} className="h-6" />
          </Link>
        </NavbarBrand>
        <div className="flex-1 flex items-center justify-end">
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

      <NavbarContent justify="start" className="hidden sm:flex">
        {navItems.map(item => (
          <NavbarItem key={item.toLowerCase()}>
            <NextLink color="foreground" href="#">
              {item}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {navItems.map(item => (
          <NavbarMenuItem key={item.toLowerCase()}>
            <NextLink color="foreground" href="#">
              {item}
            </NextLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem></NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
