import { Box, Flex, Link, Image } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../../generated/graphql";
import UpdootSection from "./UpdootSection";
import NextLink from "next/link";
import MyIcon from "../Other/MyIcon";
import TrashIcon from "../icons/TrashIcon";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostImage from "./PostImage";

interface Props {
  post: PostSnippetFragment;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <Box
      mx="auto"
      borderRadius="lg"
      boxShadow="md"
      className="transition-all duration-1000 bg-white dark:bg-transparent"
      maxW="2xl"
    >
      <PostImage imageURL={post.imageURL} />
      <Box p={6}>
        <PostHeader post={post} />
        <PostFooter post={post} />
      </Box>
    </Box>
  );
};

export default Post;
