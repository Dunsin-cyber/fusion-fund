import { configureStore } from "@reduxjs/toolkit";
import profile from "./slice/ProfileSlice";
import campaign from "./slice/CampaignSlice";
import myCampaign from "./slice/MyCampaigns";

export const store = configureStore({
  reducer: {
    profile,
    campaign,
    myCampaign,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
