import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

export const getProfile = async (id) => {
  try {
    // console.log(id);
    const response = await axios.get(API_URL + "/profile/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const getSelfProfile = async (token) => {
  try {
    const response = await axios.get(API_URL + "/profile", {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const editProfile = async (name, bio, title, color, token) => {
  try {
    const response = await axios.put(
      API_URL + "/profile/edit",
      { name, bio, title, color },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};
