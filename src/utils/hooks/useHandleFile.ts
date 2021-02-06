import { useUploadImage } from "./useUploadImage";

export const useHandleFile = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setImageLoading
) => {
  let imageURL: string;
  setImageLoading(true);
  imageURL = await useUploadImage(e.target.files[0]);
  setImageLoading(false);
  return imageURL;
};
