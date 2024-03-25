import React from "react";

function SelectTemperature({ label, selectTemperature, onTemperatureChange }) {
  const temperature = ["Celsius", "Kelvin", "Fahrenheit"];
  return (
    <div>
      <p className="text-base text-gray-700">{label}:</p>
      <select
        value={selectTemperature}
        onChange={(e) =>
          onTemperatureChange && onTemperatureChange(e.target.value)
        }
        className="p-2"
      >
        {temperature.map((temp) => (
          <option key={temp} value={temp}>
            {temp}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectTemperature;
