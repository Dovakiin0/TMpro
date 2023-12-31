import { Modal, Text, SegmentedControlItem, Center } from "@mantine/core";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";

type Props = {
  opened: boolean;
  close: () => void;
  children: React.ReactNode;
  closeCb?: () => void;
};

export const dateFormat: string = "DD MMM YYYY hh:mm A";

export const segmentedData: SegmentedControlItem[] = [
  {
    value: "HIGH",
    label: (
      <Center className="gap-2">
        <FcHighPriority size={18} />
        <Text size="md">HIGH</Text>
      </Center>
    ),
  },
  {
    value: "MEDIUM",
    label: (
      <Center className="gap-2">
        <FcMediumPriority size={18} />
        <Text size="md">MEDIUM</Text>
      </Center>
    ),
  },
  {
    value: "LOW",
    label: (
      <Center className="gap-2">
        <FcLowPriority size={18} />
        <Text size="md">LOW</Text>
      </Center>
    ),
  },
];

export function selectSegementedColor(value: string) {
  switch (value) {
    case "LOW":
      return "teal";
    case "MEDIUM":
      return "yellow";
    case "HIGH":
      return "red";
  }
}

function BaseModal({ opened, close, children, closeCb }: Props) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          closeCb?.();
        }}
        withCloseButton={false}
        centered
        size="lg"
      >
        {children}
      </Modal>
    </>
  );
}

export default BaseModal;
