import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { updateDataEndpoint } from "./apis";
import { setUserdata } from "../slices/updateUserSlice";
const { UPDATEBALANCE_API, GETUSER_API } = updateDataEndpoint;

export function getUser(uid) {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Loading...");
    try {
      const email = getState().auth.email;
      const result = await apiConnector("GET", GETUSER_API, null, null, {
        uid,
        email,
      });

      if (!result.data.success) {
        throw new Error(result.data.message);
      }

      toast.success("User retrieved successfully");
      dispatch(setUserdata(result.data.user));
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("User not found or an error occurred");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function updateBalance(uid, balance) {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Updating balance...");
    try {
      const email = getState().auth.email;

      const result = await apiConnector("PUT", UPDATEBALANCE_API, {
        uid,
        balance,
        email,
      });
      if (!result.data.success) {
        throw new Error(result.data.message);
      }

      toast.success("Balance updated successfully");
    } catch (error) {
      console.error("Error updating balance:", error);
      toast.error("Failed to update balance. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
