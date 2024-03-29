import { useRouter } from "next/router";
import { usePostQuery } from "../../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
  const router = useRouter();
  const intId = useGetIntId(router.query.id);
  return usePostQuery({
    skip: intId === -1,
    variables: { id: intId },
  });
};
