import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

export const getPosts = async (interest = "", page = 1) => {
  try {
    const response = await axios.get(
      API_URL + "/posts?page=" + page + "&interest=" + interest
    );
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const getBookmarkedPosts = async (interest, page = 1, token) => {
  try {
    console.log(token);
    const response = await axios.get(
      API_URL + "/bookmarks?page=" + page + "&interest=" + interest,
      { headers: { Authorization: "Bearer " + token } }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const getPost = async (id) => {
  try {
    const response = await axios.get(API_URL + "/posts/edit/" + id);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const editPost = async (id, title, content, interest, token) => {
  try {
    const response = await axios.put(
      API_URL + "/posts/edit/" + id,
      {
        title,
        content,
        interest,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const likePost = async (id, user, token) => {
  try {
    // console.log(user);
    const response = await axios.put(
      API_URL + "/posts/" + id + "/like",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(response.data);
    if (response.data.likes.find((userId) => userId === user)) {
      // console.log(true);
      return true;
    } else {
      // console.log(false);
      return false;
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const checkPostLiked = (user, likes) => {
  // console.log(likes);
  // console.log(likes);
  // console.log(user);
  if (likes.find((userId) => userId._id === user)) {
    return true;
  } else {
    return false;
  }
};

export const bookmarkPost = async (id, user, token) => {
  try {
    const response = await axios.put(
      API_URL + "/posts/" + id + "/bookmark",
      {},
      { headers: { Authorization: "Bearer " + token } }
    );
    if (response.data.bookmarks.find((userId) => userId === user)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const checkPostBookmarked = (user, bookmarks) => {
  // console.log(user);
  if (bookmarks.find((userId) => userId._id === user)) {
    return true;
  } else {
    return false;
  }
};

export const addPost = async (user, title, content, interest, token) => {
  try {
    const response = await axios.post(
      API_URL + "/posts",
      {
        user,
        title,
        content,
        interest,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const deletePost = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/posts/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};
