import React from "react";
import { useForm } from "@mantine/form";
import { Card } from "@mantine/core";

type Props = {};

function AddTaskCard({ }: Props) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={`hover:cursor-pointer h-[300px] `}
    >
      Add Task
    </Card>
  );
}

export default AddTaskCard;
