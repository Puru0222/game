import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: '',
  uid: '',
  balance: 0,
  email: '',
};

const updateUserSlice = createSlice({

  name: "user",
  initialState,
  reducers: {
    setUserdata(state, value) {
      const { fullname, uid, balance, email } = value.payload;
      state.fullname = fullname;
      state.uid = uid;
      state.balance = balance;
      state.email = email;
    },
  },
});

export const { setUserdata } = updateUserSlice.actions;
export default updateUserSlice.reducer;
