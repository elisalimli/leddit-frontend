import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useLoginMutation, useMeQuery } from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { useRouter } from "next/router";
import { createUqlClient } from "../src/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Button } from "@chakra-ui/react";
import InputField from "../src/components/Other/InputField";
import { form, formHeader } from "../src/styles/global";
import Wrapper from "../src/components/Other/Wrapper";

interface Props {}

const Login = ({}: Props) => {
  const router = useRouter();
  let [{}, login] = useLoginMutation();
  const [{ data }] = useMeQuery();
  //------------------------------

  if (data?.me && !router.query.next) {
    router.push("/");
  }

  return (
    <Wrapper mobileFull={true}>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login(values);
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else if (res.data?.login.user) {
            if (typeof router.query.next === "string")
              router.push(router.query.next as string);
            else router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={form}>
            <NextLink href="/">
              <h1 className={formHeader}>Login now!</h1>
            </NextLink>

            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            <NextLink href="/forgot-password">
              <Link ml="auto" mt="1" color="blue.400" className="text-sm">
                Forgot password?
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUqlClient)(Login);
