import React, { useState } from "react";

export interface IPosition {
  xPos: number;
  yPos: number;
}

export interface ICircle {
  position: IPosition;
  radius?: number;
}

const Circle = ({ position, radius = 20 }: ICircle) => {
  const [colour] = useState(Math.floor(Math.random() * 16777215).toString(16));

  return (
    <span
      style={{
        position: "absolute",
        left: `${position.xPos - radius / 2}px`,
        top: `${position.yPos - radius / 2}px`,
        width: "20px",
        height: "20px",
        backgroundColor: `#${colour}`,
        display: "inline-block",
        borderRadius: "50%"
      }}
    />
  );
};

export default Circle;
