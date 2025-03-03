import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import "./Home.css";
import axios from "axios";
import { arrowBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./Analytics.css";
import DailyTemperatureReport from "./DailyTemperatureReport";
import DailyCo2Report from "./DailyCo2Report";
const reportTypes = ["Temperature/Humidity", "CO₂", "pH"];
const drillDownReportTypes = ["Temperature", "Humidity"];
const Analytics: React.FC = () => {
  const [showDrillDown, setShowDrillDown] = useState(false);
  const [reportType, setReportType] = useState("Temperature/Humidity");
  const [drillDownReportType, setDrillDownReportType] = useState("Temperature");

  return (
    <IonPage>
      <IonContent>
        <IonCard className="analytics-card-select">
          <IonList>
            <IonItem>
              {showDrillDown && (
                <div
                  style={{
                    width: 75,
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IonIcon
                    className="custom-item"
                    icon={arrowBack}
                    onClick={() => {
                      setShowDrillDown(false);
                    }}
                  />
                </div>
              )}
              {showDrillDown ? (
                <IonSelect
                  className="custom-select"
                  label="Report Type"
                  placeholder="Select a report type"
                  value={drillDownReportType}
                  onIonChange={(e) => setDrillDownReportType(e.detail.value)}
                >
                  {drillDownReportTypes.map((reportType) => (
                    <IonSelectOption key={reportType} value={reportType}>
                      {reportType}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              ) : (
                <IonSelect
                  className="custom-select"
                  label="Report Type"
                  placeholder="Select a report type"
                  value={reportType}
                  onIonChange={(e) => setReportType(e.detail.value)}
                >
                  {reportTypes.map((reportType) => (
                    <IonSelectOption key={reportType} value={reportType}>
                      {reportType}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              )}
            </IonItem>
          </IonList>
        </IonCard>
        {reportType === "Temperature/Humidity" && !showDrillDown && (
          <DailyTemperatureReport
            showDrillDown={showDrillDown}
            setShowDrillDown={(value: boolean) => setShowDrillDown(value)}
            drillDownReportType={drillDownReportType}
            drillDownReportTypes={drillDownReportTypes}
          />
        )}
        {reportType === "CO₂" && !showDrillDown && (
          <DailyCo2Report
            showDrillDown={showDrillDown}
            setShowDrillDown={(value: boolean) => setShowDrillDown(value)}
            drillDownReportType={drillDownReportType}
            drillDownReportTypes={drillDownReportTypes}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Analytics;
