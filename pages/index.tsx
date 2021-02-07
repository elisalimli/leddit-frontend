import { Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../src/components/Other/Layout";
import Post from "../src/components/Post/Post";
import { usePostsQuery } from "../src/generated/graphql";
import { useSetActiveNavLink } from "../src/utils/hooks/useSetActiveNavLink";
import { withApollo } from "../src/utils/withApolloClient";

interface Props {}

const Index: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  useSetActiveNavLink(router.pathname);

  if (!data && !loading) {
    return (
      <div className="p-5 flex justify-center flex-col  font-bold text-2xl">
        <div>You got query failed for some reason :(</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        limit: variables.limit,
        cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
      },
      // updateQuery: (previousValue, { fetchMoreResult }) => {
      //   if (!fetchMoreResult) return previousValue;

      //   return {
      //     __typename: "Query",
      //     posts: {
      //       __typename: "PaginatedPosts",
      //       hasMore: fetchMoreResult.posts.hasMore,
      //       posts: [
      //         ...previousValue.posts.posts,
      //         ...fetchMoreResult.posts.posts,
      //       ],
      //     },
      //   };
      // },
    });
  };
  return (
    <Layout mobileFull={true}>
      {!data && loading ? (
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
          <Button onClick={loadMorePosts} isLoading={loading} className="my-5">
            Load more
          </Button>
        </div>
      ) : null}
    </Layout>
  );
};
export default withApollo({ ssr: true })(Index);
