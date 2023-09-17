import BaseModal, {
  dateFormat,
  segmentedData,
  selectSegementedColor,
} from "./BaseModal";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Chip,
  Popover,
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
import { IoMdTrash } from "react-icons/io";

type Props = {
  opened: boolean;
  close: () => void;
  task: ITask;
  loading: boolean;
  editTaskId: (values: ITaskRequest, _id: string, cb?: () => void) => void;
  deleteTaskId: (_id: string) => void;
};

function EditModal({
  opened,
  close,
  task: { _id, description, title, deadline, completed, priority },
  loading,
  editTaskId,
  deleteTaskId,
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
          <div className="flex items-center space-x-3">
            <Chip
              color="green"
              variant="filled"
              defaultChecked={completed}
              {...form.getInputProps("completed")}
            >
              Mark Completed
            </Chip>
            <Popover position="left">
              <Popover.Target>
                <ActionIcon>
                  <IoMdTrash size={20} color="orange" />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <div>
                  <Text>Are you sure you want to delete?</Text>
                  <Button
                    color="red"
                    onClick={() => {
                      deleteTaskId(_id);
                      close();
                    }}
                  >
                    Yes, I'm sure
                  </Button>
                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
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
          autosize
          minRows={5}
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
