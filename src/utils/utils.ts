import { Cell, CellValue, CellState } from "../types/types";

const grabAllAdjacentCells = (
  cells: Cell[][],
  rowParam: number,
  columnParam: number
): {
  topLeftCell: Cell | null;
  topCell: Cell | null;
  topRightCell: Cell | null;
  leftCell: Cell | null;
  rightCell: Cell | null;
  bottomLeftCell: Cell | null;
  bottomCell: Cell | null;
  bottomRightCell: Cell | null;
} => {
  const topLeftCell =
    rowParam > 0 && columnParam > 0
      ? cells[rowParam - 1][columnParam - 1]
      : null;
  const topCell = rowParam > 0 ? cells[rowParam - 1][columnParam] : null;
  const topRightCell =
    rowParam > 0 && columnParam < 9 - 1
      ? cells[rowParam - 1][columnParam + 1]
      : null;
  const leftCell = columnParam > 0 ? cells[rowParam][columnParam - 1] : null;
  const rightCell =
    columnParam < 9 - 1 ? cells[rowParam][columnParam + 1] : null;
  const bottomLeftCell =
    rowParam < 9 - 1 && columnParam > 0
      ? cells[rowParam + 1][columnParam - 1]
      : null;
  const bottomCell = rowParam < 9 - 1 ? cells[rowParam + 1][columnParam] : null;
  const bottomRightCell =
    rowParam < 9 - 1 && columnParam < 9 - 1
      ? cells[rowParam + 1][columnParam + 1]
      : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};

export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];

  // generating all cells
  for (let row = 0; row < 9; row++) {
    cells.push([]);
    for (let col = 0; col < 9; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.open,
      });
    }
  }

  // randomly put 10 bombs
  let bombsPlaced = 0;
  while (bombsPlaced < 10) {
    const randomRow = Math.floor(Math.random() * 9);
    const randomCol = Math.floor(Math.random() * 9);

    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          if (randomRow === rowIndex && randomCol === columnIndex) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }

          return cell;
        })
      );
      bombsPlaced++;
    }
  }

  // calculate the numbers for each cell
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      const currentCell = cells[rowIndex][columnIndex];
      if (currentCell.value === CellValue.bomb) {
        continue;
      }

      let numberOfBombs = 0;
      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell,
      } = grabAllAdjacentCells(cells, rowIndex, columnIndex);

      if (topLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (leftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (rightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }

      if (numberOfBombs > 0) {
        cells[rowIndex][columnIndex] = {
          ...currentCell,
          value: numberOfBombs,
        };
      }
    }
  }

  return cells;
};

export const openMultipleCells = (
  cells: Cell[][],
  rowParam: number,
  columnParam: number
): Cell[][] => {
  const currentCell = cells[rowParam][columnParam];

  if (
    currentCell.state === CellState.visible ||
    currentCell.state === CellState.flagged
  ) {
    return cells;
  }

  let newCells = cells.slice();
  newCells[rowParam][columnParam].state = CellState.visible;

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = grabAllAdjacentCells(cells, rowParam, columnParam);

  if (
    topLeftCell?.state === CellState.open &&
    topLeftCell.value !== CellValue.bomb
  ) {
    if (topLeftCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, columnParam - 1);
    } else {
      newCells[rowParam - 1][columnParam - 1].state = CellState.visible;
    }
  }

  if (topCell?.state === CellState.open && topCell.value !== CellValue.bomb) {
    if (topCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, columnParam);
    } else {
      newCells[rowParam - 1][columnParam].state = CellState.visible;
    }
  }

  if (
    topRightCell?.state === CellState.open &&
    topRightCell.value !== CellValue.bomb
  ) {
    if (topRightCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam - 1, columnParam + 1);
    } else {
      newCells[rowParam - 1][columnParam + 1].state = CellState.visible;
    }
  }

  if (leftCell?.state === CellState.open && leftCell.value !== CellValue.bomb) {
    if (leftCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, columnParam - 1);
    } else {
      newCells[rowParam][columnParam - 1].state = CellState.visible;
    }
  }

  if (
    rightCell?.state === CellState.open &&
    rightCell.value !== CellValue.bomb
  ) {
    if (rightCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, columnParam + 1);
    } else {
      newCells[rowParam][columnParam + 1].state = CellState.visible;
    }
  }

  if (
    bottomLeftCell?.state === CellState.open &&
    bottomLeftCell.value !== CellValue.bomb
  ) {
    if (bottomLeftCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, columnParam - 1);
    } else {
      newCells[rowParam + 1][columnParam - 1].state = CellState.visible;
    }
  }

  if (
    bottomCell?.state === CellState.open &&
    bottomCell.value !== CellValue.bomb
  ) {
    if (bottomCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, columnParam);
    } else {
      newCells[rowParam + 1][columnParam].state = CellState.visible;
    }
  }

  if (
    bottomRightCell?.state === CellState.open &&
    bottomRightCell.value !== CellValue.bomb
  ) {
    if (bottomRightCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam + 1, columnParam + 1);
    } else {
      newCells[rowParam + 1][columnParam + 1].state = CellState.visible;
    }
  }

  return newCells;
};
