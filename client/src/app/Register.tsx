import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Image,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
  Box,
  Popover,
  Progress,
} from "@mantine/core";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { IRegisterUser } from "../types/IUser";
import useAuth from "../hooks/useAuth";
import { useAppSelector } from "../hooks/useReducer";
import { MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

type Props = {};

// function to display password requirements in popover
function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <MdCheck size="0.9rem" /> : <RxCross2 size="0.9rem" />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

// Password requirements
const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

// get the strength of the password
function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function Register({ }: Props) {
  const { register, loading, current, authenticated } = useAuth();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const form = useForm<IRegisterUser>({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      username: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirm_password: (value, values) =>
        values.password !== value ? "Password Does not match" : null,
      username: (value) =>
        value.length <= 3 ? "Username must be more than 3 characters" : null,
      password: (value) =>
        value.length === 0 ? "Password cannot be empty" : null,
    },
  });

  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));
  const strength = getStrength(form.values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const handleSubmit = (values: IRegisterUser) => {
    if (strength < 100) {
      form.setErrors({ password: "Please enter a strong password" });
      return;
    }
    register(values, () => {
      navigate(`/verify`, { state: { email: values.email } });
    });
  };

  useEffect(() => {
    if (authenticated && current) {
      navigate("/");
    }
  }, [authenticated, current]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { ease: "easeOut", delay: 0.5 },
      }}
      className="w-screen h-screen flex flex-col space-y-4 items-center justify-center"
    >
      <div className="w-32">
        <Image src="/full.png" />
      </div>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={`w-full xl:w-1/4`}
      >
        <div className="m-2 flex flex-col space-y-2">
          <Text size={25} weight={"bold"}>
            Create New Account
          </Text>
          <div className="flex space-x-2">
            <Text color={theme.colors.dark[1]}>Already have an account? </Text>
            <Link to="/login">
              <Text weight="bold">Sign in</Text>
            </Link>
          </div>
          <Divider />
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            className="flex flex-col space-y-5"
          >
            <TextInput
              withAsterisk
              label="Username"
              placeholder="Your Usernam"
              {...form.getInputProps("username")}
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="Your email address"
              {...form.getInputProps("email")}
            />
            <Popover
              opened={popoverOpened}
              position="bottom"
              width="target"
              transitionProps={{ transition: "pop" }}
            >
              <Popover.Target>
                <div
                  onFocusCapture={() => setPopoverOpened(true)}
                  onBlurCapture={() => setPopoverOpened(false)}
                >
                  <PasswordInput
                    withAsterisk
                    label="Your password"
                    placeholder="Your password"
                    {...form.getInputProps("password")}
                  />
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement
                  label="Includes at least 6 characters"
                  meets={form.values.password.length > 5}
                />
                {checks}
              </Popover.Dropdown>
            </Popover>{" "}
            <PasswordInput
              withAsterisk
              label="Confirm Password"
              placeholder="Confirm Password"
              {...form.getInputProps("confirm_password")}
            />
            <Button type="submit" color="red" loading={loading}>
              Register
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}

export default Register;
