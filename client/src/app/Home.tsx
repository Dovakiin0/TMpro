import { ActionIcon, Button, Text, Card, Chip, Group } from "@mantine/core";
import { BiTask } from "react-icons/bi";
import TaskCard from "../components/TaskCard";
import { AiOutlinePlus } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import AddModal from "../components/TaskModal/AddModal";
import { useRef, useState } from "react";
import useOnScreen from "../hooks/useOnScreen";
import { motion } from "framer-motion";
import useTask from "../hooks/useTask";
import { TbMoodEmpty } from "react-icons/tb";
import { ISort } from "../types/ITask";

function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const createButtonRef = useRef<HTMLButtonElement | null>(null);
  const isCreateButtonVisible = useOnScreen(createButtonRef);
  const [sort, setSort] = useState<ISort>("CREATED");
  const {
    tasks,
    toggleTaskCompleted,
    loading,
    createNewTask,
    editTaskId,
    deleteTaskId,
    sortTask,
  } = useTask();

  const onSortChanged = (sortValue: ISort) => {
    setSort(sortValue);
    sortTask(sortValue);
  };

  return (
    <>
      <AddModal
        opened={opened}
        close={close}
        loading={loading}
        createNewTask={createNewTask}
      />
      <div className="flex w-full flex-col space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3 text-3xl">
              <BiTask className="text-gray-400" />
              <Text>Tasks</Text>
            </div>
            <div className="flex space-x-3 items-center">
              <Text size="lg">Sort By:</Text>
              <Chip.Group
                value={sort}
                onChange={(val: ISort) => onSortChanged(val)}
              >
                <Group position="center">
                  <Chip value="CREATED" variant="filled" color="red">
                    Created At
                  </Chip>
                  <Chip value="HIGH" variant="filled" color="red">
                    High
                  </Chip>
                  <Chip value="MEDIUM" variant="filled" color="red">
                    Medium
                  </Chip>
                  <Chip value="LOW" variant="filled" color="red">
                    Low
                  </Chip>
                  <Chip value="PAST" variant="filled" color="red">
                    Past
                  </Chip>
                  <Chip value="TODAY" variant="filled" color="red">
                    Today
                  </Chip>
                  <Chip value="FUTURE" variant="filled" color="red">
                    Future
                  </Chip>
                </Group>
              </Chip.Group>
            </div>
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
          {tasks.length === 0 && (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className={`h-[300px]`}
              sx={{
                opacity: 0.7,
              }}
            >
              <div className="flex flex-col w-full h-full justify-center items-center">
                <TbMoodEmpty size={40} />
                <Text weight="bold">Such Empty</Text>
              </div>
            </Card>
          )}
          {tasks.map((task) => (
            <TaskCard
              {...task}
              key={task._id}
              toggleTaskCompleted={toggleTaskCompleted}
              loading={loading}
              editTaskId={editTaskId}
              deleteTaskId={deleteTaskId}
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
