import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
  name: "messageLog",
  initialState: [ "Log initialized"],
  reducers: {
    updateLogState: (state, action) => {
      state.push(action.payload);
      console.log("Log updated:", action.payload);
    },
    clearLogs: (state) => {
        state.splice(0, state.length);
        console.log("Logs cleared");
    }
  },
});

// Action creators are generated for each case reducer function
export const { updateLogState, clearLogs } = logSlice.actions;

export default logSlice.reducer;
