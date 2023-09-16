import { ActionIcon, Button, Text } from "@mantine/core";
import { BiTask } from "react-icons/bi";
import TaskCard from "../components/TaskCard";
import { AiOutlinePlus } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import AddModal from "../components/TaskModal/AddModal";
import { useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";
import { motion } from "framer-motion";
import useTask from "../hooks/useTask";

type Props = {};

function Home({ }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const createButtonRef = useRef<HTMLButtonElement | null>(null);
  const isCreateButtonVisible = useOnScreen(createButtonRef);
  const { tasks, toggleTaskCompleted, loading, createNewTask, editTaskId } =
    useTask();

  return (
    <>
      <AddModal
        opened={opened}
        close={close}
        loading={loading}
        createNewTask={createNewTask}
      />
      <div className="flex w-full flex-col space-y-5">
        <div className="flex items-center justify-between text-3xl">
          <div className="flex items-center space-x-3">
            <BiTask className="text-gray-400" />
            <Text>Tasks</Text>
          </div>
          <div>
            <Button
              ref={createButtonRef}
              color="red"
              leftIcon={<AiOutlinePlus />}
              onClick={open}
            >
              Create New
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {tasks.map((task) => (
            <TaskCard
              {...task}
              key={task._id}
              toggleTaskCompleted={toggleTaskCompleted}
              loading={loading}
              editTaskId={editTaskId}
            />
          ))}
        </div>
      </div>
      {!isCreateButtonVisible && (
        <motion.div className="fixed bottom-5 right-5">
          <ActionIcon
            color="red"
            variant="filled"
            radius="xl"
            size="xl"
            onClick={open}
          >
            <AiOutlinePlus size={30} />
          </ActionIcon>
        </motion.div>
      )}
    </>
  );
}

export default Home;
