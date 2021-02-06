import axios from "axios";

const secret = "dvzql12lb";
const preset = "tnnela1a";
const apiKey = "216885472788511";
//-------------------------------

export const useUploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", preset);
  formData.append("api_key", apiKey);
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${secret}/image/upload`,
    formData
  );
  return response.data.url;
};
