import { notifications } from "@mantine/notifications";
import { MdCheckCircle, MdWarning, MdDangerous } from "react-icons/md";

interface INotification {
  message: string;
  loading?: boolean;
}

// custom hook that wraps around default notification from mantine
function useNotification() {
  const Success = ({ message, loading = false }: INotification) => {
    notifications.show({
      title: "Success",
      autoClose: 5000,
      message: message,
      loading: loading,
      color: "green",
      icon: <MdCheckCircle />,
    });
  };

  const Warning = ({ message, loading = false }: INotification) => {
    notifications.show({
      title: "Warning",
      autoClose: 5000,
      message: message,
      loading: loading,
      color: "green",
      icon: <MdWarning />,
    });
  };

  const Error = ({ message, loading = false }: INotification) => {
    notifications.show({
      title: "Error",
      autoClose: 5000,
      message: message,
      loading: loading,
      color: "red",
      icon: <MdDangerous />,
    });
  };

  return { Success, Warning, Error };
}
export default useNotification;
