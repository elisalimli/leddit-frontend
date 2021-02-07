import React, { useState } from "react";
import NextLink from "next/link";
import { Link, Button } from "@chakra-ui/react";
import { useRegisterMutation, useMeQuery } from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { createUqlClient } from "../src/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { formHeader, form } from "../src/styles/global";
import { useRouter } from "next/router";
import InputField from "../src/components/Other/InputField";
import { Formik, Form } from "formik";
import { withApollo } from "../src/utils/withApolloClient";

interface Props {}

const Register: React.FC<Props> = ({}) => {
  const { data } = useMeQuery();
  const router = useRouter();
  let [register] = useRegisterMutation();

  if (data?.me) router.push("/");

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const res = await register({
          variables: {
            options: values,
          },
        });

        if (res.data?.register.errors) {
          setErrors(toErrorMap(res.data.register.errors));
        } else if (res.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={form}>
          <NextLink href="/">
            <h1 className={formHeader}>Register now!</h1>
          </NextLink>

          <InputField name="email" placeholder="Email" label="Email" />
          <InputField name="username" placeholder="Username" label="Username" />
          <InputField
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
          />
          <NextLink href="/login">
            <Link ml="auto" mt="1" color="blue.400" className="text-sm">
              Already have an account ? Login here!
            </Link>
          </NextLink>
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
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: true })(Register);
