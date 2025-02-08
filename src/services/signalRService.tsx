import { useEffect, useState, useRef } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { updateDeviceState } from "../App/DeviceSlice";
import { updateTemperatureState, updateCo2ConcentrationState } from "../App/SensorSlice";
import axios from "axios";
import { base_url } from "../App/Constants";

export interface DatabaseChangeMessage {
  entity: string;
  data: any;
}

export const useSignalRService = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState<boolean>(false); 
  const connectionRef = useRef<HubConnection | null>(null); 
  const [hasFetchedInitialState, setHasFetchedInitialState] = useState(false); // To track if we've already fetched device state

  const startConnection = async () => {
    if (connectionRef.current) {
      return; 
    }

    try {
      const connectionUrl = base_url + "/deviceHub";
      const newConnection = new HubConnectionBuilder()
        .withUrl(connectionUrl)
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            if (retryContext.previousRetryCount < 30) {
              return 1000 * Math.pow(2, retryContext.previousRetryCount); // Exponential backoff
            } else {
              return 15000; 
            }
          },
        })
        .build();

      newConnection.on("DeviceUpdated", (message: DatabaseChangeMessage) => {
        console.log("Received message:", message);
        dispatch(updateDeviceState(message));
      });

      newConnection.on("Temperature/Humidity", (message: any) => {
        console.log("Received temp message:", message);
        dispatch(updateTemperatureState(message));
      });
      
      newConnection.on("CO2Concentration", (message: any) => {
        console.log("Received CO2 message:", message);
        dispatch(updateCo2ConcentrationState(message));
      });
      
      newConnection.onclose((error) => {
        console.log("Connection closed:", error);
        setIsConnected(false);
        connectionRef.current = null;
      });

      newConnection.onreconnected((connectionId) => {
        console.log("Reconnected with connection ID:", connectionId);
        setIsConnected(true);
        connectionRef.current = newConnection;
      });

      newConnection.onreconnecting((error) => {
        console.warn("Reconnecting due to error:", error);
      });

      await newConnection.start();
      connectionRef.current = newConnection;
      setIsConnected(true);

      // Fetch the initial device state only once
      if (!hasFetchedInitialState) {
        const deviceState = await axios.get(base_url + "/getDeviceState");
        dispatch(updateDeviceState(deviceState.data));
        setHasFetchedInitialState(true);  // Mark initial state as fetched
      }

    } catch (error) {
      console.error("Error starting connection:", error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (!connectionRef.current || connectionRef.current.state !== "Connected") {
      console.log("SignalR connection is not connected, trying to start...");
      startConnection();
    }

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, []);

  return { isConnected, connection: connectionRef.current };
};
