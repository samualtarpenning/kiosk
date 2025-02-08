import GaugeComponent from "react-gauge-component";

export interface TemperatureGaugeProps {
  temperature: number;
}

export const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({
  temperature,
}) => {
  return (
    <GaugeComponent
    type="semicircle"
    arc={{
      padding: 0.01, // Adjust padding for a smaller gauge
      cornerRadius: 1,
      subArcs: [
        {
          limit: 68,
          color: "#EA4228", // Too low temperature
          showTick: false,
          tooltip: { text: "Too low temperature!" },
        },
        {
          limit: 83,
          color: "#5BE12C", // Good temperature range
          showTick: false,
          tooltip: { text: "Good temperature!" },
        },
        {
          color: "#EA4228", // Good temperature range
          showTick: false,
          tooltip: { text: "Too high temperature!" },
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
        formatTextValue: (value) => value + "ºF", // Display temperature in Fahrenheit
        style: { fill: "black", fontSize: 12 }, // Adjust font size for small card
      },
      tickLabels: {
        type: "outer",
        defaultTickValueConfig: {
          formatTextValue: (value) => value + "ºF",
          style: { fontSize: 10, fill: "black" },
        },
        ticks: [
         
        ],
      },
    }}
    value={temperature}
    minValue={60} // Adjust min value for the small card
    maxValue={90} // Adjust max value for the small card
  />
  
  );
};
