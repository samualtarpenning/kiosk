import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './CounterSlice'
import deviceReducer from './DeviceSlice'
import logReducer from './LogSlice' 
import {temperatureSensorReducer, co2ConcentrationReducer} from './SensorSlice'
export default configureStore({
  reducer: {
    counter: counterReducer,
    device: deviceReducer,
    log: logReducer,
    temperature: temperatureSensorReducer,
    co2: co2ConcentrationReducer
  }
})