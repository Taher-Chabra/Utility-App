import { useState } from "react";

function useTemperatureInfo(value, fromTemp, toTemp) {

   let answer = 0;
   
   if (fromTemp === 'Celsius' && toTemp === 'Fahrenheit') {
      answer = (value * 9/5) + 32;
   } 
   else if (fromTemp === 'Celsius' && toTemp === 'Kelvin') {
      answer = value + 273.15;
   }
   else if (fromTemp === 'Fahrenheit' && toTemp === 'Celsius') {
      answer = (value - 32) * 5/9;
   }
   else if (fromTemp === 'Fahrenheit' && toTemp === 'Kelvin') {
      answer = ((value - 32) * 5/9) + 273.15;
   }
   else if (fromTemp === 'Kelvin' && toTemp === 'Fahrenheit') {
      answer = ((value - 273.15) * 9/5) + 32;
   }
   else if (fromTemp === 'Kelvin' && toTemp === 'Celsius') {
      answer = value - 273.15;
   }

   return answer.toFixed(2)
}

export default useTemperatureInfo