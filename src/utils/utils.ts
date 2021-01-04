import { Cell, CellValue, CellState } from "../types/types";

export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];
// generate the fields
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
    const randomCol = Math.floor(Math.random() *9);

    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          if (randomRow === rowIndex && randomCol === columnIndex) {
            return {
              ...cell,
              value: CellValue.bomb
            };
          }

          return cell;
        })
      );
      bombsPlaced++;
    }
  }

  //calculate the numbers in cells around bombs
  for( let rowIndex = 0; rowIndex < 9; rowIndex++){
    for(let columnIndex = 0; columnIndex <9; columnIndex++){
      const currentCell = cells[rowIndex][columnIndex];
      if(currentCell.value === CellValue.bomb){
        continue;
      }
      let numberOfBombs = 0;
      const topLeftBomb = rowIndex > 0 && columnIndex > 0 ? cells[rowIndex - 1][columnIndex - 1]: null;
      const topBomb = rowIndex > 0 ? cells[rowIndex - 1][columnIndex] : null;
      const topRightBomb = rowIndex > 0 && columnIndex < 8 ? cells[rowIndex - 1][columnIndex + 1]: null;
      const leftBomb = columnIndex > 0 ? cells[rowIndex][columnIndex - 1] : null;
      const rightBomb = columnIndex < 8 ? cells[rowIndex][columnIndex + 1] : null;
      const bottomLeftBomb = rowIndex < 8 && columnIndex > 0? cells[rowIndex + 1][columnIndex - 1]: null;
      const bottomBomb = rowIndex < 8? cells[ rowIndex + 1][columnIndex]: null;
      const bottomRightBomb = rowIndex<8 && columnIndex < 8? cells[rowIndex + 1][columnIndex + 1 ]:null;

      if(topLeftBomb?.value === CellValue.bomb){
        numberOfBombs++
      }
      if(topBomb?.value === CellValue.bomb){
        numberOfBombs++
      }
      if(topRightBomb?.value === CellValue.bomb){
        numberOfBombs++
      }
      if(leftBomb?.value === CellValue.bomb){
        numberOfBombs++
      }
      if(rightBomb?.value === CellValue.bomb){
        numberOfBombs++
      }
      if(bottomLeftBomb?.value === CellValue.bomb){
        numberOfBombs++
      }
      if(bottomBomb?.value === CellValue.bomb){
        numberOfBombs++
      }
      if(bottomRightBomb?.value === CellValue.bomb){
        numberOfBombs++
      }
      if(numberOfBombs > 0){
        cells[rowIndex][columnIndex] = {
          ...currentCell,
          value: numberOfBombs
        }
      }
    }
  }
  return cells;
};
