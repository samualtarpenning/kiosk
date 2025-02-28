import React from "react";
import GaugeComponent from "react-gauge-component";

export interface HumidityGaugeProps {
  humidity: number;
}

export const HumidityGauge: React.FC<HumidityGaugeProps> = ({ humidity }) => {
  return (
    <GaugeComponent
      type="semicircle" // Set to semicircle for consistency with TemperatureGauge
      arc={{
        padding: 0.01, // Adjust padding for compact design
        cornerRadius: 1,
        subArcs: [
          {
            limit: 30,
            color: "#EA4228", // Too low humidity
            showTick: false,
            tooltip: { text: "Too low humidity!" },
          },
          {
            limit: 70,
            color: "#5BE12C", // Ideal humidity range
            showTick: false,
            tooltip: { text: "Ideal humidity range!" },
          },
          {
            color: "#EA4228", // Too high humidity
            showTick: false,
            tooltip: { text: "Too high humidity!" },
          },
        ],
      }}
      pointer={{
        color: "#345243",
        length: 0.7, // Shorten pointer for compact design
        width: 10, // Reduce pointer width for better fit
      }}
      labels={{
        valueLabel: {
          formatTextValue: (value) => value + "%", // Display humidity as a percentage
          style: { fill: "black", fontSize: 12 }, // Adjust font size for small card
        },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: (value) => value + "%", // Display tick values as percentages
            style: { fontSize: 10, fill: "black" },
          },
        },
      }}
      value={humidity}
      minValue={10} // Adjusted minimum value for better focus on relevant range
      maxValue={80} // Adjusted maximum value for better focus on relevant range
    />
  );
};
