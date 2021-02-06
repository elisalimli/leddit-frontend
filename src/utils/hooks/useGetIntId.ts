export const useGetIntId = (param) => {
  return typeof param === "string" ? parseInt(param) : -1;
};
