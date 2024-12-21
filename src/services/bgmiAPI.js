import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { bgmiendpoint } from "./apis";

const { CREATEBGMICHALLANGE_API, GET_CHALLANGES } = bgmiendpoint;

export function createBgmiChallange(
  uid,
  roomId,
  roomPassword,
  teamMode,
  map,
  price,
  fullname,
  uniqueSerialNumber,
  gname,
  note,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const result = await apiConnector("POST", CREATEBGMICHALLANGE_API, {
        uid,
        roomId,
        roomPassword,
        teamMode,
        map,
        price,
        fullname,
        uniqueSerialNumber,
        gname,
        note
      });
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      toast.success("Challange Created");
      navigate("/profile");
    } catch (error) {
      toast.error("Challange Not Created");
    }
    toast.dismiss(toastId);
  };
}

export const fetchChallenges = async () => {
  try {
    const result = await apiConnector("GET", GET_CHALLANGES);
    if (result.data.success) {
      return result.data.challenges;
    } else {
      toast.error("Failed to load challenges");
      return [];
    }
  } catch (error) {
    toast.error("An error occurred while fetching challenges");
    return [];
  }
};