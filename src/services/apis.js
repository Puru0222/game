const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  SENDPASSWORDOTP_API: BASE_URL + "/auth/sendpasswordotp",
  FORGOTPASSWORD_API: BASE_URL + "/auth/forgotpassword",
  UPDATEPASSWORD_API: BASE_URL + "/auth/updatepassword",
  USER_DATA: BASE_URL + "/auth/fetchuser",
};

export const updateDataEndpoint = {
  GETUSER_API: BASE_URL + "/update/getuser",
  UPDATEBALANCE_API: BASE_URL + "/update/updatebalance",
  SENT_EMAIL: BASE_URL + "/update/sendemail",
  SENT_COMP: BASE_URL + "/update/sendcomp",
};

export const bgmiendpoint = {
  CREATEBGMICHALLANGE_API: BASE_URL + "/challange/create",
  GET_CHALLANGES: BASE_URL + "/challange/getChallenges",
  UPDATE_PLAYER: BASE_URL + "/challange/updateplayer",
  SELECT_WINNER: BASE_URL + "/challange/updateChallenge",
  START_CHALLENGE: BASE_URL + "/challange/markChallengeStarted",
  DELETE_CHALLENGE: BASE_URL + "/challange/deleteChallenge",
};

export const reviewendpoints = {
  CREATE_REVIEW_API: BASE_URL + "/review/create-review",
  GET_REVIEW_API: BASE_URL + "/review/get-reviews",
};
