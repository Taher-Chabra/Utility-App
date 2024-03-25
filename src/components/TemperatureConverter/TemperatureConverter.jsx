import React, { useContext, useEffect, useState } from "react";
import SelectTemperature from "./SelectTemperature";
import useTemperatureInfo from "../../Hooks/useTemperatureInfo";
import { userContext } from "../../contexts/UserContext";

function TemperatureConverter() {
  const [enteredValue, setEnteredValue] = useState();
  const [convertedValue, setConvertedValue] = useState();
  const [from, setFrom] = useState("Celsius");
  const [to, setTo] = useState("Kelvin");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (from === to) setWarning("! Please select different temperature.");
    else if (from !== to && warning !== "") setWarning("");
  }, [to, from]);

  const sign = (temp) => {
    if (temp === "Celsius") return "C";
    else if (temp === "Fahrenheit") return "F";
    else if (temp === "Kelvin") return "K";
  };

  const convert = () => {
    !enteredValue
      ? setWarning("! Please enter the number")
      : setConvertedValue(useTemperatureInfo(enteredValue, from, to));
  };

  const { user } = useContext(userContext);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-neutral-700 dark:text-white text-lg font-medium">
        Hey {user ? user : "user"}, This is the app where you can convert the
        value of temperature in Celsius, Fahrenheit and Kelvin.
      </p>
      <div className="w-4/4 h-auto mt-10 p-5 font-medium bg-green-300 backdrop-blur-lg bg-opacity-60 border-2 rounded-lg border-black dark:border-white">
        <p className="font-bold text-white text-3xl mb-5 text-center">
          Temperature Converter
        </p>
        {warning && (
          <p className="text-red-500 text-lg text-center mb-4">{warning}</p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="flex flex-col gap-y-8"
        >
          <div>
            <label className="pr-4 text-xl font-medium" htmlFor="temperature">
              Enter the Temperature :
            </label>
            <input
              type="number"
              id="temperature"
              placeholder="Your value"
              value={enteredValue}
              onChange={(e) => {
                if (warning) setWarning("")
                setEnteredValue(Number(e.target.value))
              }}
              className="p-1 pl-2 rounded-lg border-2 border-gray-500"
            />
            <span>{`${"\u00B0"}${sign(from)}`}</span>
          </div>
          <div className="flex gap-x-12 justify-center text-lg">
            <div>
              <SelectTemperature
                label="From"
                selectTemperature={from}
                onTemperatureChange={(temp) => setFrom(temp)}
              />
            </div>
            <div>
              <SelectTemperature
                label="To"
                selectTemperature={to}
                onTemperatureChange={(temp) => setTo(temp)}
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 p-1 px-4 text-white text-xl rounded-lg border-2 border-green-700"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </div>
        </form>
        {convertedValue && (
          <div className="mt-4 flex justify-center">
            <p className=" w-fit p-2 text-2xl font-bold text-green-900 bg-white rounded-xl">{`${convertedValue}${"\u00B0"}${sign(
              to
            )}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemperatureConverter;
