import { createSlice } from "@reduxjs/toolkit";

export const temperatureSensorSlice = createSlice({
  name: "tempertureSensor",
  initialState: {
    temperature: 0,
    humidity: 0,
  },
  reducers: {
    updateTemperatureState: (state, action) => {
      console.log("Updating temperature state:", action.payload);
      state.temperature = action.payload.temperature;
      state.humidity = action.payload.humidity;
    },
  },
});

export const co2ConcentrationSlice = createSlice({
  name: "co2Concentration",
  initialState: {
    ppm: 0,
  },
  reducers: {
    updateCo2ConcentrationState: (state, action) => {
      console.log("Updating co2 state:", action.payload.ppm);
      state.ppm = action.payload.ppm;
    },
  },
});
export const { updateTemperatureState } = temperatureSensorSlice.actions;
export const { updateCo2ConcentrationState } = co2ConcentrationSlice.actions;

export const temperatureSensorReducer = temperatureSensorSlice.reducer;
export const co2ConcentrationReducer = co2ConcentrationSlice.reducer;
