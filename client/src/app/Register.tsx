import React, { useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Image,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { IRegisterUser } from "../types/IUser";
import useAuth from "../hooks/useAuth";
import { useAppSelector } from "../hooks/useReducer";

type Props = {};

function Register({}: Props) {
  const { current, authenticated } = useAppSelector((state) => state.auth);
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
    },
  });
  const { register, loading } = useAuth();

  const handleSubmit = (values: IRegisterUser) => {
    register(values);
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
        className={`w-full h-1/2 xl:w-1/4`}
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
              label="username"
              {...form.getInputProps("username")}
            />
            <TextInput
              withAsterisk
              label="Email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              withAsterisk
              label="Confirm Password"
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
