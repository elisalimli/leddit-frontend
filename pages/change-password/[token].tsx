import React, { useState } from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useChangePasswordMutation } from "../../src/generated/graphql";
import { toErrorMap } from "../../src/utils/toErrorMap";
import { useRouter } from "next/router";
import Wrapper from "../../src/components/Other/Wrapper";
import { createUqlClient } from "../../src/utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { NextPage } from "next";
import { form, formHeader } from "../../src/styles/global";
import Input from "../../src/components/Other/InputField";
import { Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputField from "../../src/components/Other/InputField";
import { withApollo } from "../../src/utils/withApolloClient";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  let [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper mobileFull={true}>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            },
          });
          if (res.data?.changePassword.errors) {
            const errorMap = toErrorMap(res.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (res.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={form}>
            <NextLink href="/">
              <h1 className={formHeader}>Change Password</h1>
            </NextLink>
            <InputField
              name="newPassword"
              placeholder="New password"
              label="New Password"
            />
            {tokenError ? (
              <div className="flex items-center mt-2 text-sm">
                <span className="text-red-600 mr-2">
                  <b>Error!</b> Token expired!
                </span>
                <NextLink href="/forgot-password">
                  <Link color="blue.500">Click here for try again.</Link>
                </NextLink>
              </div>
            ) : null}
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
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
