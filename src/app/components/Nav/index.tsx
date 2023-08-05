'use client';

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
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { MENU_ITEMS } from './constants';

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPathName = usePathname();

  return (
    <Navbar onMenuOpenChange={(value) => setIsMenuOpen(Boolean(value))}>
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
              color={getIsActive(item.path) ? 'primary' : 'foreground'}
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
