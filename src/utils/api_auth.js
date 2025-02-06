import { toast } from "sonner";
import { API_URL } from "../constants";
import axios from "axios";

export const doLogin = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/login", {
      email,
      password,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    toast.error(error.response.data.error);
  }
};

export const doSignup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // console.log(error)
    toast.error(error.response.data.error);
  }
};

export const getCurrentUser = (cookie) => {
  return cookie.currentUser ? cookie.currentUser : null;
};

export const isUserLoggedin = (cookie) => {
  return getCurrentUser(cookie) ? true : false;
};

export const isAdmin = (cookie) => {
  const currentUser = getCurrentUser(cookie);
  return currentUser && currentUser.role === "admin" ? true : false;
};

export const getUserToken = (cookie) => {
  const currentUser = getCurrentUser(cookie);
  return currentUser && currentUser.token ? currentUser.token : "";
};

export const getUserId = (cookie) => {
  const currentUser = getCurrentUser(cookie);
  // console.log(currentUser._id);
  return currentUser && currentUser._id ? currentUser._id : "";
};

export const verifyPremium = (cookie) => {
  const premiumUser = getCurrentUser(cookie);
  
  return premiumUser;
};
