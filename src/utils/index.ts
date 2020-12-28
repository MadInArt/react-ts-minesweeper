import { Cell, CellValue, CellState } from "../types/types";

export const generateCells = (): Cell[][] => {
  const cells: Cell[][] = [];

  for (let row = 0; row < 9; row++) {
    cells.push([]);
    for (let col = 0; col < 9; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.opened,
      });
    }
  }
  return cells;
};
