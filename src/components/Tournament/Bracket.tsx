import React from "react";
import { Participant, BracketStyles } from "./Interfaces";
import LinkComponent, { LinkProps as Link } from "./Link";

export interface BracketProps {
  id: number;
  className?: string;
  position: number[];
  style: "empty" | "notUsed" | "used" | "advanced" | "loser" | "winner";
  link?: Link;
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
  link,
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
      className={`${className} ${combinedBracketStyles[style]} relative`}
    >
      {children}

      {link && <LinkComponent {...link} />}
    </div>
  );
};

export default Bracket;
