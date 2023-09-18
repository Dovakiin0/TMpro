import { ActionIcon, Button, Text } from "@mantine/core";
import React from "react";
import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";

type Props = {
  id: string;
  title: string;
  message: string;
  markNotificationAsRead: (_id: string) => void;
};

function NotificationItem({
  id,
  title,
  message,
  markNotificationAsRead,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Text>
          Reminder: <span className="font-bold">{title}</span>
        </Text>
        <AiOutlineClockCircle />
      </div>
      <Text>{message}</Text>
      <Button
        variant="subtle"
        color="red"
        leftIcon={<AiOutlineEye />}
        onClick={() => markNotificationAsRead(id)}
      >
        Mark as Seen
      </Button>
    </div>
  );
}

export default NotificationItem;
