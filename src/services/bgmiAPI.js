import { toast } from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { bgmiendpoint } from "./apis";

const { CREATEBGMICHALLANGE_API } = bgmiendpoint;

export function createBgmiChallange(
  uid,
  roomId,
  roomPassword,
  teamMode,
  map,
  price,
  players,
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
        players,
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
      console.log("BGMI CHALLANGE CREATE ERROR.......", error);
      toast.error("Challange Not Created");
    }
    toast.dismiss(toastId);
  };
}
