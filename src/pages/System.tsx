import {
  IonButton,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import "./System.css";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignalRService } from "../services/signalRService";
import Loader from "../components/Loader";

const System: React.FC = () => {
  const device = useSelector((state: any) => state.device);
  const { connection } = useSignalRService();
  const [systemData, setSystemData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getSystemData();
  }, []);
  const getSystemData = async () => {
    console.log("Getting System Data");
    const system_data = await axios.get("http://192.168.12.156:8080/");
    if (system_data.status === 200) {
      setSystemData(system_data.data);
      setLoading(false);
    } else {
      console.log("Error fetching system data");
    }
  };

  const converCelciusToFahrenheit = (celcius: number) => {
    // round to 2 decimal places
    return Math.round(((celcius * 9) / 5 + 32) * 100) / 100;
  };
  useIonViewWillEnter(() => {
    setLoading(true);
    getSystemData();
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>System Information</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        {loading ? (
          <Loader />
        ) : (
          <>
            <IonGrid className="system-grid">
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonItem>
                      <p className="header">System </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>CPU Usage: {systemData.cpu_usage}%</b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>
                          CPU Temperature:{" "}
                          {converCelciusToFahrenheit(
                            systemData.cpu_temperature
                          )}{" "}
                          °F
                        </b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>Memory Usage: {systemData.memory_usage}%</b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <b>
                        <p className="system-metric">
                          Sever Connected:{" "}
                          {connection?.state === "Connected" ? (
                            <span style={{ color: "green" }}>Yes</span>
                          ) : (
                            <span style={{ color: "red" }}>No</span>
                          )}
                        </p>
                      </b>
                    </IonItem>
                    <IonItem>
                      <b>
                        <p className="system-metric">
                          Uptime: {systemData.system_uptime}
                        </p>
                      </b>
                    </IonItem>
                  </IonList>
                </IonCol>
                <IonCol>
                  <IonList>
                    <IonItem>
                      <p className="header">Disk Usage</p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>Total: {systemData.disk_usage.total} GB</b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>Available: {systemData.disk_usage.free} GB</b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>Used: {systemData.disk_usage.used} GB</b>
                      </p>
                    </IonItem>{" "}
                    <IonItem>
                      <p className="system-metric">
                        <b>Percent: {systemData.disk_usage.percent} %</b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>OS: {systemData.system_info.os}</b>
                      </p>
                    </IonItem>
                  </IonList>
                </IonCol>
                <IonCol>
                  <IonList>
                    <IonItem>
                      <p className="header">Network</p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>
                          Bytes Recieved: {systemData.network_usage.bytes_recv}
                        </b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>Bytes Sent: {systemData.network_usage.bytes_sent}</b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>
                          Packets Recieved:{" "}
                          {systemData.network_usage.packets_recv}
                        </b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>
                          Packets Sent: {systemData.network_usage.packets_sent}
                        </b>
                      </p>
                    </IonItem>
                    <IonItem>
                      <p className="system-metric">
                        <b>Hostname: {systemData.system_info.hostname}</b>
                      </p>
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default System;
