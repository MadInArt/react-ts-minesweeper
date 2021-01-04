import React, { useState } from "react";

import { generateCells } from "../../utils/utils";
import NumberDisplay from "../numberDisplay/NumberDisplay";
import CellButton from "../cellButton/cellButton";
import { AppContainer, AppHeader, AppBody, SmileContainer } from "./App.styles";
import { CellState, CellValue } from "../../types/types";

const App: React.FC = () => {
  const [cells, setSells] = useState(generateCells());
  console.log(cells);
  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, columnIndex) => (
        <CellButton
          key={`${rowIndex}-${columnIndex}`}
          state={cell.state}
          value={cell.value}
          row={rowIndex}
          column={columnIndex}
        />
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
