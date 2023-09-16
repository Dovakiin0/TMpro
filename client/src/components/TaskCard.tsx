import { Card, Text, Badge, Button, Group } from "@mantine/core";
import { ITask } from "../types/ITask";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineClockCircle } from "react-icons/ai";
import EditModal from "./TaskModal/EditModal";
import { motion } from "framer-motion";

export default function TaskCard({
  _id,
  title,
  description,
  priority,
  deadline,
  completed,
  user,
}: ITask) {
  const [opened, { open, close }] = useDisclosure(false);

  function handleCompleteClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
  }

  return (
    <>
      <EditModal
        opened={opened}
        close={close}
        task={{ _id, title, description, priority, deadline, completed, user }}
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
          className={`hover:cursor-pointer h-[300px] `}
          onClick={open}
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <AiOutlineClockCircle />
                <Text>{deadline}</Text>
              </div>
              <Group position="apart" mt="md" mb="xs">
                <Text weight={500} size="xl">
                  {title}
                </Text>
                <Badge color="pink" size="lg" variant="light">
                  {priority}
                </Badge>
              </Group>

              <Text size="md" color="dimmed">
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
              {completed ? "Delete" : "Mark as Completed"}
            </Button>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
