import React from "react";

export interface Participant {
  id: number;
  name: string;
  content?: React.ReactNode;
}

export interface Match {
  id: number;
  idParticpants: number[];
  idWinner: number;
}

export interface BracketStyles {
  winner?: string;
  loser?: string;
  advanced?: string;
  used?: string;
  notUsed?: string;
  empty?: string;
}

