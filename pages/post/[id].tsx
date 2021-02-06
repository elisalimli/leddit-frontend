import React from "react";
import { withUrqlClient } from "next-urql";
import { createUqlClient } from "../../src/utils/createUrqlClient";
import { useRouter } from "next/router";
import {
  usePostQuery,
  SinglePostSnippetFragment,
} from "../../src/generated/graphql";
import { Layout } from "../../src/components/Other/Layout";
import { Spinner } from "@chakra-ui/react";
import SinglePost from "../../src/components/Post/SinglePost";
import { useGetPostFromUrl } from "../../src/utils/hooks/useGetPostFromUrl";

const Post = ({}) => {
  const router = useRouter();
  const [{ data, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div className="flex justify-center">
          <Spinner />
        </div>
      </Layout>
    );
  } else if (!data.post) {
    return (
      <Layout>
        <h1 className="text-center text-3xl font-semibold text-red-600">
          Could not found post -_-
        </h1>
      </Layout>
    );
  }

  return (
    <Layout mobileFull={true}>
      <SinglePost post={data.post} />
    </Layout>
  );
};

export default withUrqlClient(createUqlClient, { ssr: true })(Post as any);
