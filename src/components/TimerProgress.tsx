import React, { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";
import useCountdownTimer from "../utils/timer.hook";

const HalfCircleProgressBar = (props: any) => {
  const { remainingTime } = useCountdownTimer(props.duration, props.shouldStop, props.status);
  // Calculate the completion percentage of the timer
    // Calculate the completion percentage of the timer
    const durationCompleted = useMemo(() => {
      const percentage = (remainingTime / props.duration) * 100;
      return percentage;
    }, [remainingTime, props.duration]);
  
    // Convert remaining time (in milliseconds) to hours, minutes, seconds
    const msToTime = useMemo(() => {
      const seconds = Math.floor((remainingTime / 1000) % 60);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");
  
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }, [remainingTime]);

  // Memoize options to avoid recalculating on every render
  const options: any = useMemo(() => {
    return {
      series: [100],
      chart: {
        height: 450,
        width: 450,
        type: "radialBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.5,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "17%",
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.7,
            },
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -15,
              show: true,
              color: "#888",
              fontSize: "15px",
            },
            value: {
              formatter: function (va: string) {
                return props.shouldStop ? "00:00:00" : msToTime;
              },
              color: "#111",
              fontSize: "19px",
              offsetY: 5,
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#244d9a"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: [
        props.shouldStop
          ? "Timer OFF"
          : props.status
          ? "On Timer"
          : "Off Timer",
      ],
    };
  }, [msToTime, props.status]);

  return (
    <Chart
      options={options}
      series={[!props.shouldStop ? durationCompleted : 0]}
      type="radialBar"
      height={215}
    />
  );
};

export default HalfCircleProgressBar;
