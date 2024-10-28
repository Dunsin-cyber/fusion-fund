import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Campaign } from "../types";

// Define the initial state using that type
const initialState: Campaign[] = [];

export const CampaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    addCampaign: (state, { payload }: PayloadAction<Campaign>) => {
      state.push(payload);
    },
    clearCampaigns: () => {
      return initialState;
    },
  },
});

export const { addCampaign, clearCampaigns } = CampaignsSlice.actions;

export default CampaignsSlice.reducer;
