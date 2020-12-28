import React, { useState } from "react";

import { generateCells } from "../../utils/index";
import NumberDisplay from "../numberDisplay/NumberDisplay";
import CellButton from "../cellButton/cellButton";
import { AppContainer, AppHeader, AppBody, SmileContainer } from "./App.styles";

const App: React.FC = () => {
  const [cells, setSells] = useState(generateCells());

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, cellIndex) => (
        <CellButton key={`${rowIndex}-${cellIndex}`} />
      ))
    );
  };

  return (
    <AppContainer>
      <AppHeader>
        <NumberDisplay value={0} />
        <SmileContainer>
          <span role="img" aria-label="smile">
            😀
          </span>
        </SmileContainer>
        <NumberDisplay value={23} />
      </AppHeader>
      <AppBody>{renderCells()}</AppBody>
    </AppContainer>
  );
};

export default App;
