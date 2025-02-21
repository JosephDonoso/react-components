import React from "react";
import { Participant, BracketStyles } from "./Interfaces";

export interface BracketProps {
  id: number;
  className?: string;
  position: number[];
  style: "empty" | "notUsed" | "used" | "advanced" | "loser" | "winner";
  side?: "left" | "right";
  participant?: Participant;
  children?: React.ReactNode;
  bracketStyles?: BracketStyles;
}

const Bracket: React.FC<BracketProps> = ({
  id,
  className,
  position,
  style,
  children,
  bracketStyles = {},
}) => {
  const defaultBracketStyles = {
    winner: "bg-yellow-400",
    loser: "bg-red-400",
    advanced: "bg-green-400",
    used: "bg-blue-400",
    notUsed: "hidden",
    empty: "bg-gray-400",
  };

  const combinedBracketStyles = { ...defaultBracketStyles, ...bracketStyles };

  return (
    <div
      id={id.toString()}
      style={{
        gridArea: `${position[0]} / ${position[1]} / ${position[0] + 1} / ${
          position[1] + 1
        }`,
      }}
      className={`${className} ${combinedBracketStyles[style]}`}
    >
      {children}
    </div>
  );
};

export default Bracket;
