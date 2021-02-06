import React from "react";
import { SinglePostSnippetFragment } from "../../generated/graphql";
import PostActions from "./PostActions";

interface Props {
  post: SinglePostSnippetFragment;
}

const SinglePost: React.FC<Props> = ({
  post: { id, creatorId, title, text },
}) => {
  return (
    <div className="max-w-2xl px-1 mx-auto">
      <h1 className="text-3xl text-center font-bold ">{title}</h1>
      <div className="w-full my-4 h-1 rounded-md bg-green-400 "></div>
      <p className="leading-7 tracking-wider">{text}</p>
      <div>
        <PostActions mobile={false} id={id} creatorId={creatorId} />
      </div>
    </div>
  );
};

export default SinglePost;
