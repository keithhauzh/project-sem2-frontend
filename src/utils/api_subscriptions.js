import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

export const createSubscription = async (
  memberName,
  memberEmail,
  title = "",
  color,
  token
) => {
  try {
    // console.log(memberName);
    // console.log(memberEmail);
    // console.log(title);
    // console.log(color);
    // console.log(token);
    const response = await axios.post(
      API_URL + "/subscriptions",
      { memberName, memberEmail, title, color },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  try {
    const response = await axios.post(
      API_URL + "/subscriptions/verify-payment",
      {
        billplz_id,
        billplz_paid,
        billplz_paid_at,
        billplz_x_signature,
      }
    );
    return response.data;
  } catch (error) {
    // console.log(error);
    toast.error(error.message);
  }
};
