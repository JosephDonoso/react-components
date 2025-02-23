import React from "react";

export interface LinkProps {
  positionVertical: "top" | "bottom";
  positionHorizontal: "left" | "right";
  rows: number;
  cols: number;
  rowGap: number;
  columnGap: number;
  linkColor?: string;
}

const Link: React.FC<LinkProps> = ({
  positionVertical,
  positionHorizontal,
  rows,
  rowGap,
  columnGap,
  linkColor,
}) => {
  const styleHorizontal = {
    right: "right-0",
    left: "left-0",
  };

  const styleVertical = {
    top: "top-0",
    bottom: "bottom-0",
  };

  console.log(linkColor);

  return rows > 0 ? (
    <div
      className={`absolute w-[2%] left-0 right-0 mx-auto ${styleVertical[positionVertical]}`}
      style={{
        height: `calc((100% * ${rows - 1}) + ${rowGap * rows + 1}px + 50%)`,
        transform: `translateY(${positionVertical === "top" ? "-" : ""}100%)`,
        backgroundColor: linkColor || "white",
      }}
    >
      <div
        className={`absolute h-[1px] ${styleHorizontal[positionHorizontal]} ${styleVertical[positionVertical]}`}
        style={{
          width: `calc(2500% + ${columnGap}px)`,
          backgroundColor: linkColor || "white",
        }}
      ></div>
    </div>
  ) : (
    <div
      className={`absolute h-[2px] top-0 bottom-0 my-auto ${
        positionHorizontal === "left" ? "left-[100%]" : "right-[100%]"
      }`}
      style={{
        width: `${columnGap}px`,
        backgroundColor: linkColor || "white",
      }}
    ></div>
  );
};

export default Link;