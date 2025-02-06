import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { verifyPayment } from "../../utils/api_subscriptions";
import { useCookies } from "react-cookie";

export default function VerifyPayment() {
  const navigate = useNavigate();
  const [cookie, removeCookie] = useCookies(["currentUser"]);

  const [searchParams] = useSearchParams();

  // data from url parameters
  const billplz_id = searchParams.get("billplz[id]");
  const billplz_paid = searchParams.get("billplz[paid]");
  const billplz_paid_at = searchParams.get("billplz[paid_at]");
  const billplz_x_signature = searchParams.get("billplz[x_signature]");

  useEffect(() => {
    console.log(billplz_id, billplz_paid, billplz_paid_at, billplz_x_signature);
    verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    ).then((updatedSubscription) => {
      // check if the order is paid or not
      // if its paid, show the success message
      if (updatedSubscription.status === "paid") {
        toast.success("Payment and Subscription is successful. Have fun!");
        navigate("/login");
        removeCookie("currentUser");
        toast.success("Please log back in again to enjoy your perks!");
      }
      // if its failed, show the failed message
      if (updatedSubscription.status === "failed") {
        navigate("/");
        toast.error("Payment failed");
      }
    });
  }, [
    billplz_id,
    billplz_paid,
    billplz_paid_at,
    billplz_x_signature,
    navigate,
    removeCookie,
  ]);

  return (
    <>
      We're verifying your payment. Please don't close the browser or go back.
    </>
  );
}
