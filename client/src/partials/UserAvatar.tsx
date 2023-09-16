import { Avatar, Menu } from "@mantine/core";
import { MdSettings, MdPowerSettingsNew } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {};

function UserAvatar({ }: Props) {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Menu position="bottom-end" withArrow shadow="md" width={200}>
        <Menu.Target>
          <Avatar
            src="https://avatars.githubusercontent.com/u/50291191?v=4"
            radius="xl"
            className="hover:cursor-pointer"
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Logged in as: Dovakiin0</Menu.Label>
          <Menu.Item icon={<MdSettings size={14} />}>Settings</Menu.Item>
          <Menu.Item
            color="red"
            icon={<MdPowerSettingsNew size={14} />}
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default UserAvatar;
