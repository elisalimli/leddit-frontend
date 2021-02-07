import React, { useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";
import MyIcon from "../Other/MyIcon";
import { PostSnippetFragment, useVoteMutation } from "../../generated/graphql";

interface Props {
  post: PostSnippetFragment;
}

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
