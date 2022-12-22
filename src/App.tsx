import React, { useState, createRef, MouseEvent } from "react";
import Circle, { IPosition } from "./Components/Circle";
import Menu from "./Components/Menu";
import "./App.css";

const App = () => {
  // Circle positions
  const [circlePositions, setCirclePositions] = useState<IPosition[]>([]);

  // Current number of rendered circles
  const [renderedCircles, setRenderedCircles] = useState<number>(0);

  // Ref to the undo button
  const undoButtonRef = createRef<HTMLButtonElement>();

  // Ref to the redo button
  const redoButtonRef = createRef<HTMLButtonElement>();

  // Ref to the clear button
  const clearButtonRef = createRef<HTMLButtonElement>();

  // Handle click event
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.target === undoButtonRef.current ||
      event.target === redoButtonRef.current ||
      event.target === clearButtonRef.current
    ) {
      return;
    }

    // Store click position
    const clickPosition: IPosition = {
      xPos: event.clientX,
      yPos: event.clientY
    };

    setRenderedCircles((renderedCircles) => renderedCircles + 1);

    // If we're attempting to render a circle while the number of rendered circles
    // is less than the number of stored positions, set the circle positions to be
    // the number of currently rendered positions and then add the new circle
    if (renderedCircles < circlePositions.length) {
      setCirclePositions([
        ...circlePositions.slice(0, renderedCircles),
        clickPosition
      ]);
    } else {
      setCirclePositions([...circlePositions, clickPosition]);
    }
  };

  // Handle when the undo button is clicked
  const handleUndo = (event: MouseEvent<HTMLButtonElement>) => {
    setRenderedCircles((renderedCircles) => Math.max(0, renderedCircles - 1));
  };

  // Handle when the redo button is clicked
  const handleRedo = (event: MouseEvent<HTMLButtonElement>) => {
    setRenderedCircles((renderedCircles) =>
      Math.min(circlePositions.length, renderedCircles + 1)
    );
  };

  // Handle when the clear button is clicked
  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    setCirclePositions([]);
    setRenderedCircles(0);
  };

  return (
    <div className="app" onClick={handleClick}>
      <Menu
        undoButtonRef={undoButtonRef}
        handleUndo={handleUndo}
        undoDisabled={() => renderedCircles === 0}
        redoButtonRef={redoButtonRef}
        handleRedo={handleRedo}
        redoDisabled={() => renderedCircles === circlePositions.length}
        clearButtonRef={clearButtonRef}
        handleClear={handleClear}
        clearDisabled={() => renderedCircles === 0}
      />
      {renderedCircles > 0 &&
        // Render circles
        [...Array(renderedCircles).keys()].map((num) => {
          return <Circle key={num} position={circlePositions[num]} />;
        })}
    </div>
  );
};

export default App;
