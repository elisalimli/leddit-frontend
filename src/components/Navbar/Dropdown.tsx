import React, { Fragment } from "react";
import { useLogoutMutation } from "../../generated/graphql";
import UserIcon from "../icons/UserIcon";
import MyIcon from "../Other/MyIcon";
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

interface Props {
  user: { id: number; username: string };
}

const Dropdown = ({ user }: Props) => {
  const router = useRouter();
  const [{}, logout] = useLogoutMutation();

  const onUserLogout = async () => {
    await logout();
    router.reload();
  };

  return (
    <Menu>
      {({ isOpen }) => (
        <Fragment>
          <span className="mr-4">
            <MenuButton>
              <span>
                <MyIcon activeBackground="transparent" toolTipText="Profile">
                  <UserIcon />
                </MyIcon>
              </span>
            </MenuButton>
          </span>
          <MenuList>
            <p className="text-gray-1000 dark:text-gray-100 text-sm text-center">
              Logged in as <span className="font-bold">{user.username}</span>
            </p>
            <MenuDivider />

            <MenuItem
              justifyContent="center"
              className="text-center"
              onClick={onUserLogout}
            >
              logout
            </MenuItem>
          </MenuList>
        </Fragment>
      )}
    </Menu>
  );
};

export default Dropdown;
