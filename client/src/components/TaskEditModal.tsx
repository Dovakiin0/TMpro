import { useEffect, useState } from "react";
import {
  Button,
  Center,
  Modal,
  SegmentedControl,
  SegmentedControlItem,
  Text,
  TextInput,
  Textarea,
  Box,
} from "@mantine/core";
import { IoMdWarning } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ITask } from "../types/ITask";
import { useForm } from "@mantine/form";
import { ITaskRequest } from "../types/ITaskRequest";

type Props = {
  opened: boolean;
  close: () => void;
  task: ITask;
};

const segmentedData: SegmentedControlItem[] = [
  {
    value: "HIGH",
    label: (
      <Center className="gap-2">
        <IoMdWarning size={18} />
        <Text size="md">HIGH</Text>
      </Center>
    ),
  },
  {
    value: "MEDIUM",
    label: (
      <Center className="gap-2">
        <AiOutlineExclamationCircle size={18} />
        <Text size="md">MEDIUM</Text>
      </Center>
    ),
  },
  {
    value: "LOW",
    label: (
      <Center className="gap-2">
        <IoMdWarning size={18} />
        <Text size="md">LOW</Text>
      </Center>
    ),
  },
];

export default function TaskEditModal({
  opened,
  close,
  task: { _id, description, title, deadline, completed, priority, user },
}: Props) {
  const [segmentColor, setSegmentColor] = useState(
    selectSegementedColor(priority),
  );

  const form = useForm<ITaskRequest>({
    initialValues: {
      title,
      description,
      completed,
      priority,
      deadline,
    },
  });

  function selectSegementedColor(value: string) {
    switch (value) {
      case "LOW":
        return "teal";
      case "MEDIUM":
        return "yellow";
      case "HIGH":
        return "red";
    }
  }

  useEffect(() => {
    if (!form) return;
    setSegmentColor(selectSegementedColor(form.values.priority));
  }, [form.values]);

  function handleSubmit(values: typeof form.values) {
    console.log(values.title);
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Task" centered>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="flex flex-col space-y-3"
        >
          <TextInput
            withAsterisk
            label="Title"
            {...form.getInputProps("title")}
          />
          <Textarea
            withAsterisk
            label="Description"
            {...form.getInputProps("description")}
          />
          <SegmentedControl
            data={segmentedData}
            color={segmentColor}
            {...form.getInputProps("priority")}
          />
          <Button type="submit">Save</Button>
        </form>
      </Modal>
    </>
  );
}
