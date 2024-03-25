import React from "react";
import useTheme from "../../contexts/ThemeContext";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

function ThemeButton() {
  const { colorMode, toggleColorMode } = useTheme();

  function toggleTheme() {
    document.querySelector("#innerCircle").classList.toggle("translate-x-4");
    toggleColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }

  return (
    <div className="flex gap-1.5 items-center">
      <div className="text-yellow-500 dark:text-white text-lg">
        {colorMode === "dark" ? <BsMoonFill /> : <BsSunFill />}
      </div>
      <div className="w-8 h-4 rounded-full bg-gray-600 ring-1 ring-black dark:ring-white">
        <div
          id="innerCircle"
          className="w-4 h-4 rounded-full bg-white transition-transform translate-x-4 cursor-pointer"
          onClick={toggleTheme}
        ></div>
      </div>
    </div>
  );
}

export default ThemeButton;
