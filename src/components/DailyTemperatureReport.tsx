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
} from "@ionic/react";
import "./index.css"; // Custom CSS for table styling
import moment from "moment";
import axios from "axios";
import { base_url } from "../App/Constants";
import { set } from "lodash";
import TempChartDaily from "./TempChart.Daily";
const DailyTemperatureReport = (props: any) => {
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [queryDate, setQueryDate] = useState("");
  const [show24HourReport, setShow24HourReport] = useState(false);
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
   <>   {!show24HourReport ? (
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
              {data.map((row: any) => (
                <IonRow key={row.id} className="table-row" onClick={() => {
                    setShow24HourReport(true);
                    setQueryDate(row.date);
                }}>
                  <IonCol size="1.7" className="table-cell">
                    <IonLabel>{moment(row.date).format("MM/DD/YYYY")}</IonLabel>
                  </IonCol>
                  <IonCol size="1.7" className="table-cell">
                    <IonLabel>
                      {
                        // Display average temperature in Fahrenheit on decimal places
                        row.avgTemperature.toFixed(2) + " °F"
                      }
                    </IonLabel>
                  </IonCol>
                  <IonCol size="1.7" className="table-cell">
                    <IonLabel>{row.avgHumidity.toFixed(2) + "%"}</IonLabel>
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
              <IonButton
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </IonButton>
              {/* Display page numbers */}
              {/* {[...Array(totalPages)].map((_, i) => (
              <IonButton
                key={i}
                onClick={() => goToPage(i + 1)}
                color={currentPage === i + 1 ? "primary" : "secondary"}
              >
                {i + 1}
              </IonButton>
            ))} */}
              <IonButton
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </IonButton>
            </div>
          </IonCard>
        ) : (
          <IonCard>
            <IonButton onClick={() => setShow24HourReport(false)}>
              Back
            </IonButton>
            <TempChartDaily date={queryDate} />
          </IonCard>
        )}</>
     
      
  );
};

export default DailyTemperatureReport;
