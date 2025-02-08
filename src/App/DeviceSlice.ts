import { createSlice } from '@reduxjs/toolkit'

export const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    relay1: false,
    relay2: false,
    relay3: false,
    relay4: false,
  },
  reducers: {
    updateDeviceState: (state, action) => {
        state.relay1 = action.payload.relay1;
        state.relay2 = action.payload.relay2;
        state.relay3 = action.payload.relay3;
        state.relay4 = action.payload.relay4;
        }

  },
})

// Action creators are generated for each case reducer function
export const { updateDeviceState } = deviceSlice.actions

export default deviceSlice.reducer