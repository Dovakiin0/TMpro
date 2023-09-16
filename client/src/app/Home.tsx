import { ActionIcon, Button, Text } from "@mantine/core";
import { BiTask } from "react-icons/bi";
import TaskCard from "../components/TaskCard";
import { ITask } from "../types/ITask";
import { AiOutlinePlus } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import AddModal from "../components/TaskModal/AddModal";
import { useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";
import { motion } from "framer-motion";

type Props = {};

const dummyTask: ITask = {
  _id: "101",
  title: "New Task",
  description: "New description",
  priority: "HIGH",
  deadline: "2023-09-25",
  completed: false,
  user: "dovakiin0",
};

function Home({ }: Props) {
  const dummyList: ITask[] = new Array(8)
    .fill(dummyTask)
    .map((d, i) => ({ ...d, _id: d._id + i }));

  const [opened, { open, close }] = useDisclosure(false);
  const createButtonRef = useRef<HTMLButtonElement | null>(null);
  const isCreateButtonVisible = useOnScreen(createButtonRef);

  return (
    <>
      <AddModal opened={opened} close={close} />
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
          {dummyList.map((d, i) => (
            <TaskCard key={i} {...d} />
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
