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
    const response = await axios.delete(API_URL + "/admin/user/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const deletePost = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/admin/post/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    // console.log(error)
    toast.error(error.response.data.error);
  }
};

export const createInterest = async (interestName, token) => {
  try {
    const response = await axios.post(
      API_URL + "/admin/interest",
      { interestName },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deleteInterest = async (id, token) => {
  try {
    // console.log(id);
    const response = await axios.delete(API_URL + "/admin/interest/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  } catch (error) {
    // console.log(error.response.data.error);
    toast.error(error.response.data.error);
  }
};
