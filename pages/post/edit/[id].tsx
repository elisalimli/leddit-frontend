import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUqlClient } from "../../../src/utils/createUrqlClient";
import { Button, Spinner } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import ImageIcon from "../../../src/components/icons/ImageIcon";
import InputField from "../../../src/components/Other/InputField";
import { Layout } from "../../../src/components/Other/Layout";
import { form, formHeader } from "../../../src/styles/global";
import NextLink from "next/link";
import { useGetPostFromUrl } from "../../../src/utils/hooks/useGetPostFromUrl";
import { useUpdatePostMutation } from "../../../src/generated/graphql";
import { useGetIntId } from "../../../src/utils/hooks/useGetIntId";

interface Props {}

const EditPost = (props: Props) => {
  const [{ data, fetching }] = useGetPostFromUrl();
  const [{}, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div className="flex justify-center">
          <Spinner />
        </div>
      </Layout>
    );
  } else if (!data?.post && !fetching) {
    return (
      <Layout>
        <h1 className="text-center text-3xl font-semibold ">
          Could not found post -_-
        </h1>
      </Layout>
    );
  }

  return (
    <div>
      <Layout mobileFull={true}>
        <Formik
          initialValues={{ title: data?.post?.title, text: data?.post?.text }}
          onSubmit={async (values, {}) => {
            await updatePost({
              id: useGetIntId(router.query.id),
              text: values.text,
              title: values.title,
            });
            router.back();
          }}
        >
          {({ isSubmitting }) => (
            <Form className={form}>
              <NextLink href="/">
                <h1 className={formHeader}>Edit Post</h1>
              </NextLink>

              <InputField name="title" placeholder="Title" label="Title" />
              <InputField
                textarea={true}
                name="text"
                placeholder="text"
                label="Text"
              />

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
      </Layout>
    </div>
  );
};

export default withUrqlClient(createUqlClient)(EditPost);
