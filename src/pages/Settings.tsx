import {
  IonBadge,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ISettings } from "../Models/settings";
import axios from "axios";
import { base_url } from "../App/Constants";
import { updateLogState } from "../App/LogSlice";
import HalfCircleProgressBar from "../components/TimerProgress";

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const device = useSelector((state: any) => state.device);
  const [present] = useIonToast();
  const [settings, setSettings] = useState<ISettings>({
    id: "",
    shouldStop: 1,
    lightOnTime: 0,
    lightOffTime: 0,
    lightShouldStop: 1,
    pumpOnTime: 0,
    pumpOffTime: 0,
    pumpShouldStop: 1,
    fanOnTime: 0,
    fanOffTime: 0,
    fanShouldStop: 1,
    exhaustOnTime: 0,
    exhaustOffTime: 0,
    exhaustShouldStop: 1,
  });
  const getSettings = async () => {
    const response = await axios.get(base_url + "/settings");
    console.log(response.data);
    setSettings(response.data);
  };

  const updateSettings = async (settings: ISettings) => {
    await axios.post(base_url + "/updateSettings", {
      shouldStop: settings.shouldStop,
      lightOnTime: settings.lightOnTime,
      lightOffTime: settings.lightOffTime,
      lightShouldStop: settings.lightShouldStop,
      pumpOnTime: settings.pumpOnTime,
      pumpOffTime: settings.pumpOffTime,
      pumpShouldStop: settings.pumpShouldStop,
      fanOnTime: settings.fanOnTime,
      fanOffTime: settings.fanOffTime,
      fanShouldStop: settings.fanShouldStop,
      exhaustOnTime: settings.exhaustOnTime,
      exhaustOffTime: settings.exhaustOffTime,
      exhaustShouldStop: settings.exhaustShouldStop,
    });
  };

  const startTimer = async (endpoint: string) => {
    switch (endpoint) {
      case "pump":
        await axios.post(base_url + "/updateSettings", {
          ...settings,
          pumpShouldStop: 0,
        });
        await axios.get(base_url + "/startPumpTimers");

        setSettings({ ...settings, pumpShouldStop: 0 });
        axios.get(base_url + "/relay1On");
        setTimeout(() => {
          axios.get(base_url + "/relay1Off");
        }, settings.pumpOnTime);
        break;
      case "light":
        await axios.post(base_url + "/updateSettings", {
          ...settings,
          id: "661c668df067539a582ee9be",
          lightShouldStop: 0,
        });
        await axios.get(base_url + "/startLightTimers");
        setSettings({ ...settings, lightShouldStop: 0 });
        axios.get(base_url + "/relay3On");
        setTimeout(() => {
          axios.get(base_url + "/relay3Off");
        }, settings.lightOnTime);
        break;
      case "fan":
        await axios.post(base_url + "/updateSettings", {
          ...settings,
          id: "661c668df067539a582ee9be",
          fanShouldStop: 0,
        });
        await axios.get(base_url + "/startFanTimers");
        setTimeout(() => {
          axios.get(base_url + "/relay2Off");
        }, settings.fanOnTime);
        setSettings({ ...settings, fanShouldStop: 0 });
        axios.get(base_url + "/relay2On");
        break;
      case "exhaust":
        await axios.post(base_url + "/updateSettings", {
          ...settings,
          id: "661c668df067539a582ee9be",
          exhaustShouldStop: 0,
        });
        await axios.get(base_url + "/startExhaustTimers");
        setTimeout(() => {
          axios.get(base_url + "/relay4Off");
        }, settings.exhaustOffTime);
        setSettings({ ...settings, exhaustShouldStop: 0 });
        axios.get(base_url + "/relay4On");
        break;
    }
  };

  const stopTimer = async (endpoint: string) => {
    switch (endpoint) {
      case "pump":
        axios.get(base_url + "/relay1Off");
        setSettings({ ...settings, pumpShouldStop: 1 });
        await axios.post(base_url + "/updateSettings", {
          ...settings,
          pumpShouldStop: 1,
        });
        axios.get(base_url + "/relay1Off");
        setSettings({ ...settings, pumpShouldStop: 1 });
        break;
      case "light":
        await axios.post(base_url + "/updateSettings", {
          ...settings,
          lightShouldStop: 1,
        });
        axios.get(base_url + "/relay3Off");
        setSettings({ ...settings, lightShouldStop: 1 });
        break;
      case "fan":
        await axios.post(base_url + "/updateSettings", {
          ...settings,
          id: "661c668df067539a582ee9be",
          fanShouldStop: 1,
        });
        setSettings({ ...settings, fanShouldStop: 1 });
        axios.get(base_url + "/relay2Off");
        break;
      case "exhaust":
        await axios.post(base_url + "/updateSettings", {
          ...settings,
          exhaustShouldStop: 1,
        });
        axios.get(base_url + "/relay4Off");
        setSettings({ ...settings, exhaustShouldStop: 1 });
        break;
    }
  };
  useEffect(() => {
    getSettings();
    console.log(device);
  }, []); 

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>
        <IonGrid>
          <IonRow
            style={{
              margin: "auto",
            }}
          >
            <IonCol>
              <IonCard
                style={{
                  width: "100%",
                  height: "94%",
                  margin: "auto",
                }}
              >
                <IonRow>
                  <IonCol size="6">
                    <IonItem>
                      <IonLabel  style={{fontSize: "14px"}} >Status</IonLabel>
                      <IonBadge
                        className="status-badge"
                        color={device.relay1 ? "success" : "warning"}
                      >
                        {device.relay1 ? "Active" : "Inactive"}
                      </IonBadge>
                    </IonItem>

                    <IonItem>
                      <IonSelect
                        label="Pump On"
                        onIonChange={(e) => {
                          console.log(e.detail.value);
                          setSettings({
                            ...settings,
                            pumpOnTime: e.detail.value,
                          });
                          updateSettings({
                            ...settings,
                            pumpOnTime: e.detail.value,
                          });
                          present({
                            message: "Pump Off Timer Updated",
                            duration: 1500,
                            position: "top",
                          });
                          dispatch(updateLogState("Pump Off Timer Updated"));
                        }}
                        style={{fontSize: "14px"}}  
                        value={settings?.pumpOnTime}
                        placeholder="Select One"
                        interfaceOptions={{
                          cssClass: "my-custom-class", // Add a custom CSS class
                        }}
                      >
                        <IonSelectOption value={0}>Off</IonSelectOption>
                        <IonSelectOption value={10000}>
                          10 Seconds
                        </IonSelectOption>
                        <IonSelectOption value={900000}>15 Min</IonSelectOption>
                        <IonSelectOption value={1.8 * 10 ** 6}>
                          30 min
                        </IonSelectOption>
                        <IonSelectOption value={3.6 * 10 ** 6}>
                          1 hour
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonSelect
                        label="Pump Off"
                        style={{fontSize: "14px"}}  
                        onIonChange={(e) => {
                          console.log(e.detail.value);
                          setSettings({
                            ...settings,
                            pumpOffTime: e.detail.value,
                          });
                          updateSettings({
                            ...settings,
                            pumpOffTime: e.detail.value,
                          });
                          present({
                            message: "Pump Off Timer Updated",
                            duration: 1500,
                            position: "top",
                          });
                          dispatch(updateLogState("Pump Off Timer Updated"));
                        }}
                        value={settings?.pumpOffTime}
                        placeholder="Select One"
                        interfaceOptions={{
                          cssClass: "my-custom-class", // Add a custom CSS class
                        }}
                      >
                        <IonSelectOption value={0}>Off</IonSelectOption>
                        <IonSelectOption value={10001}>
                          10 Seconds
                        </IonSelectOption>
                        <IonSelectOption value={900000}>15 Min</IonSelectOption>
                        <IonSelectOption value={1.8 * 10 ** 6}>
                          30 min
                        </IonSelectOption>
                        <IonSelectOption value={3.6 * 10 ** 6}>
                          1 hour
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      {!settings?.pumpShouldStop ? (
                        <IonButton
                          expand="block"
                          color="danger"
                          onClick={() => stopTimer("pump")}
                        >
                          Stop
                        </IonButton>
                      ) : (
                        <IonButton
                          expand="block"
                          color="success"
                          onClick={() => startTimer("pump")}
                        >
                          Start
                        </IonButton>
                      )}
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <div style={{ marginTop: "-5px" }}>
                      <HalfCircleProgressBar
                        duration={
                          device.relay1
                            ? settings.pumpOnTime
                            : settings.pumpOffTime
                        }
                        shouldStop={settings.pumpShouldStop}
                        status={device.relay1}
                      />
                    </div>
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard
                style={{
                  width: "100%",
                  height: "94%",
                  margin: "auto",
                }}
              >
                <IonRow>
                  <IonCol size="6">
                    <IonItem>
                      <IonLabel  style={{fontSize: "14px"}} >Status</IonLabel>
                      <IonBadge
                        className="status-badge"
                        color={device.relay3 ? "success" : "warning"}
                      >
                        {device.relay3 ? "Active" : "Inactive"}
                      </IonBadge>
                    </IonItem>
                    <IonItem>
                      <IonSelect
                        label="Light On"
                        style={{fontSize: "14px"}}  
                        onIonChange={(e) => {
                          console.log(e.detail.value);
                          setSettings({
                            ...settings,
                            lightOnTime: e.detail.value,
                          });
                          updateSettings({
                            ...settings,
                            lightOnTime: e.detail.value,
                          });
                          present({
                            message: "Light On Time Updated",
                            duration: 1500,
                            position: "top",
                          });
                          dispatch(updateLogState("Light On Timer Updated"));
                        }}
                        value={settings?.lightOnTime}
                        placeholder="Select One"
                      >
                        <IonSelectOption value={0}>Off</IonSelectOption>
                        <IonSelectOption value={1.44 * 10 ** 7}>
                          4 Hours
                        </IonSelectOption>
                        <IonSelectOption value={2.16 * 10 ** 7}>
                          6 Hours
                        </IonSelectOption>
                        <IonSelectOption value={2.88 * 10 ** 7}>
                          8 Hours
                        </IonSelectOption>
                        <IonSelectOption value={3.6 * 10 ** 7}>
                          10 Hours
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonSelect
                        label="Light Off"
                        style={{fontSize: "14px"}}
                        onIonChange={(e) => {
                          console.log(e.detail.value);
                          setSettings({
                            ...settings,
                            lightOffTime: e.detail.value,
                          });
                          updateSettings({
                            ...settings,
                            lightOffTime: e.detail.value,
                          });
                          present({
                            message: "Light Off Time Updated",
                            duration: 1500,
                            position: "top",
                          });
                        }}
                        value={settings?.lightOffTime}
                        placeholder="Select One"
                      >
                        <IonSelectOption value={0}>Off</IonSelectOption>
                        <IonSelectOption value={1.44 * 10 ** 7 + 1}>
                          4 Hours
                        </IonSelectOption>
                        <IonSelectOption value={2.16 * 10 ** 7 + 1}>
                          6 Hours
                        </IonSelectOption>
                        <IonSelectOption value={2.88 * 10 ** 7 + 1}>
                          8 Hours
                        </IonSelectOption>
                        <IonSelectOption value={3.6 * 10 ** 7 + 1}>
                          10 Hours
                        </IonSelectOption>
                      </IonSelect>
                    </IonItem>

                    <IonItem
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {!settings?.lightShouldStop ? (
                        <IonButton
                          color="danger"
                          className="cycle-button-stop"
                          slot="start"
                          onClick={() => stopTimer("light")}
                        >
                          Stop
                        </IonButton>
                      ) : (
                        <IonButton
                          color="success"
                          className="cycle-button-start"
                          slot="start"
                          onClick={() => startTimer("light")}
                        >
                          Start
                        </IonButton>
                      )}
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <div style={{ marginTop: "-5px" }}>
                      <HalfCircleProgressBar
                        duration={
                          device.relay3
                            ? settings.lightOnTime
                            : settings.lightOffTime
                        }
                        shouldStop={settings.lightShouldStop}
                        status={device.relay3}
                      />
                    </div>
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard
                style={{
                  width: "100%",
                  height: "95%",
                  margin: "auto",
                  marginTop: "-10px",
                }}
              >
                <IonRow>
                  <IonCol size="6">
                    <IonList>
                      <IonItem>
                        <IonLabel  style={{fontSize: "14px"}} >Status</IonLabel>
                        <IonBadge
                          className="status-badge"
                          color={device.relay2 ? "success" : "warning"}
                        >
                          {device.relay2 ? "Active" : "Inactive"}
                        </IonBadge>
                      </IonItem>
                      <IonItem>
                        <IonSelect
                         style={{fontSize: "14px"}}  
                          label="Fan On"
                          onIonChange={(e) => {
                            setSettings({
                              ...settings,
                              fanOnTime: e.detail.value,
                            });
                            updateSettings({
                              ...settings,
                              fanOnTime: e.detail.value,
                            });
                            present({
                              message: "Fan On Time Updated",
                              duration: 1500,
                              position: "top",
                            });
                          }}
                          value={settings?.fanOnTime}
                          placeholder="Select One"
                        >
                          <IonSelectOption value={0}>Off</IonSelectOption>
                          <IonSelectOption value={15003}>
                            15 Seconds
                          </IonSelectOption>
                          <IonSelectOption value={900000}>
                            15 Min
                          </IonSelectOption>
                          <IonSelectOption value={1.8 * 10 ** 6}>
                            30 min
                          </IonSelectOption>
                          <IonSelectOption value={3.6 * 10 ** 6}>
                            1 hour
                          </IonSelectOption>
                        </IonSelect>
                      </IonItem>
                      <IonItem>
                        <IonSelect
                          label="Fan Off"
                          style={{fontSize: "14px"}}  
                          onIonChange={(e) => {
                            console.log(e.detail.value);
                            setSettings({
                              ...settings,
                              fanOffTime: e.detail.value,
                            });
                            updateSettings({
                              ...settings,
                              fanOffTime: e.detail.value,
                            });
                            present({
                              message: "Fan Off Time Updated",
                              duration: 1500,
                              position: "top",
                            });
                          }}
                          value={settings?.fanOffTime}
                          placeholder="Select One"
                        >
                          <IonSelectOption value={0}>Off</IonSelectOption>
                          <IonSelectOption value={10001}>
                            10 Seconds
                          </IonSelectOption>
                          <IonSelectOption value={900001}>
                            15 Min
                          </IonSelectOption>
                          <IonSelectOption value={1.8 * 10 ** 6 + 1}>
                            30 min
                          </IonSelectOption>
                          <IonSelectOption value={3.6 * 10 ** 6 + 1}>
                            1 hour
                          </IonSelectOption>
                        </IonSelect>
                      </IonItem>

                      <IonItem
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {!settings?.fanShouldStop ? (
                          <IonButton
                            color="danger"
                            className="cycle-button-stop"
                            slot="start"
                            onClick={() => stopTimer("fan")}
                          >
                            Stop
                          </IonButton>
                        ) : (
                          <IonButton
                            color="success"
                            className="cycle-button-start"
                            slot="start"
                            onClick={() => startTimer("fan")}
                          >
                            Start
                          </IonButton>
                        )}
                      </IonItem>
                    </IonList>
                  </IonCol>
                  <IonCol size="6">
                    <div style={{ marginTop: "-5px" }}>
                    <div style={{ marginTop: "-5px" }}>
                      <HalfCircleProgressBar
                        duration={
                          device.relay2
                            ? settings.fanOnTime
                            : settings.fanOffTime
                        }
                        shouldStop={settings.fanShouldStop}
                        status={device.relay2}
                      />
                    </div>
                    </div>
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard
                style={{
                  width: "100%",
                  height: "96%",
                  margin: "auto",
                  marginTop: "-10px",
                }}
              >
                <IonRow>
                  <IonCol size="6">
                    <IonList>
                      <IonItem>
                        <IonLabel  style={{fontSize: "14px"}} >Status</IonLabel>
                        <IonBadge
                          className="status-badge"
                          color={device.relay4 ? "success" : "warning"}
                        >
                          {device.relay4 ? "Active" : "Inactive"}
                        </IonBadge>
                      </IonItem>
                      <IonItem>
                        <IonSelect
                         style={{fontSize: "14px"}}  
                          label="Outflow On"
                          onIonChange={(e) => {
                            console.log(e.detail.value);
                            setSettings({
                              ...settings,
                              exhaustOnTime: e.detail.value,
                            });
                            updateSettings({
                              ...settings,
                              exhaustOnTime: e.detail.value,
                            });
                            present({
                              message: "Exhaust On Time Updated",
                              duration: 1500,
                              position: "top",
                            });
                          }}
                          value={settings?.exhaustOnTime}
                          placeholder="Select One"
                        >
                          <IonSelectOption value={0}>Off</IonSelectOption>
                          <IonSelectOption value={15003}>
                            15 Seconds
                          </IonSelectOption>
                          <IonSelectOption value={900001}>
                            15 Min
                          </IonSelectOption>
                          <IonSelectOption value={1800001}>
                            30 min
                          </IonSelectOption>
                          <IonSelectOption value={3600002}>
                            1 hour
                          </IonSelectOption>
                        </IonSelect>
                      </IonItem>
                      <IonItem>
                        <IonSelect
                          label="Outflow Off"
                          style={{fontSize: "14px"}}  
                          onIonChange={(e) => {
                            console.log(e.detail.value);
                            setSettings({
                              ...settings,
                              exhaustOffTime: e.detail.value,
                            });
                            updateSettings({
                              ...settings,
                              exhaustOffTime: e.detail.value,
                            });
                            present({
                              message: "Exhaust Off Time Updated",
                              duration: 1500,
                              position: "top",
                            });
                          }}
                          value={settings?.exhaustOffTime}
                          placeholder="Select One"
                        >
                          <IonSelectOption value={0}>Off</IonSelectOption>
                          <IonSelectOption value={15003}>
                            15 Seconds
                          </IonSelectOption>
                          <IonSelectOption value={900000}>
                            15 Min
                          </IonSelectOption>
                          <IonSelectOption value={1800000}>
                            30 min
                          </IonSelectOption>
                          <IonSelectOption value={3600000}>
                            1 hour
                          </IonSelectOption>
                        </IonSelect>
                      </IonItem>

                      <IonItem
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {!settings?.exhaustShouldStop ? (
                          <IonButton
                            color="danger"
                            className="cycle-button-stop"
                            slot="start"
                            onClick={() => stopTimer("exhaust")}
                          >
                            Stop
                          </IonButton>
                        ) : (
                          <IonButton
                            color="success"
                            className="cycle-button-start"
                            slot="start"
                            onClick={() => startTimer("exhaust")}
                          >
                            Start
                          </IonButton>
                        )}
                      </IonItem>
                    </IonList>
                  </IonCol>
                  <IonCol size="6">
                    <div style={{ marginTop: "-5px" }}>
                      <HalfCircleProgressBar
                        duration={
                          device.relay4
                            ? settings.exhaustOnTime
                            : settings.exhaustOffTime
                        }
                        shouldStop={settings.exhaustShouldStop}
                        status={device.relay4}
                      />
                    </div>
                  </IonCol>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
