import { Avatar, Menu } from "@mantine/core";
import { MdSettings, MdPowerSettingsNew } from "react-icons/md";
import useAuth from "../hooks/useAuth";

type Props = {};

function UserAvatar({ }: Props) {
  const { logoutUser, current } = useAuth();

  return (
    <>
      <Menu position="bottom-end" withArrow shadow="md" width={200}>
        <Menu.Target>
          <Avatar
            radius="xl"
            size="md"
            color="red"
            className="hover:cursor-pointer"
          >
            {current !== null && current?.username?.[0].toUpperCase()}
          </Avatar>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Logged in as: {current?.username}</Menu.Label>
          <Menu.Item
            color="red"
            icon={<MdPowerSettingsNew size={14} />}
            onClick={logoutUser}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default UserAvatar;
