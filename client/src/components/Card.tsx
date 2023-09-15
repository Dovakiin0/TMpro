import { Card as MantineCard, Text, Badge, Button, Group } from "@mantine/core";
import { ITask } from "../types/ITask";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";

export default function Card({
  title,
  description,
  priority,
  deadline,
  completed,
}: ITask) {
  const [editMode, setEditMode] = useState(false);
  const cardRef = useRef<any>(null);

  function handleClick(_: React.MouseEvent<HTMLDivElement>) {
    setEditMode(true);
  }

  useEffect(() => {
    // Function to handle clicks outside of the card
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setEditMode(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MantineCard
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={`hover:cursor-pointer ${editMode
          ? "relative z-10 transition-transform transform scale-110"
          : "relative"
        }`}
      onClick={handleClick}
      ref={cardRef}
      style={{
        width: editMode ? "200%%" : "100%", // Adjust as needed
        height: editMode ? "200%" : "auto", // Adjust as needed
      }}
    >
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <AiOutlineClockCircle />
            <Text>{deadline}</Text>
          </div>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500} size="xl">
              {title}
            </Text>
            <Badge color="pink" size="lg" variant="light">
              {priority}
            </Badge>
          </Group>

          <Text size="md" color="dimmed">
            {description}
          </Text>
        </div>

        <Button variant="light" color="red" fullWidth mt="md" radius="md">
          {completed ? "Delete" : "Mark as Completed"}
        </Button>
      </div>
    </MantineCard>
  );
}
