import { Button, Text } from "@mantine/core";
import { BiTask } from "react-icons/bi";
import TaskCard from "../components/TaskCard";
import { ITask } from "../types/ITask";
import { AiOutlinePlus } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import AddModal from "../components/TaskModal/AddModal";

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
            <Button color="red" leftIcon={<AiOutlinePlus />} onClick={open}>
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
    </>
  );
}

export default Home;
