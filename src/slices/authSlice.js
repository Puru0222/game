import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  emailData: null,
  createChallenge: [],
  joinChallenge: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setEmail(state, value) {
      state.emailData = value.payload;
    },
    setUser(state, value) {
      const {
        _id,
        fullname,
        uid,
        balance,
        email,
        createChallenge,
        joinChallenge,
      } = value.payload;
      state.id = _id;
      state.fullname = fullname;
      state.uid = uid;
      state.balance = balance;
      state.email = email;
      state.createChallenge = createChallenge || [];
      state.joinChallenge = joinChallenge || [];
    },
  },
});

export const { setSignupData, setLoading, setToken, setEmail, setUser } =
  authSlice.actions;
export default authSlice.reducer;
