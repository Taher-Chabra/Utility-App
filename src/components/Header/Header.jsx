import React from "react";
import { NavLink } from "react-router-dom";
import ThemeButton from "./ThemeButton";

function Header() {
  const utilities = [
    "CurrencyConverter",
    "TemperatureConverter",
    "PasswordGenerator",
    "TodoApp"
  ];

  function separateWords(string) {
    const words = string.match(/[A-Z][a-z]*/g);
    return words.join(" ");
  }

  return (
    <div className="w-screen fixed top-0 text-center pt-2 bg-zinc-100 dark:bg-gray-500">
      <p className="font-bold text-slate-900 dark:text-white text-5xl">
        <NavLink to="/">Utility App</NavLink>
      </p>

      <div className="float-right relative end-14 bottom-6">
        <ThemeButton />
      </div>

      <div className="bg-gray-300 dark:bg-gray-800 mt-6 flex justify-evenly">
        {utilities.map((utils) => (
          <NavLink
            key={utils}
            className={({ isActive }) => {
              return `${
                isActive
                  ? "text-cyan-700 dark:text-teal-300"
                  : "text-stone-900 dark:text-white"
              } p-2 bg-gray-400 dark:bg-gray-700 
            my-2 rounded font-medium hover:scale-105 active:scale-95 active:bg-gray-500`;
            }}
            to={`/${utils}`}
          >
            {separateWords(utils)}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Header;
