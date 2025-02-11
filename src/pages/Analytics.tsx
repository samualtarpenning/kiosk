import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HalfCircleProgressBar from "../components/TimerProgress";
import TempChartDaily from "../components/TempChart.Daily";
import HumidityChartDaily from "../components/HumidityChart.Daily";
import { base_url } from "../App/Constants";
import { DailyTemperatureReading } from "../Models/dailyTemperature";
import moment from "moment";
import DailyTemperatureReport from "../components/DailyTemperatureReport";
const reportTypes = ["Temperature", "Humidity"];

const Analytics: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* <IonCard>
          <IonList>
            <IonItem>
              <IonSelect label="Default label" placeholder="Favorite Fruit">
                <IonSelectOption value="apple">Apple</IonSelectOption>
                <IonSelectOption value="banana">Banana</IonSelectOption>
                <IonSelectOption value="orange">Orange</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
        </IonCard> */}
        <DailyTemperatureReport />
      </IonContent>
    </IonPage>
  );
};

export default Analytics;
