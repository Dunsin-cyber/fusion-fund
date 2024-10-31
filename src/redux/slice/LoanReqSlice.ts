import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoanRequest } from "../types";

// Define the initial state using that type
const initialState: LoanRequest[] = [];

export const LoanReqSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    addLoanReq: (state, { payload }: PayloadAction<LoanRequest>) => {
      state.push(payload);
    },
    clearLoanReqs: () => {
      return initialState;
    },
  },
});

export const { clearLoanReqs, addLoanReq } = LoanReqSlice.actions;

export default LoanReqSlice.reducer;
