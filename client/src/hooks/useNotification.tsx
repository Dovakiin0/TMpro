import { notifications } from "@mantine/notifications";
import { MdCheckCircle, MdWarning, MdDangerous } from "react-icons/md";

type Props = {};

interface INotification {
  message: string;
  loading: boolean;
}

function useNotification({ }: Props) {
  const Success = ({ message, loading = false }: INotification) => {
    notifications.show({
      title: "Success",
      message: message,
      loading: loading,
      color: "green",
      icon: <MdCheckCircle />,
    });
  };

  const Warning = ({ message, loading = false }: INotification) => {
    notifications.show({
      title: "Warning",
      message: message,
      loading: loading,
      color: "green",
      icon: <MdWarning />,
    });
  };

  const Error = ({ message, loading = false }: INotification) => {
    notifications.show({
      title: "Error",
      message: message,
      loading: loading,
      color: "red",
      icon: <MdDangerous />,
    });
  };

  return { Success, Warning, Error };
}

export default useNotification;
