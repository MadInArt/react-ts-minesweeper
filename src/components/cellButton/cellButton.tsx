import React from "react";
import { CellState, CellValue } from "../../types/types";

import "./cellButton.css";
interface CellButtonProps {
  state: CellState;
  value: CellValue;
  row: number;
  red?: boolean;
  column: number;
  onClick(rowParam: number, columnParam: number): (...args: any[]) => void;
  onContext(rowParam: number, columnParam: number): (...args: any[]) => void;
}

const CellButton: React.FC<CellButtonProps> = ({
  column,
  onClick,
  onContext,
  red,
  row,
  state,
  value
}) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
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
    <div
      className={`Button ${
        state === CellState.visible ? "visible" : ""
      } value-${value} ${red ? "red" : ""}`}
      onClick={onClick(row, column)}
      onContextMenu={onContext(row, column)}
    >
      {renderContent()}
    </div>
  );
};

export default CellButton;
