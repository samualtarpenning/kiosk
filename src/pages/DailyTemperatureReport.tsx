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
  IonModal,
  IonButtons,
} from "@ionic/react";
import "./index.css"; // Custom CSS for table styling
import moment from "moment";
import axios from "axios";
import { base_url } from "../App/Constants";
import { chevronBack, chevronForward } from "ionicons/icons";
import TempChartDaily from "../components/TempChart.Daily";
import { DailyTemperatureReading } from "../Models/dailyTemperature";
import HumidityChartDaily from "../components/HumidityChart.Daily";
const DailyTemperatureReport = (props: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [queryDate, setQueryDate] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("Temperature");
  const drillDownReportTypes = ["Temperature", "Humidity"];
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

            {data.length > 0 ? (
            data.map((row: DailyTemperatureReading) => (
              <IonRow
                key={row.date}
                className="table-row"
                onClick={() => {
                  setIsOpen(true);
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
                  <IonLabel
                    style={
                      row.avgHumidity > 45 || row.avgHumidity < 80
                        ? { color: "red" }
                        : {}
                    }
                  >
                    {row.avgHumidity.toFixed(2) + "%"}
                  </IonLabel>
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
            ))) : (
              <IonRow className="table-row">
                <IonCol size="8" className="table-cell">
                  <IonLabel>No data available</IonLabel>
                </IonCol>
              </IonRow>
            )}
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
           {data.length != 0 && (
              <IonIcon
                className="pagination-icon"
                icon={chevronForward}
                onClick={goToNextPage}
              />
            )}

           
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
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <IonSelect
                className="custom-select"
                style={{
                  paddingTop: "10px",
                }}
                value={selectedReportType}
                onIonChange={(e) => setSelectedReportType(e.detail.value)}
              >
                {drillDownReportTypes.map((reportType: string) => (
                  <IonSelectOption key={reportType} value={reportType}>
                    {reportType}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            {selectedReportType === "Temperature" ? (
              <TempChartDaily date={queryDate} />
            ) : (
              <HumidityChartDaily date={queryDate} />
            )}
          </IonCard>
        </IonContent>
      </IonModal>
    </>
  );
};

export default DailyTemperatureReport;
