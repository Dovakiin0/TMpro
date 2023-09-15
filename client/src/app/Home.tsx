import { Button, Tabs, Text, Drawer, Table } from "@mantine/core";
import { BiTask, BiListUl, BiPlus } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";

type Props = {};

const dummyTask = {
  title: "New Task",
  description: "New description",
  priority: "HIGH",
  deadline: "2023-09-25",
  completed: "false",
  user: "dovakiin0",
};

function Home({ }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const dummyList = new Array(5).fill(dummyTask);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        position="right"
        size="xl"
      >
        <Text size="xl" weight="bold">
          Create New Task
        </Text>
      </Drawer>
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between items-center text-3xl">
          <div className="flex items-center space-x-5">
            <BiTask className="text-gray-400" />
            <Text>Tasks</Text>
          </div>
          <div>
            <Button
              leftIcon={<BiPlus />}
              variant="filled"
              color="red"
              uppercase
              onClick={open}
            >
              New
            </Button>
          </div>
        </div>
        <div className="">
          <Tabs color="red" defaultValue="list">
            <Tabs.List>
              <Tabs.Tab value="list">
                <div className="flex items-center space-x-2 text-lg">
                  <BiListUl />
                  <Text>List</Text>
                </div>
              </Tabs.Tab>
              <Tabs.Tab value="board">
                <div className="flex items-center space-x-2 text-lg">
                  <MdOutlineSpaceDashboard />
                  <Text>Board</Text>
                </div>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="list" pt="xs" className="w-full">
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyList.map((d, i) => (
                    <tr key={i}>
                      <td>{d.title}</td>
                      <td>{d.description}</td>
                      <td>{d.priority}</td>
                      <td>{d.deadline}</td>
                      <td>{d.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="board" pt="xs">
              Board
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Home;
