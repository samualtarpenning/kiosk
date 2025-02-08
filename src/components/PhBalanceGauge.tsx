import GaugeComponent from "react-gauge-component";

export interface PhBalanceGaugeProps {
  phLevel: number;
}

export const PhBalanceGauge: React.FC<PhBalanceGaugeProps> = ({ phLevel }) => {
  return (
    <GaugeComponent
      type="semicircle"
      arc={{
        padding: 0.01, // Adjust padding for a smaller gauge
        cornerRadius: 1,
        subArcs: [
          {
            limit: 5.5, // Too low pH (Acidic)
            color: "#EA4228", // Red for too low
            showTick: false,
            tooltip: { text: "Too Low pH!" },
          },
          {
            limit: 6.5, // Ideal pH range
            color: "#5BE12C", // Green for ideal pH
            showTick: false,
            tooltip: { text: "Ideal pH!" },
          },
          {
            limit: 7.5, // Ideal pH range
            color: "#F5CD19", // Green for ideal pH
            showTick: false,
            tooltip: { text: "Ideal pH!" },
          },
          {
            color: "#F58B19", // Too high pH (Alkaline)
            showTick: false,
            tooltip: { text: "Too High pH!" },
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
          formatTextValue: (value) => value.toFixed(1), // Display pH level with 1 decimal point
          style: { fill: "black", fontSize: 12 }, // Adjust font size for small card
        },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: (value) => value.toFixed(1), // Display tick values with 1 decimal point
            style: { fontSize: 10, fill: "black" },
          },
        },
      }}
      value={phLevel}
      minValue={0} // Minimum pH value
      maxValue={14} // Maximum pH value (strongly alkaline)
    />
  );
};
