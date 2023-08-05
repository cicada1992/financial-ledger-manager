'use client';

import Image from 'next/image';
import React from 'react';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link as LinkUI,
} from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';
import { MENU_ITEMS } from './constants';
import Link from 'next/link';

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const currentPathName = usePathname();

  return (
    <Navbar
      onMenuOpenChange={(value) => {
        console.log(value);
        setIsMenuOpen(Boolean(value));
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src="/next.svg" alt="Vercel Logo" width={100} height={24} priority />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {MENU_ITEMS.map((item) => (
          <NavbarItem key={item.path} isActive={getIsActive(item.path)}>
            <Link href={item.path} color="foreground">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {MENU_ITEMS.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <LinkUI
              color={
                index === 2 ? 'primary' : index === MENU_ITEMS.length - 1 ? 'danger' : 'foreground'
              }
              className="w-full"
              href={item.path}
            >
              {item.label}
            </LinkUI>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );

  /**
   * @param path '/{path}'
   */
  function getIsActive(path: string) {
    const [, currentPath] = currentPathName.split('/');
    const [, targetPath] = path.split('/');
    return currentPath === targetPath;
  }
};

export default Nav;
