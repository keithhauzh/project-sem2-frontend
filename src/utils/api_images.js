import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    // Debugging: Check if image is added correctly
    console.log("Uploading image:", image);
    console.log("FormData contents:", formData.get("image"));
    const response = await axios.post(API_URL + "/image/newImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export const uploadImageDoc = async (image, token) => {
  try {
    const response = await axios.post(
      API_URL + "/image",
      { image },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const getImages = async (page) => {
  try {
    const response = await axios.get(API_URL + "/image?page=" + page);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const likeImage = async (id, token) => {
  try {
    const response = await axios.put(
      API_URL + "/image",
      { id },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const checkImageLiked = (user, likes) => {
  return likes.find((userId) => userId._id.toString() === user._id.toString())
    ? true
    : false;
};
