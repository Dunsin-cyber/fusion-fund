import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoanRequest } from "../types";

// Define the initial state using that type
const initialState: LoanRequest[] = [];

export const MyCreatedLoanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    addMyLoan: (state, { payload }: PayloadAction<LoanRequest>) => {
      state.push(payload);
    },
    clearMyLoans: () => {
      return initialState;
    },
  },
});

export const { clearMyLoans, addMyLoan } = MyCreatedLoanSlice.actions;

export default MyCreatedLoanSlice.reducer;
