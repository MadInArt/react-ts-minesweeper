import React, { useState, useEffect } from "react";

import { generateCells, openMultipleCells } from "../../utils/utils";
import NumberDisplay from "../numberDisplay/NumberDisplay";
import CellButton from "../cellButton/cellButton";
import { AppContainer, AppHeader, AppBody, SmileContainer } from "./App.styles";
import { CellState, CellValue, Emoji, Cell } from "../../types/types";

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Emoji>(Emoji.smile);
  const [time, setTime] = useState<number>(0);
  const [live, setLive] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(10);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setFace(Emoji.surprised);
    };
    const handleMouseUp = (): void => {
      setFace(Emoji.smile);
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]); // if we wont pass time dendency, timer will stop on 1sec, cause in context of UseEffect it has access to initial, but not updated value

  const handleCellClick = (
    rowParam: number,
    columnParam: number
  ) => (): void => {
    //start game
    if (!live) {
      setLive(true);
    }
  const currentCell = cells[rowParam][columnParam];
  let newCells = cells.slice();

    if ([CellState.flagged, CellState.visible].includes(currentCell.state)){
      return;
    }

  if(currentCell.value === CellValue.bomb){

  } else if ( currentCell.value  === CellValue.none){
      newCells = openMultipleCells(newCells, rowParam, columnParam);
      setCells(newCells)
  } else{
    newCells[rowParam][columnParam].state = CellState.visible;
    setCells(newCells)
  }}

  const handleCellContext = (rowParam: number, columnParam: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (!live) {
      return;
    }
    const currentCells = cells.slice();
    const currentCell = cells[rowParam][columnParam];
    if (currentCell.state === CellState.visible) {
      return;
    } else if ((currentCell.state === CellState.open)) {
      currentCells[rowParam][columnParam].state = CellState.flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currentCells[rowParam][columnParam].state = CellState.open;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  // restarting game
  const handleFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
      setBombCounter(10);
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, columnIndex) => (
        <CellButton
          key={`${rowIndex}-${columnIndex}`}
          state={cell.state}
          value={cell.value}
          onClick={handleCellClick}
          onContext={handleCellContext}
          row={rowIndex}
          column={columnIndex}
        />
      ))
    );
  };

  return (
    <AppContainer>
      <AppHeader>
        <NumberDisplay value={bombCounter} />
        <SmileContainer onClick={handleFaceClick}>
          <span role="img" aria-label="smile">
            {face}
          </span>
        </SmileContainer>
        <NumberDisplay value={time} />
      </AppHeader>
      <AppBody>{renderCells()}</AppBody>
    </AppContainer>
  );
};
export default App;
