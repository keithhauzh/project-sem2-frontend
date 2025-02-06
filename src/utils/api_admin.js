import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL + "/admin");
    return response.data;
  } catch (error) {
    // console.log(error);
    toast.error(error.response.data.error);
  }
};

export const banUsers = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/admin/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deletePost = async (id, token, user) => {
  try {
    const response = await axios.delete(
      API_URL + "/admin" + id,
      { user },
      { headers: { Authorization: "Bearer " + token } }
    );
  } catch (error) {}
};
