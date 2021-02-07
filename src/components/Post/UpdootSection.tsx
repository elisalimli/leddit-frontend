import React, { useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";
import MyIcon from "../Other/MyIcon";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../../generated/graphql";
import { ApolloCache, gql } from "@apollo/client";

interface Props {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  }) as PostSnippetFragment;

  if (data) {
    if (data.voteStatus === value) return;
    const newPoints = data.points + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment _ on Post {
          id
          points
          voteStatus
        }
      `,
      data: { id: postId, points: newPoints, voteStatus: value },
    });
  }
};

const UpdootSection: React.FC<Props> = ({
  post: { points, id, voteStatus, title, creatorId },
}) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [vote, {}] = useVoteMutation();

  const voteUp = async () => {
    if (voteStatus === 1) return;
    setLoadingState("updoot-loading");
    await vote({
      variables: {
        postId: id,
        value: 1,
      },
      update: (cache, { data }) => {
        updateAfterVote(1, id, cache);
      },
    });
    setLoadingState("not-loading");
  };
  const voteDown = async () => {
    if (voteStatus === -1) return;
    setLoadingState("downdoot-loading");
    await vote({
      variables: {
        postId: id,
        value: -1,
      },
      update: (cache, { data }) => {
        updateAfterVote(-1, id, cache);
      },
    });
    setLoadingState("not-loading");
  };

  return (
    <div
      className="flex flex-col justify-start items-center"
      style={{ marginTop: "-25px" }}
    >
      <MyIcon
        color={voteStatus == 1 ? "green" : undefined}
        isLoading={loadingState === "updoot-loading"}
        onClick={voteUp}
        isRound={false}
        activeBackground={undefined}
        toolTipText="Up vote post"
      >
        <ChevronUp />
      </MyIcon>
      {points}
      <MyIcon
        color={voteStatus === -1 ? "red" : undefined}
        isRound={false}
        isLoading={loadingState === "downdoot-loading"}
        onClick={voteDown}
        activeBackground={undefined}
        toolTipText="Up down post"
      >
        <ChevronDown />
      </MyIcon>
    </div>
  );
};

export default UpdootSection;
