import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

// Define the initial state using that type
const initialState: User | null = null;

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, { payload }: PayloadAction<User>) => {
      if (state === null) {
        return payload;
      }
      state.username = payload.username;
      state.bio = payload.bio;
      state.kyc_verified = payload.kyc_verified;
      state.contributions = payload.contributions;
      state.created_campaigns = payload.created_campaigns;
    },
    clearProfile: () => {
      return initialState;
    },
  },
});

export const { clearProfile, addProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
