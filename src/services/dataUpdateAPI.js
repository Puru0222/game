import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { updateDataEndpoint } from "./apis";
import { setUserdata } from "../slices/updateUserSlice";

const { UPDATEBALANCE_API, GETUSER_API } = updateDataEndpoint;

export function getUser(uid) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const result = await apiConnector("GET", GETUSER_API, null, null, { uid });
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      toast.success("User Got");
      dispatch(setUserdata(result.data.user));
    } catch (error) {
      toast.error("User Absent");
    }
    toast.dismiss(toastId);
  };
}

export function updateBalance(uid, balance) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const result = await apiConnector("PUT", UPDATEBALANCE_API, {
        uid,
        balance,
      });
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      toast.success("Balance Updated Successfully");
    } catch (error) {
      console.error("Error updating balance:", error);
      toast.error("Failed to Update balance");
    }
    toast.dismiss(toastId);
  };
}
