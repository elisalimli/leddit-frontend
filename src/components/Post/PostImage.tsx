import React from "react";
import { Image } from "@chakra-ui/react";

interface Props {
  imageURL: string;
}

const PostImage = ({ imageURL }: Props) => {
  // return imageURL ? (
  //   <Image
  //     borderTopRadius="lg"
  //     w="100%"
  //     h={64}
  //     objectFit="cover"
  //     src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  //     alt="Article"
  //   />
  // ) : null;
  return null;
};

export default PostImage;
