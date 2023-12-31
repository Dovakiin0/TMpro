import { Header as MantineHeader, Image } from "@mantine/core";
import UserAvatar from "./UserAvatar";
import Notification from "./Notification";

type Props = {};

function Header({ }: Props) {
  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <div className="h-full ml-5 mr-5 flex justify-between items-center">
        <div className="w-28">
          <Image src="/full.png" />
        </div>
        <div className="flex items-center space-x-5">
          <Notification />
          <UserAvatar />
        </div>
      </div>
    </MantineHeader>
  );
}

export default Header;
