import { configureStore } from "@reduxjs/toolkit";
import profile from "./slice/ProfileSlice";
import campaigns from "./slice/CampaignSlice";
import myCampaign from "./slice/MyCampaigns";
import campInView from "./slice/CampInViewSlice";
import myLoans from "./slice/MyCreatedLoan";
import allLoans from "./slice/AllLoneSlice";
import allLoanReq from "./slice/LoanReqSlice";

export const store = configureStore({
  reducer: {
    profile,
    campaigns,
    myCampaign,
    campInView,
    myLoans,
    allLoans,
    allLoanReq,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
