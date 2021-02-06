import { withUrqlClient } from "next-urql";
import { createUqlClient } from "../src/utils/createUrqlClient";
import React, { useState } from "react";
import { useForgotPasswordMutation } from "../src/generated/graphql";
import InputField from "../src/components/Other/InputField";
import { formHeader, form } from "../src/styles/global";
import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import NextLink from "next/link";
import Wrapper from "../src/components/Other/Wrapper";

interface Props {}

const ForgotPassword = (props: Props) => {
  const [{}, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);

  return (
    <Wrapper mobileFull={true}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, {}) => {
          await forgotPassword({ email: values.email });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <p className="font-bold text-center text-gray-900 dark:text-gray-200 text-2xl">
              If an account with that email exists,we can sent you email
            </p>
          ) : (
            <Form className={form}>
              <NextLink href="/">
                <h1 className={formHeader}>Forgot password ?</h1>
              </NextLink>
              <InputField name="email" placeholder="email" label="Email" />
              <Button
                mx="auto"
                mt="6"
                isLoading={isSubmitting}
                type="submit"
                loadingText="Submitting"
                colorScheme="blue"
                width="200px"
                variant="solid"
              >
                Submit
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUqlClient)(ForgotPassword);
