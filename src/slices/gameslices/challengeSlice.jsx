import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  challenges: [],
};

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    saveChallenges: (state, action) => {
      const newChallenges = action.payload.filter(
        (newChallenge) =>
          !state.challenges.some(
            (existingChallenge) =>
              existingChallenge.uniqueSerialNumber ===
              newChallenge.uniqueSerialNumber
          )
      );

      state.challenges = [...state.challenges, ...newChallenges];
    },
  },
});

export const { saveChallenges } = challengeSlice.actions;
export default challengeSlice.reducer;
