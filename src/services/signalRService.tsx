import { useEffect, useState, useRef } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { updateDeviceState } from "../App/DeviceSlice";
import {
  updateTemperatureState,
  updateCo2ConcentrationState,
} from "../App/SensorSlice";
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
  const [hasFetchedInitialState, setHasFetchedInitialState] = useState(false);
  const reconnectIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startConnection = async () => {
    if (connectionRef.current || isConnected) return;

    try {
      const connectionUrl = base_url + "/deviceHub";
      const newConnection = new HubConnectionBuilder()
        .withUrl(connectionUrl)
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            if (retryContext.previousRetryCount < 30) {
              return 1000 * Math.pow(2, retryContext.previousRetryCount);
            } else {
              return 15000;
            }
          },
        })
        .build();

      newConnection.on("DeviceUpdated", (message: DatabaseChangeMessage) => {
        dispatch(updateDeviceState(message));
      });

      newConnection.on("Temperature/Humidity", (message: any) => {
        dispatch(updateTemperatureState(message));
      });

      newConnection.on("CO2Concentration", (message: any) => {
        dispatch(updateCo2ConcentrationState(message));
      });

      newConnection.onclose(() => {
        setIsConnected(false);
        connectionRef.current = null;
        startReconnectInterval(); // restart reconnect loop
      });

      newConnection.onreconnected((connectionId) => {
        console.log("Reconnected with connection ID:", connectionId);
        setIsConnected(true);
        connectionRef.current = newConnection;
        stopReconnectInterval(); // stop reconnect loop
      });

      newConnection.onreconnecting((error) => {
        console.warn("Reconnecting due to error:", error);
      });

      await newConnection.start();
      connectionRef.current = newConnection;
      setIsConnected(true);
      stopReconnectInterval(); // successful connect = stop retrying

      if (!hasFetchedInitialState) {
        const deviceState = await axios.get(base_url + "/getDeviceState");
        dispatch(updateDeviceState(deviceState.data));
        setHasFetchedInitialState(true);
      }
    } catch (error) {
      console.error("Error starting connection:", error);
      setIsConnected(false);
      startReconnectInterval(); // trigger retry if failed
    }
  };

  const startReconnectInterval = () => {
    if (reconnectIntervalRef.current !== null) return;

    reconnectIntervalRef.current = setInterval(() => {
      if (!isConnected && !connectionRef.current) {
        console.log("🔁 Attempting to reconnect to SignalR...");
        startConnection();
      }
    }, 30000); // every 30 seconds
  };

  const stopReconnectInterval = () => {
    if (reconnectIntervalRef.current) {
      clearInterval(reconnectIntervalRef.current);
      reconnectIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
      stopReconnectInterval();
    };
  }, []);

  // Optional: 12-hour cleanup
  useEffect(() => {
    const msIn12Hours = 1000 * 60 * 60 * 12;

    const intervalId = setInterval(() => {
      console.log("⏱ Performing 12-hour cleanup...");

      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
        localStorage.setItem("lastCleanup", new Date().toString());
      }

      startConnection();
    }, msIn12Hours);

    return () => clearInterval(intervalId);
  }, []);

  return { isConnected, connection: connectionRef.current };
};
