import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import UpdootSection from "./UpdootSection";
import { PostSnippetFragment } from "../../generated/graphql";

interface Props {
  post: PostSnippetFragment;
}

const PostFooter = ({ post }: Props) => {
  const {
    creator: { username },
  } = post;
  return (
    <Box mt={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Flex mb="2" alignItems="center">
            <img
              src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
              className="w-10 h-10 rounded-full object-cover"
              alt="Avatar"
            />
            <Link
              href="#"
              className="capitalize text-gray-700 dark:text-gray-200 font-bold mx-2"
            >
              {username}
            </Link>
          </Flex>
          <span className="mx-1 text-sm text-gray-600 dark:text-gray-300">
            21 SEP 2021
          </span>
        </Box>
        <Box>
          <UpdootSection post={post} />
        </Box>
      </Flex>
    </Box>
  );
};

export default PostFooter;
