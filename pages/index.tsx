import { Button, Spinner } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../src/components/Other/Layout";
import Post from "../src/components/Post/Post";
import { usePostsQuery } from "../src/generated/graphql";
import { createUqlClient } from "../src/utils/createUrqlClient";
import { useSetActiveNavLink } from "../src/utils/hooks/useSetActiveNavLink";

interface Props {}

const Index: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [variables, setVariables] = useState({ limit: 15, cursor: null });
  const [{ data, error, fetching }] = usePostsQuery({ variables });
  useSetActiveNavLink(router.pathname);

  if (!data && !fetching) {
    return (
      <div className="p-5 flex justify-center flex-col  font-bold text-2xl">
        <div>You got query failed for some reason :(</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout mobileFull={true}>
      {!data && fetching ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full lg:w-2/3 md:w-10/12  mt-6 mx-auto  space-y-20 ">
          {data.posts.posts.map((post) =>
            post ? <Post key={post.id} post={post} /> : null
          )}
        </div>
      )}
      {data && data.posts.hasMore ? (
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            className="my-5"
          >
            Load more
          </Button>
        </div>
      ) : null}
    </Layout>
  );
};
export default withUrqlClient(createUqlClient, { ssr: true })(Index);
