import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import "./Home.css";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HalfCircleProgressBar from "../components/TimerProgress";
import TempChartDaily from "../components/TempChart.Daily";
import HumidityChartDaily from "../components/HumidityChart.Daily";

const reportTypes = ["Temperature", "Humidity"];

const Analytics: React.FC = () => {
  const device = useSelector((state: any) => state.device);
  const [selectedReport, setSelectedReport] = useState(reportTypes[0]);
  return (
    <IonPage>
      {" "}
    
      <IonContent fullscreen>   
        <IonSegment
          value={selectedReport}
          onIonChange={(e: any) => setSelectedReport(e.detail.value)}
          color={"secondary"}
        >
          {reportTypes.map((report) => (
            <IonSegmentButton value={report}>{report}</IonSegmentButton>
          ))}
        </IonSegment>
        <IonCard>
          {selectedReport === "Temperature" && <TempChartDaily />}
          {selectedReport === "Humidity" && <HumidityChartDaily />}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Analytics;
