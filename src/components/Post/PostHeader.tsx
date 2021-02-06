import { Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { PostSnippetFragment } from "../../generated/graphql";
import PostActions from "./PostActions";

interface Props {
  post: PostSnippetFragment;
}

const PostHeader = ({ post }: Props) => {
  const { id, title, textSnippet } = post;
  return (
    <Box>
      <div className="flex justify-between flex-row items-center">
        <NextLink href="/post/[id]" as={`/post/${id}`}>
          <Link
            fontWeight="bold"
            textDecoration="none"
            fontSize="2xl"
            className="dark:hover:text-gray-500 hover:text-gray-700  transition-colors duration-500"
            style={{ textDecoration: "none" }}
          >
            {title}
          </Link>
        </NextLink>
        <PostActions id={id} creatorId={post.creatorId} />
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {textSnippet}...
      </p>
    </Box>
  );
};

export default PostHeader;
