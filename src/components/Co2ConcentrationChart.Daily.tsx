import React, { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";
import useCountdownTimer from "../utils/timer.hook";
import axios from "axios";
import { base_url } from "../App/Constants";
import { has, set } from "lodash";
import moment from "moment";
import { IonCard, useIonViewWillEnter } from "@ionic/react";

const Co2ChartDaily = (props: any) => {
  const [co2Data, setCo2Data] = useState([]);
  const getDailyData = async () => {
    try {
      axios
        .get(base_url + `/getCo2DataLast24Hours?date=${moment(props.date).format("YYYY-MM-DD")}`)
        .then((response) => {
            setCo2Data(response.data);
          console.log(response.data.map((data: any) => data.ppm));
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
          name: "PPM",
          data: co2Data.map((data: any) => data.ppm),
        },
      ],
      xaxis: {
        categories: co2Data.map((data: any) =>
          moment(data.dateTime).format("MM/DD hh:mm a")
        ),
      },
    }),
    [co2Data]
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

export default Co2ChartDaily;
