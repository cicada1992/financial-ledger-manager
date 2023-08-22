'use client';

import {
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

import { useUserStore } from '@/app/store/userStore';

import { MENU_ITEMS } from './constants';
import SignUpButton from './SignUpButton';
import UserAvartar from './UserAvartar';
import logo from '../../assets/logo.png';

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPathName = usePathname();
  const userInfo = useUserStore((state) => state.userInfo);
  const hasUserInfo = Boolean(userInfo.email && userInfo.username);

  return (
    <Navbar onMenuOpenChange={(value) => setIsMenuOpen(Boolean(value))} className="bg-white">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={logo} alt="Logo" width={80} height={20} priority />
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
        <NavbarItem>
          {hasUserInfo ? <UserAvartar userInfo={userInfo} /> : <SignUpButton />}
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
