import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import axios from "axios";
import "./Home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignalRService } from "../services/signalRService";
import { base_url } from "../App/Constants";
import {
  updateCo2ConcentrationState,
  updateTemperatureState,
} from "../App/SensorSlice";
import { TemperatureGauge } from "../components/TemperatureGauge";
import { HumidityGauge } from "../components/HumdityGauge";
import { Co2ConcentrationGauge } from "../components/Co2ConcentrationGauge";
import { PhBalanceGauge } from "../components/PhBalanceGauge";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const device = useSelector((state: any) => state.device);
  const temperatureSensor = useSelector((state: any) => state.temperature);
  const co2Concentration = useSelector((state: any) => state.co2);
  const MessageLog = useSelector((state: any) => state.log);
  const [relay1, setRelay1] = useState(device.relay1);
  const [relay2, setRelay2] = useState(device.relay2);
  const [relay3, setRelay3] = useState(device.relay3);
  const [relay4, setRelay4] = useState(device.relay4);

  const toggleRelay1 = () => {
    !device.relay1
      ? axios.get(base_url + "/relay1On")
      : axios.get(base_url + "/relay1Off");
    setRelay1(!relay1);
  };
  const toggleRelay2 = () => {
    !device.relay2
      ? axios.get(base_url + "/relay2On")
      : axios.get(base_url + "/relay2Off");
    setRelay2(!relay2);
  };
  const toggleRelay3 = () => {
    !device.relay3
      ? axios.get(base_url + "/relay3On")
      : axios.get(base_url + "/relay3Off");
    setRelay3(!relay3);
  };
  const toggleRelay4 = () => {
    !device.relay4
      ? axios.get(base_url + "/relay4On")
      : axios.get(base_url + "/relay4Off");
    setRelay4(!relay4);
  };
  const devices = [
    {
      id: 1,
      label: "Pump",
      relay: "relay1",
      status: device.relay1,
      onChange: () => toggleRelay1(),
    },
    {
      id: 2,
      label: "Fan",
      relay: "relay2",
      status: device.relay2,
      onChange: () => toggleRelay2(),
    },
    {
      id: 3,
      label: "Light",
      relay: "relay3",
      status: device.relay3,
      onChange: () => toggleRelay3(),
    },
    {
      id: 4,
      label: "Heater",
      relay: "relay4",
      status: device.relay4,
      onChange: () => toggleRelay4(),
    },
  ];

  const getTemperatureSensorData = async () => {
    const sensorData = await axios.get(base_url + "/getTemperatureData");
    dispatch(updateTemperatureState(sensorData.data));
  };
  const getCo2Concentration = async () => {
    const sensorData = await axios.get(base_url + "/getCo2Concentration");
    dispatch(updateCo2ConcentrationState(sensorData.data));
  };
  useEffect(() => {
    getTemperatureSensorData();
    getCo2Concentration();
    console.log("Getting sensor data", co2Concentration);
  }, []);

  useEffect(() => {
    console.log(MessageLog);
  }, [temperatureSensor]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* {relays.map((relay, index) => (
            <IonCard key={relay.id} style={{ flex: 1, margin: '10px' }}>
              <IonCardHeader>
                <IonCardTitle>{relay.label} <IonChip color={relayStates[index] ? "warning" : "medium"}>{relayStates[index]? "Active" : "Inactive"}</IonChip></IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonToggle style={{
                  marginLeft: "30%"
                }}
                color="secondary"
                labelPlacement="stacked" 
                checked={relayStates[index]} 
                onIonChange={() => toggleRelay(index)}>
                </IonToggle>
              </IonCardContent>
            </IonCard>
          ))} */}

          {/* <IonCard className="status-card" style={{ flex: 1, margin: "10px" }}>
            <IonCardHeader>
              <IonLabel className="card-label">Pump </IonLabel>
              <IonBadge
                className="status-badge"
                color={device.relay1 ? "success" : "warning"}
              >
                {device.relay1 ? "Active" : "Inactive"}
              </IonBadge>
            </IonCardHeader>
            <IonCardContent>
              <label
                style={{
                  marginLeft: "23%",
                }}
                className="container"
              >
                <input
                  type="checkbox"
                  checked={device.relay1}
                  onChange={toggleRelay1}
                />
                <div className="checkmark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 49.548 49.549"
                    xmlSpace="preserve"
                    version="1.1"
                    id="Capa_1"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="M30.203,4.387v4.385c7.653,2.332,13.238,9.451,13.238,17.857c0,10.293-8.373,18.667-18.667,18.667
				S6.106,36.922,6.106,26.629c0-8.405,5.585-15.525,13.238-17.857V4.387C9.323,6.835,1.855,15.866,1.855,26.629
				c0,12.639,10.281,22.92,22.919,22.92s22.92-10.281,22.92-22.92C47.694,15.865,40.224,6.835,30.203,4.387z"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="M24.776,27.225c-1.41,0-2.554-1.145-2.554-2.555V2.554c0-1.41,1.144-2.554,2.554-2.554c1.41,0,2.554,1.144,2.554,2.554
				V24.67C27.33,26.08,26.186,27.225,24.776,27.225z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </label>
            </IonCardContent>
          </IonCard> */}
          {devices.map((device) => (
            <IonCard
              className="status-card"
              style={{ flex: 1, margin: "10px" }}
            >
              <IonCardHeader>
                <IonLabel className="card-label">{device.label} </IonLabel>
                <IonBadge
                  className="status-badge"
                  color={device.status ? "success" : "warning"}
                >
                  {device.status ? "Active" : "Inactive"}
                </IonBadge>
              </IonCardHeader>
              <IonCardContent>
                <label
                  style={{
                    marginLeft: "23%",
                  }}
                  className="container"
                >
                  <input
                    type="checkbox"
                    checked={device.status}
                    onChange={device.onChange}
                  />
                  <div className="checkmark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 49.548 49.549"
                      xmlSpace="preserve"
                      version="1.1"
                      id="Capa_1"
                    >
                      <g>
                        <g>
                          <g>
                            <path
                              d="M30.203,4.387v4.385c7.653,2.332,13.238,9.451,13.238,17.857c0,10.293-8.373,18.667-18.667,18.667
				S6.106,36.922,6.106,26.629c0-8.405,5.585-15.525,13.238-17.857V4.387C9.323,6.835,1.855,15.866,1.855,26.629
				c0,12.639,10.281,22.92,22.919,22.92s22.92-10.281,22.92-22.92C47.694,15.865,40.224,6.835,30.203,4.387z"
                            ></path>
                          </g>
                          <g>
                            <path
                              d="M24.776,27.225c-1.41,0-2.554-1.145-2.554-2.555V2.554c0-1.41,1.144-2.554,2.554-2.554c1.41,0,2.554,1.144,2.554,2.554
				V24.67C27.33,26.08,26.186,27.225,24.776,27.225z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </label>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <IonCard
            className="status-card"
            style={{ flex: 1, margin: "10px", height: "180px" }}
          >
            <IonCardHeader>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "23px",
                  color: "#555",
                  margin: "auto",
                  marginLeft: "14px",
                }}
              >
                🌡️{temperatureSensor.temperature}°F
              </div>
              <TemperatureGauge temperature={temperatureSensor.temperature} />
            </IonCardHeader>
            <IonCardContent></IonCardContent>
          </IonCard>
          <IonCard
            className="status-card"
            style={{ flex: 1, margin: "10px", height: "180px" }}
          >
            <IonCardHeader>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "23px",
                  color: "#555",
                  margin: "auto",
                  marginLeft: "20px",
                }}
              >
                💧 {temperatureSensor.humidity}%
              </div>
              <HumidityGauge humidity={temperatureSensor.humidity} />
            </IonCardHeader>
          </IonCard>
          <IonCard
            className="status-card"
            style={{ flex: 1, margin: "10px", height: "180px" }}
          >
            <IonCardHeader>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "23px",
                  color: "#555",
                  margin: "auto",
                }}
              >
                CO₂: {Math.ceil(co2Concentration.ppm)}ppm
              </div>
              <Co2ConcentrationGauge ppm={Math.ceil(co2Concentration.ppm)} />
            </IonCardHeader>
          </IonCard>
          <IonCard
            className="status-card"
            style={{ flex: 1, margin: "10px", height: "180px" }}
          >
            <IonCardHeader>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "23px",
                  color: "#555",
                  margin: "auto",
                }}
              >
                pH: 7.6
              </div>
              <PhBalanceGauge phLevel={6.5} />
            </IonCardHeader>
          </IonCard>
        </div>
        <div>
          {useSignalRService().isConnected ? (
            <IonChip color="success">Connected</IonChip>
          ) : (
            <IonChip color="danger">Disconnected</IonChip>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
