import GaugeComponent from "react-gauge-component";

export interface Co2ConcentrationGaugeProps {
  ppm: number;
}

export const Co2ConcentrationGauge: React.FC<Co2ConcentrationGaugeProps> = ({
  ppm,
}) => {
  return (
    <GaugeComponent
      type="semicircle"
      arc={{
        padding: 0.01, // Adjust padding for a smaller gauge
        cornerRadius: 1,
        subArcs: [
          {
            limit: 520, // Ideal range starts here (Normal Air)
            color: "#5BE12C", // Ideal CO2 level
            showTick: false,
            tooltip: { text: "Normal Air" },
          },
          {
            limit: 1000, // Acceptable indoor air quality
            color: "#F5CD19", // Elevated CO2 levels
            showTick: false,
            tooltip: { text: "Indoor Air Quality" },
          },
          {
            limit: 2000, // Elevated CO2 levels start
            color: "#F58B19", // High CO2 levels, still manageable
            showTick: false,
            tooltip: { text: "Elevated CO2 Levels" },
          },
          {
            color: "#EA4228", // Hazardous levels
            showTick: false,
            tooltip: { text: "Hazardous CO2 Levels" },
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
          formatTextValue: (value) => value + " ppm", // Display CO2 concentration in ppm
          style: { fill: "black", fontSize: 12 }, // Adjust font size for small card
        },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: (value) => value + " ppm", // Display tick values as ppm
            style: { fontSize: 10, fill: "black" },
          },
        },
      }}
      value={ppm}
      minValue={0} // Start from 0 ppm
      maxValue={2500} // Maximum ppm value to account for hazardous levels
    />
  );
};
