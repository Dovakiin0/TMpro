import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useReducer";
import { client } from "../config/client";
import {
  setNotification,
  markAsRead,
  newNotification,
} from "../store/reducer/notificationSlice";
import useToast from "./useToast";
import notificationSound from "../../assets/notification.ogg";
import { INotification } from "../types/INotification";

function useNotification() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { notifications, count } = useAppSelector(
    (state) => state.notification,
  );
  const dispatch = useAppDispatch();
  const { Error } = useToast();
  const { current } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Subscribe to event source
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASE_URI}/notification`,
      {
        withCredentials: true, // send cookies
      },
    );

    // on message from the SSE
    eventSource.onmessage = (event) => {
      const notification: INotification = JSON.parse(event.data);
      if (!current || notification.userId !== current._id) return;
      const audio = new Audio(notificationSound);
      audio.play();
      dispatch(newNotification(notification));
    };

    eventSource.onerror = (error) => {
      console.log(error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (count > 0) {
      document.title = `(${count})TMpro - Task Master Pro`;
    } else {
      document.title = "TMpro - Task Master Pro";
    }

    // Reset the title when the component unmounts
    return () => {
      document.title = "TMpro - Task Master Pro";
    };
  }, [count]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await client.get("/notification/all");
      if (response.status === 200) {
        dispatch(setNotification(response.data));
      }
    } catch (err: any) {
      Error({
        message: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const markNotificationAsRead = async (_id: string) => {
    try {
      setLoading(true);
      const response = await client.post(`/notification/${_id}`, {});
      if (response.status === 200) {
        dispatch(markAsRead(_id));
      }
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    notifications,
    errors,
    fetchNotifications,
    markNotificationAsRead,
    count,
  };
}

export default useNotification;
