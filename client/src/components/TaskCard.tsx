import { Card, Text, Badge, Button, Group } from "@mantine/core";
import { ITask } from "../types/ITask";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineClockCircle } from "react-icons/ai";
import EditModal from "./TaskModal/EditModal";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { dateFormat, selectSegementedColor } from "./TaskModal/BaseModal";
import { ITaskRequest } from "../types/ITaskRequest";

interface ITaskCardProps extends ITask {
  toggleTaskCompleted: (_id: string, completed: boolean) => void;
  loading: boolean;
  editTaskId: (values: ITaskRequest, _id: string, cb?: () => void) => void;
}

export default function TaskCard({
  _id,
  title,
  description,
  priority,
  deadline,
  completed,
  user,
  toggleTaskCompleted,
  loading,
  editTaskId,
}: ITaskCardProps) {
  const [opened, { open, close }] = useDisclosure(false);

  let FormatedDeadline = dayjs(deadline, dateFormat).toString();

  function handleCompleteClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    toggleTaskCompleted(_id, !completed);
  }

  return (
    <>
      <EditModal
        opened={opened}
        close={close}
        task={{ _id, title, description, priority, deadline, completed, user }}
        loading={loading}
        editTaskId={editTaskId}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.05 } }}
        whileHover={{ scale: 1.05 }}
      >
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={`hover:cursor-pointer h-[300px]`}
          onClick={open}
          sx={{
            opacity: completed ? 0.5 : 1,
          }}
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <AiOutlineClockCircle />
                <Text strikethrough={completed}>{FormatedDeadline}</Text>
              </div>
              <Group position="apart" mt="md" mb="xs">
                <Text strikethrough={completed} weight={500} size="xl">
                  {title}
                </Text>
                <Badge
                  color={selectSegementedColor(priority)}
                  size="lg"
                  variant="light"
                >
                  {priority}
                </Badge>
              </Group>

              <Text strikethrough={completed} size="md" color="dimmed">
                {description}
              </Text>
            </div>

            <Button
              variant="light"
              color="red"
              fullWidth
              mt="md"
              radius="md"
              onClick={handleCompleteClick}
            >
              {completed ? "Mark as Incomplete" : "Mark as Completed"}
            </Button>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
