import React from "react";

function CurrencyBar({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
}) {
  return (
    <div className="flex bg-white rounded-lg border border-zinc-600">
      <div className="m-2 p-2 pr-32">
        <label className="text-gray-600 pl-1" htmlFor={`amount${label}`}>
          {label}
        </label>
        <input
          type="number"
          placeholder={label==="From"? "Enter Amount" : "Converted Amount"}
          id={`amount${label}`}
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          className="block bg-gray-200 rounded-lg p-1 mt-2 font-medium"
        />
      </div>
      <div className="m-2 p-2 ml-auto">
        <p className="text-gray-600">Currency Type</p>
        <select
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
          className="mt-2 bg-gray-200 rounded-sm font-medium p-1"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyBar;
