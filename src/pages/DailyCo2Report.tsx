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
import {
  DailyCo2ConcentrationReading,
  DailyTemperatureReading,
} from "../Models/dailyTemperature";
import HumidityChartDaily from "../components/HumidityChart.Daily";
import Co2ChartDaily from "../components/Co2ConcentrationChart.Daily";
const DailyCo2Report = (props: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [queryDate, setQueryDate] = useState("");
  const [drillDownReportType, setDrillDownReportType] =
    useState("DailyCo2Report");

  const getDailyTemperatureData = async () => {
    const res = await axios.post(`${base_url}/getCo2eReadings`, {
      pageNumber: currentPage,
    });
    setData(res.data.reverse());
  };
  useEffect(() => {
    getDailyTemperatureData();
  }, [currentPage]);

  useIonViewDidEnter(() => {
    getDailyTemperatureData();
  }, [currentPage]);

  // Handlers for the pagination buttons
  const goToNextPage = () => {
      setCurrentPage(currentPage + 1);
 
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
                <IonLabel>Avg. PPM</IonLabel>
              </IonCol>

              <IonCol size="1.7" className="table-cell">
                <IonLabel>Max PPM</IonLabel>
              </IonCol>
              <IonCol size="1.7" className="table-cell">
                <IonLabel>Min PPM</IonLabel>
              </IonCol>
            </IonRow>

            {/* Table Data */}
            {data.length > 0 ? (
              data.map((row: DailyCo2ConcentrationReading) => (
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
                    <IonLabel>
                      {
                        // Display average temperature in Fahrenheit on decimal places
                        row.avgPpm.toFixed(2)
                      }
                    </IonLabel>
                  </IonCol>

                  <IonCol size="1.7" className="table-cell">
                    <IonLabel>{row.maxPpm.toFixed(2)}</IonLabel>
                  </IonCol>
                  <IonCol size="1.7" className="table-cell">
                    <IonLabel>{row.minPpm.toFixed(2)}</IonLabel>
                  </IonCol>
                </IonRow>
              ))
            ) : (
              <IonRow className="table-row">
                <IonCol size="8" className="table-cell">
                  <IonLabel>No Data Available</IonLabel>
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
        <>
          {" "}
          <IonCard>
            {props.drillDownReportType === "Temperature" ? (
              <TempChartDaily date={queryDate} />
            ) : (
              <HumidityChartDaily date={queryDate} />
            )}
          </IonCard>
        </>
      )}
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle></IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <Co2ChartDaily date={queryDate} />
          </IonCard>
        </IonContent>
      </IonModal>
    </>
  );
};

export default DailyCo2Report;
