import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

export const getInterests = async () => {
  try {
    const response = await axios.get(API_URL + "/interests");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const getInterest = async (id) => {
  try {
    const response = await axios.get(API_URL + "/interests/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
}
};

export const addInterest = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/interests",
      { name },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};