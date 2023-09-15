import { Text } from "@mantine/core";
import { BiTask } from "react-icons/bi";
import Skeleton from "../components/Skeleton";
import Card from "../components/Card";
import { ITask } from "../types/ITask";

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
  const dummyList = new Array(12).fill(dummyTask);

  return (
    <>
      <div className="flex w-full flex-col space-y-5">
        <div className="flex space-x-5 items-center text-3xl">
          <BiTask className="text-gray-400" />
          <Text>Tasks</Text>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dummyList.map((d, i) => (
            <Card key={i} {...d} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
