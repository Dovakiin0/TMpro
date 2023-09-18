import { useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Group,
  Image,
  PinInput,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "@mantine/form";
import { IVerifyOtp } from "../types/IUser";
import useAuth from "../hooks/useAuth";

type Props = {};

function Verify({ }: Props) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<IVerifyOtp>({
    initialValues: {
      otp: 0,
    },
    validate: {
      otp: (value) => (value.toString().length === 6 ? null : "Invalid OTP"),
    },
  });

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
  }, [location]);

  const { verifyOTP, generateOTP } = useAuth();

  const handleSubmit = (values: IVerifyOtp) => {
    if (location.state) {
      verifyOTP(location.state.email, values.otp, () => {
        navigate("/login");
      });
    }
  };

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
            Verify Your Account
          </Text>
          <div className="flex space-x-2">
            <Text color={theme.colors.dark[1]}>
              Didn't get verification code?{" "}
            </Text>
            <p
              className="font-bold underline hover:cursor-pointer"
              onClick={() => generateOTP(location.state.email)}
            >
              Resend
            </p>
          </div>
          <Divider />
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            className="flex flex-col space-y-5"
          >
            <Text weight="bold" size="xl">
              Enter Verification Code
            </Text>
            <Group position="center">
              <PinInput
                size="xl"
                type="number"
                length={6}
                {...form.getInputProps("otp")}
              />
            </Group>
            <Button color="red" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}

export default Verify;
