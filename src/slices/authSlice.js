import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  token: null,
  emailData: null,
  createChallenge: [],
  joinChallenge: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setEmail(state, action) {
      state.emailData = action.payload;
    },
    setUser(state, action) {
      const {
        _id,
        fullname,
        uid,
        balance,
        email,
        createChallenge,
        joinChallenge,
      } = action.payload;
      state.id = _id;
      state.fullname = fullname;
      state.uid = uid;
      state.balance = balance;
      state.email = email;
      state.createChallenge = createChallenge || [];
      state.joinChallenge = joinChallenge || [];
    },
    logout(state) {
      // Reset all fields to initial state on logout
      Object.assign(state, initialState);
    },
  },
});

export const {
  setSignupData,
  setLoading,
  setToken,
  setEmail,
  setUser,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
