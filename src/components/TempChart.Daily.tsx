import React, { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";
import useCountdownTimer from "../utils/timer.hook";
import axios from "axios";
import { base_url } from "../App/Constants";
import { has, set } from "lodash";
import moment from "moment";
import { IonCard, useIonViewWillEnter } from "@ionic/react";

const TempChartDaily = (props: any) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const getDailyData = async () => {
    try {
      axios
        .get(base_url + `/getTemperatureDataLast24Hours?date=${moment(props.date).format("YYYY-MM-DD")}`)
        .then((response) => {
          setTemperatureData(response.data);
          console.log(response.data.map((data: any) => data.temperature));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useMemo(() => {
    getDailyData();
  }, []);

  useIonViewWillEnter(() => {
    getDailyData();
    }, []);

  const options: any = useMemo(
    () => ({
      chart: {
        type: "area",
        toolbar: {
            
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            size: "100%",
            download: false,
          },
        },
      },

      markers: {
        size: 2,
      },
      series: [
        {
          name: "Temperature",
          data: temperatureData.map((data: any) => data.temperature + "°F"),
        },
      ],
      xaxis: {
        categories: temperatureData.map((data: any) =>
          moment(data.dateTime).format("MM/DD hh:mm a")
        ),
      },
    }),
    [temperatureData]
  );

  return (
    <>
      <Chart
        options={options}
        series={options.series}
        type="area"
        height={355}
      />
    </>
  );
};

export default TempChartDaily;
