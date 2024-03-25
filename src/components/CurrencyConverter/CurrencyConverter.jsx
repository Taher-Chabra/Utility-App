import React, { useContext, useEffect, useState } from "react";
import CurrencyBar from "./CurrencyBar";
import useCurrencyInfo from "../../Hooks/useCurrencyInfo";
import { userContext } from "../../contexts/UserContext";

function CurrencyConverter() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedValue, setConvertedValue] = useState();
  const [warning, setWarning] = useState("");

  const currencyData = useCurrencyInfo(from);

  useEffect(() => {
    if (from === to) setWarning("! Select different currency.");
    else setWarning("");
  }, [to, from]);

  const options = Object.keys(currencyData);

  const swap = () => {
    setTo(from);
    setFrom(to);
    setConvertedValue(amount);
    setAmount(convertedValue);
  };

  const convert = () => {
    if (!amount) {
      setWarning("! Please Enter the amount.");
      return;
    }
    setConvertedValue(amount * currencyData[to]);
  };

  const { user } = useContext(userContext);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-neutral-700 dark:text-white text-lg font-medium">
        Hey {user ? user : "user"}, This is the app where you can see the
        conversion rate of any Currency of your chosing.
      </p>
      <div className="w-2/4 relative mt-10 bg-sky-300 bg-opacity-70 p-5 border-2 border-black dark:border-white rounded-lg">
        <p className="text-center text-3xl font-bold mb-4 text-white">
          Currency Converter
        </p>
        {warning && (
          <div className="text-center text-lg font-medium mb-3">
            <p className="text-red-500">{warning}</p>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="flex flex-col items-center gap-y-4"
        >
          <div>
            <CurrencyBar
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => {
                setAmount(amount);
                amount && from !== to ? setWarning("") : null;
              }}
            />
          </div>
          <div
            className={`text-center absolute top-24 flex items-center justify-center ${
              !warning ? "mt-14" : "mt-24"
            }`}
          >
            <button
              type="button"
              onClick={swap}
              className="bg-blue-500 font-medium text-white py-2 px-5 mt-1.5 rounded-lg "
            >
              Swap
            </button>
          </div>
          <div>
            <CurrencyBar
              label="To"
              amount={convertedValue}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              onAmountChange={(amount) => setAmount(amount)}
              amountDisable
            />
          </div>
          <div className="text-center bg-blue-700 p-2 rounded-lg px-20">
            <button type="submit" className="text-white font-medium text-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CurrencyConverter;
