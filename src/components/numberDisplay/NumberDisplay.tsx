import React from "react";
import { NumberDisplayContainer } from "./NumberDisplay.styles";

interface NumberDisplayProps {
  value: number;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value }) => {
  return (
    <NumberDisplayContainer>
      {value < 0
        ? `-${Math.abs(value).toString().padStart(2, "0")}`
        : value.toString().padStart(3, "0")}
    </NumberDisplayContainer>
  );
};

export default NumberDisplay;
