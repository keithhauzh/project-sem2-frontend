import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

export const getComments = async (id) => {
  try {
    const response = await axios.get(API_URL + "/comments/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const createComment = async (id, content, token) => {
  try {
    // console.log(token);
    const response = await axios.post(
      API_URL + "/comments/create",
      { id, content },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};
