import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Campaign } from "../types";

// Define the initial state using that type
const initialState: Campaign[] = [];

export const MyCampaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    addMyCampaign: (state, { payload }: PayloadAction<Campaign>) => {
      state.push(payload);
    },
    clearMyCampaigns: () => {
      return initialState;
    },
  },
});

export const { clearMyCampaigns, addMyCampaign } = MyCampaignSlice.actions;

export default MyCampaignSlice.reducer;
