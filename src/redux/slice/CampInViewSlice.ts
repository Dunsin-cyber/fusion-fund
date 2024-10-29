import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Campaign } from "../types";

// Define the initial state using that type
const initialState: Campaign = {
  campaign_id: 0,
  creator: "",
  total_contributions: 0,
  contributions: [],
  crowdfunding_end_time: 0,
  claimed: false,
  amount_required: 0,
  title: "",
  description: "",
  images: "",
  campaign_code: "",
};

export const CampaignInViewSlice = createSlice({
  name: "campaignInView",
  initialState,
  reducers: {
    addCampaignInView: (state, { payload }: PayloadAction<Campaign>) => {
      state.campaign_id = payload.campaign_id;
      state.creator = payload.creator;
      state.total_contributions = payload.total_contributions;
      state.contributions = payload.contributions;
      state.crowdfunding_end_time = payload.crowdfunding_end_time;
      state.claimed = payload.claimed;
      state.amount_required = payload.amount_required;
      state.title = payload.title;
      state.description = payload.description;
      state.images = payload.images;
      state.campaign_code = payload.campaign_code;
    },

    clearCampaignInView: () => {
      return initialState;
    },
  },
});

export const { addCampaignInView, clearCampaignInView } =
  CampaignInViewSlice.actions;

export default CampaignInViewSlice.reducer;
