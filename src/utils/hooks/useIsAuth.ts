import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../../generated/graphql";

export const useIsAuth = () => {
  const { loading, data } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me) router.replace("/login?next=" + router.pathname);
  }, [data, router, loading]);
};
