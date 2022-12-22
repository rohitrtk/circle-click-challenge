import React, { RefObject, MouseEvent } from "react";
import "../Styles/Menu.css";

interface IMenu {
  undoButtonRef: RefObject<HTMLButtonElement>;
  handleUndo: (event: MouseEvent<HTMLButtonElement>) => void;
  undoDisabled: () => boolean;

  redoButtonRef: RefObject<HTMLButtonElement>;
  handleRedo: (event: MouseEvent<HTMLButtonElement>) => void;
  redoDisabled: () => boolean;

  clearButtonRef: RefObject<HTMLButtonElement>;
  handleClear: (event: MouseEvent<HTMLButtonElement>) => void;
  clearDisabled: () => boolean;
}

const Menu = ({
  undoButtonRef,
  handleUndo,
  undoDisabled,
  redoButtonRef,
  handleRedo,
  redoDisabled,
  clearButtonRef,
  handleClear,
  clearDisabled
}: IMenu) => {
  return (
    <div className="button-container">
      <button
        ref={undoButtonRef}
        className="button"
        onClick={handleUndo}
        disabled={undoDisabled()}>
        Undo
      </button>
      <button
        ref={redoButtonRef}
        className="button"
        onClick={handleRedo}
        disabled={redoDisabled()}>
        Redo
      </button>
      <button
        ref={clearButtonRef}
        className="button"
        onClick={handleClear}
        disabled={clearDisabled()}>
        Clear
      </button>
    </div>
  );
};

export default Menu;
