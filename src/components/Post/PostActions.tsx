import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../../generated/graphql";
import TrashIcon from "../icons/TrashIcon";
import UpdateIcon from "../icons/UpdateIcon";
import MyIcon from "../Other/MyIcon";

const PostActions = ({ id, creatorId, mobile = true }) => {
  const [{}, deletePost] = useDeletePostMutation();
  const [{ data }] = useMeQuery();

  const onDeletePost = async () => {
    await deletePost({ id });
  };

  return data?.me?.id === creatorId ? (
    <div
      className={`ml-auto flex   ${mobile ? "flex-col" : ""} ${
        !mobile ? "mt-6" : ""
      } smormd:flex-row`}
    >
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <span className={`${mobile ? "mr-1" : "mr-3"}`}>
          <MyIcon
            isRound={true}
            activeBackground="transparent"
            toolTipText="Edit Post"
          >
            <UpdateIcon />
          </MyIcon>
        </span>
      </NextLink>
      <MyIcon
        onClick={onDeletePost}
        isRound={true}
        activeBackground="transparent"
        toolTipText="Delete Post"
      >
        <TrashIcon />
      </MyIcon>
    </div>
  ) : null;
};

export default PostActions;
