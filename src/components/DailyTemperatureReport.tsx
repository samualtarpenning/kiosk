import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonList,
  IonSelect,
  IonSelectOption,
  IonIcon,
  useIonViewDidEnter,
} from "@ionic/react";
import "./index.css"; // Custom CSS for table styling
import moment from "moment";
import axios from "axios";
import { base_url } from "../App/Constants";
import { chevronBack, chevronForward } from "ionicons/icons";
import TempChartDaily from "./TempChart.Daily";
import { DailyTemperatureReading } from "../Models/dailyTemperature";
import HumidityChartDaily from "./HumidityChart.Daily";
const DailyTemperatureReport = (props: any) => {
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [queryDate, setQueryDate] = useState("");
  const [drillDownReportType, setDrillDownReportType] = useState("Temperature");
  const getTotalPages = async () => {
    const res = await axios.get(`${base_url}/getTotalPages`); // Total number of page
    console.log(res.data);
    setTotalPages(res.data);
  };
  const getDailyTemperatureData = async () => {
    const res = await axios.post(`${base_url}/getTemperatureReadings`, {
      pageNumber: currentPage,
    });
    setData(res.data.reverse());
  };
  useEffect(() => {
    getTotalPages();
    getDailyTemperatureData();
  }, [currentPage]);

  useIonViewDidEnter(() => {
    getDailyTemperatureData();
  }, [currentPage]);

  // Handlers for the pagination buttons
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <>
      {" "}
      {!props.showDrillDown ? (
        <IonCard>
          <IonGrid className="data-table">
            {/* Table Header */}
            <IonRow className="table-header">
              <IonCol size="1.7" className="table-cell">
                <IonLabel>Date</IonLabel>
              </IonCol>
              <IonCol size="1.7" className="table-cell">
                <IonLabel>Avg. Temperature</IonLabel>
              </IonCol>
              <IonCol size="1.7" className="table-cell">
                <IonLabel>Avg. Humidity</IonLabel>
              </IonCol>
              <IonCol size="1.7" className="table-cell">
                <IonLabel>Max Temperature</IonLabel>
              </IonCol>
              <IonCol size="1.7" className="table-cell">
                <IonLabel>Min Temperature</IonLabel>
              </IonCol>
              <IonCol size="1.7" className="table-cell">
                <IonLabel>Max Humidity</IonLabel>
              </IonCol>
              <IonCol size="1.7" className="table-cell">
                <IonLabel>Min Humidity</IonLabel>
              </IonCol>
            </IonRow>

            {/* Table Data */}
            {data.map((row: DailyTemperatureReading) => (
              <IonRow
                key={row.date}
                className="table-row"
                onClick={() => {
                  props.setShowDrillDown(true);
                  setQueryDate(row.date);
                }}
              >
                <IonCol size="1.7" className="table-cell">
                  <IonLabel>{moment(row.date).format("MM/DD/YYYY")}</IonLabel>
                </IonCol>
                <IonCol size="1.7" className="table-cell">
                  <IonLabel
                    style={
                      row.avgTemperature > 80 || row.avgTemperature < 65
                        ? { color: "red" }
                        : {}
                    }
                  >
                    {
                      // Display average temperature in Fahrenheit on decimal places
                      row.avgTemperature.toFixed(2) + " °F"
                    }
                  </IonLabel>
                </IonCol>
                <IonCol size="1.7" className="table-cell">
                  <IonLabel   style={
                      row.avgHumidity > 45 || row.avgHumidity < 80
                        ? { color: "red" }
                        : {}
                    }>{row.avgHumidity.toFixed(2) + "%"}</IonLabel>
                </IonCol>
                <IonCol size="1.7" className="table-cell">
                  <IonLabel>{row.maxTemperature.toFixed(2) + " °F"}</IonLabel>
                </IonCol>
                <IonCol size="1.7" className="table-cell">
                  <IonLabel>{row.minTemperature.toFixed(2) + " °F"}</IonLabel>
                </IonCol>
                <IonCol size="1.7" className="table-cell">
                  <IonLabel>{row.maxHumidity.toFixed(2) + "%"}</IonLabel>
                </IonCol>
                <IonCol size="1.7" className="table-cell">
                  <IonLabel>{row.minHumidity.toFixed(2) + "%"}</IonLabel>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
          <div className="pagination-container">
            {" "}
            {/* <IonButton
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </IonButton>
     
              <IonButton
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </IonButton> */}
            <IonIcon
              className="pagination-icon"
              icon={chevronBack}
              onClick={goToPreviousPage}
            />
            <IonIcon
              className="pagination-icon"
              icon={chevronForward}
              onClick={goToNextPage}
            />
          </div>
        </IonCard>
      ) : (
        <IonCard>
          {props.drillDownReportType === "Temperature" ? (
            <TempChartDaily date={queryDate} />
          ) : (
            <HumidityChartDaily date={queryDate} />
          )}
        </IonCard>
      )}
    </>
  );
};

export default DailyTemperatureReport;
