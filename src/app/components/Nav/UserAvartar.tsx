'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';
import React from 'react';

import { IUserInfo } from '@/app/api/AuthAPI/types';
import { LocalStorageManager } from '@/app/lib/LocalStorageManager';

interface IProps {
  userInfo: IUserInfo;
}

const UserAvartar: React.FC<IProps> = ({ userInfo }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          id={userInfo.email}
          name={userInfo.username}
          description={userInfo.email}
          avatarProps={{
            src: 'https://avatars.githubusercontent.com/u/30373425?v=4',
          }}
          style={{ cursor: 'pointer' }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  function handleLogout() {
    LocalStorageManager.removeJWT();
    window.location.reload();
  }
};

export default UserAvartar;
