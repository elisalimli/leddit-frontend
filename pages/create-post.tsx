import content from "../src/content/index";
import React, { useState } from "react";
import { formHeader } from "../src/styles/global";
import { useCreatePostMutation } from "../src/generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUqlClient } from "../src/utils/createUrqlClient";
import { useRouter } from "next/router";
import TextField from "../src/components/Other/InputField";
import { form } from "../src/styles/global";
import { Button, Link } from "@chakra-ui/react";
import { useUploadImage } from "../src/utils/hooks/useUploadImage";
import ImageIcon from "../src/components/icons/ImageIcon";
import { Layout } from "../src/components/Other/Layout";
import { useIsAuth } from "../src/utils/hooks/useIsAuth";
import { useSetActiveNavLink } from "../src/utils/hooks/useSetActiveNavLink";
import { Formik, Form } from "formik";
import InputField from "../src/components/Other/InputField";
import NextLink from "next/link";

const createPost: React.FC<{}> = ({}) => {
  const [state, setState] = useState({ imageURL: null, title: "", text: "" });
  const [{ fetching }, createPost] = useCreatePostMutation();
  const [imageLoading, setImageLoading] = useState(false);
  const router = useRouter();
  useIsAuth();
  useSetActiveNavLink(router.pathname);
  const inputFileId = "file";

  const handleChange = (e: any) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLoading(true);
    const imageURL = await useUploadImage(e.target.files[0]);
    console.log(imageURL);
    setImageLoading(false);
    setState({ ...state, imageURL });
    console.log(state, imageURL);
  };

  const handleClick = () => document.getElementById(inputFileId).click();

  return (
    <Layout mobileFull={true}>
      <Formik
        initialValues={state}
        onSubmit={async (values, { setErrors }) => {
          const { error, data } = await createPost({
            input: {
              text: values.text,
              title: values.title,
              imageURL: state.imageURL,
            },
          });

          if (!data?.createPost?.errors && !error) router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form className={form}>
            <NextLink href="/">
              <h1 className={formHeader}>Create Post</h1>
            </NextLink>

            <InputField name="title" placeholder="Title" label="Title" />
            <InputField
              textarea={true}
              name="text"
              placeholder="text"
              label="Text"
            />
            <Button
              mt={2}
              mr="auto"
              disabled={fetching || imageLoading}
              isLoading={imageLoading}
              type="button"
              colorScheme="green"
              onClick={handleClick}
              minWidth="100px"
              variant="solid"
            >
              <ImageIcon />
            </Button>
            <input
              type="file"
              hidden={true}
              id={inputFileId}
              onChange={handleFile}
            />

            <Button
              mx="auto"
              mt="6"
              isLoading={isSubmitting}
              disabled={fetching || imageLoading}
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
  );
};

export default withUrqlClient(createUqlClient)(createPost);
