import BaseModal, {
  dateFormat,
  segmentedData,
  selectSegementedColor,
} from "./BaseModal";
import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  SegmentedControl,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { ITask } from "../../types/ITask";
import { useForm } from "@mantine/form";
import { ITaskRequest } from "../../types/ITaskRequest";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";

type Props = {
  opened: boolean;
  close: () => void;
  task: ITask;
  loading: boolean;
  editTaskId: (values: ITaskRequest, _id: string, cb?: () => void) => void;
};

function EditModal({
  opened,
  close,
  task: { _id, description, title, deadline, completed, priority },
  loading,
  editTaskId,
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
      deadline: dayjs(deadline, dateFormat).toDate(),
    },
  });

  useEffect(() => {
    if (!form) return;
    setSegmentColor(selectSegementedColor(form.values.priority));
  }, [form.values]);

  function handleSubmit(values: ITaskRequest) {
    console.log(values);
    editTaskId(values, _id, () => {
      close();
    });
  }

  return (
    <BaseModal opened={opened} close={close} closeCb={() => form.reset()}>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        className="flex flex-col space-y-3"
      >
        <div className="flex justify-between items-center">
          <Text size="xl">Task</Text>
          <Chip
            color="green"
            variant="filled"
            {...form.getInputProps("completed")}
          >
            Mark Completed
          </Chip>
        </div>
        <TextInput
          withAsterisk
          label="Title"
          required
          {...form.getInputProps("title")}
        />
        <Textarea
          withAsterisk
          label="Description"
          required
          {...form.getInputProps("description")}
        />
        <SegmentedControl
          data={segmentedData}
          color={segmentColor}
          {...form.getInputProps("priority")}
        />
        <DateTimePicker
          valueFormat={dateFormat}
          label="Deadline"
          withAsterisk
          required
          {...form.getInputProps("deadline")}
        />
        <Button type="submit" variant="outline" color="red" loading={loading}>
          Save
        </Button>
      </form>
    </BaseModal>
  );
}

export default EditModal;
