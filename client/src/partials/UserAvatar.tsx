import { Avatar, Menu } from "@mantine/core";
import { MdSettings, MdPowerSettingsNew } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useAppSelector } from "../hooks/useReducer";

type Props = {};

function UserAvatar({}: Props) {
  const { logoutUser } = useAuth();
  const { current } = useAppSelector((state) => state.auth);

  return (
    <>
      <Menu position="bottom-end" withArrow shadow="md" width={200}>
        <Menu.Target>
          <Avatar radius="xl" className="hover:cursor-pointer">
            {current?.username?.[0].toUpperCase()}
          </Avatar>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Logged in as: {current?.username}</Menu.Label>
          <Menu.Item icon={<MdSettings size={14} />}>Settings</Menu.Item>
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
