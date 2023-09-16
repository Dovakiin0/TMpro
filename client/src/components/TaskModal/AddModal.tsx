import BaseModal, {
  dateFormat,
  segmentedData,
  selectSegementedColor,
} from "./BaseModal";
import { useEffect, useState } from "react";
import {
  Button,
  SegmentedControl,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ITaskCreateRequest } from "../../types/ITaskRequest";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";

type Props = {
  opened: boolean;
  close: () => void;
  createNewTask: (values: ITaskCreateRequest, cb?: () => void) => void;
  loading: boolean;
};
function AddModal({ opened, close, createNewTask, loading }: Props) {
  const [segmentColor, setSegmentColor] = useState<string | null>();

  const form = useForm<ITaskCreateRequest>({
    initialValues: {
      title: "",
      description: "",
      priority: "LOW",
      deadline: dayjs().toDate(),
    },
  });

  useEffect(() => {
    if (!form) return;
    setSegmentColor(selectSegementedColor(form.values.priority));
  }, [form.values]);

  function handleSubmit(values: ITaskCreateRequest) {
    createNewTask(values, () => close());
  }

  return (
    <BaseModal opened={opened} close={close} closeCb={() => form.reset()}>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        className="flex flex-col space-y-3"
      >
        <div className="flex justify-between items-center">
          <Text size="xl">Create Task</Text>
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
          color={segmentColor!}
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

export default AddModal;
