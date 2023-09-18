import React from "react";
import { MdNotifications } from "react-icons/md";
import { ActionIcon, Menu, Text, Indicator, ScrollArea } from "@mantine/core";
import NotificationItem from "../components/NotificationItem";
import useNotification from "../hooks/useNotification";

function Notification() {
  const { notifications, count, markNotificationAsRead } = useNotification();

  const handleClick;

  return (
    <Menu
      shadow="md"
      width={300}
      position="bottom-end"
      closeOnItemClick={false}
      withArrow={true}
      offset={{ mainAxis: 20 }}
    >
      <Menu.Target>
        <ActionIcon>
          <Indicator
            inline
            label={count}
            disabled={count === 0}
            color="red"
            size={16}
          >
            <MdNotifications size={25} />
          </Indicator>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown mah={450}>
        <Menu.Label>Notifications</Menu.Label>
        <ScrollArea h={400}>
          {notifications.length === 0 && (
            <div className="flex justify-center items-center h-[300px] w-full">
              <Text>No Notification</Text>
            </div>
          )}
          {notifications.map((notification, i) => (
            <Menu.Item key={i}>
              <NotificationItem
                id={notification._id}
                title={notification.task?.title}
                message={notification?.message}
                markNotificationAsRead={markNotificationAsRead}
                handleClick={handleClick}
              />
            </Menu.Item>
          ))}
        </ScrollArea>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Notification;
