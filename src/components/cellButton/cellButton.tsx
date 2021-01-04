import React from "react";
import { CellState, CellValue } from "../../types/types";

import { CellButtonContainer } from "./cellButton.styles";

interface CellButtonProps {
  state: CellState;
  value: CellValue;
  row: number;
  column: number;
  onClick(rowParam: number, columnParam: number): (...args: any[]) => void;
  onContext(rowParam: number, columnParam: number): (...args: any[]) => void;
}

const CellButton: React.FC<CellButtonProps> = ({
  state,
  value,
  row,
  column,
  onClick,
  onContext
}) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.open) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            🧨
          </span>
        );
      } else if (value === CellValue.none) {
        return null;
      }
      return value;
    } else if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="flag">
          🚩
        </span>
      );
    }

    return null;
  };
  return (
    <CellButtonContainer
      style={
        CellState.visible ? { borderWidth: "1px", borderColor: "#7b7b7b" } : {}
      }
      onClick={onClick(row, column)}
      onContextMenu={onContext(row, column)}
    >
      {renderContent()}
    </CellButtonContainer>
    // <div className={`Button ${state === CellState.visible? 'visible': ""}`}>
    //    {renderContent()}
    // </div>
  );
};

export default CellButton;
