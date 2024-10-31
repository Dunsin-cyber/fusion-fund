import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoanRequest } from "../types";

// Define the initial state using that type
const initialState: LoanRequest[] = [];

export const AllLoanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    addLoan: (state, { payload }: PayloadAction<LoanRequest>) => {
      state.push(payload);
    },
    clearAllLoans: () => {
      return initialState;
    },
  },
});

export const { addLoan, clearAllLoans } = AllLoanSlice.actions;

export default AllLoanSlice.reducer;
