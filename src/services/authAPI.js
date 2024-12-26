import { toast } from "react-hot-toast";
import { setToken, setUser } from "../slices/authSlice";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  SENDPASSWORDOTP_API,
  UPDATEPASSWORD_API,
  USER_DATA,
} = endpoints;

export function sendOtp(email, uid, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    // dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        uid,
        checkUserPresent: true,
      });
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to send OTP";
      toast.error(errorMessage);
    }
    // dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  fullname,
  uid,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    // dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        fullname,
        uid,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/loginSignup");
    } catch (error) {
      toast.error("Signup Failed");
      navigate("/loginSignup");
    }
    toast.dismiss(toastId);
  };
}

export function login(loginEmail, loginPassword, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    // dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email: loginEmail,
        password: loginPassword,
      });


      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard/join");
    } catch (error) {
      toast.error("Login Failed");
    }
    // dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function sendPasswordOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    // dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDPASSWORDOTP_API, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email-password");
    } catch (error) {
      toast.error("Could Not Send OTP");
    }
    // dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function updatePassword(email, otp, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const result = await apiConnector("PUT", UPDATEPASSWORD_API, {
        email,
        otp,
        password,
      });
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      toast.success("Password Updated Successfully");
      navigate("/verify-email-password");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to Update Password");
    }
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function fetchUserAndChallenges(token) {
  return async (dispatch) => {
    // const toastId = toast.loading("Fetching data...");
    try {
      const userResult = await apiConnector("GET", USER_DATA, null, {
        Authorization: `Bearer ${token}`,
      });
      if (userResult.data.success) {
        dispatch(setUser(userResult.data.user));
      } else {
        throw new Error("Failed to fetch user data");
      }
      // toast.success("Data fetched successfully");
    } catch (error) {
      console.error("Error fetching user and challenges:", error);
    }
      // toast.error("Failed to fetch data");
    // } finally {
    //   toast.dismiss(toastId);
    // }
  };
}
