import { Text } from "@mantine/core";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

type Props = {
  title: string;
  message: string;
};

function NotificationItem({ title, message }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Text>
          Reminder: <span className="font-bold">{title}</span>
        </Text>
        <AiOutlineClockCircle />
      </div>
      <Text>{message}</Text>
    </div>
  );
}

export default NotificationItem;
