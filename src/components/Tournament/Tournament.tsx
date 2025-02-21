/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useCallback } from "react";
import BracketComponent, { BracketProps as Bracket } from "./Bracket";
import { Participant, Match, BracketStyles } from "./Interfaces";
import { generateBrackets, organizeParticipants, organizeMatches, getMatchesOrder } from "./TournamentController";
import { useParticipants } from "./hooks/useParticipants";
import { useMatches } from "./hooks/useMatches";

interface TournamentProps {
  className?: string;
  columnGap?: number;
  rowGap?: number;
  bracketClassName?: string;
  bracketStyles?: BracketStyles;
  participants: Participant[];
  matches: Match[];
  onTournamentComplete?: (winner: Participant | null) => void;
  onMatchesOrder?: (matches: Match[]) => void;
}

const Tournament: React.FC<TournamentProps> = ({
  className,
  columnGap,
  rowGap,
  bracketClassName,
  bracketStyles: param_bracketStyles,
  participants: param_participants,
  matches: param_matches,
  onTournamentComplete,
  onMatchesOrder
}) => {
  const [brackets, setBrackets] = useState<Bracket[]>([]);
  const tournamentRef = useRef<HTMLDivElement>(null);
  const participants = useParticipants(param_participants); 
  const matches = useMatches(param_matches);
  const [bracketStyles] = useState<BracketStyles>(param_bracketStyles || {});
  const memoizedOnTournamentComplete = useCallback(onTournamentComplete || (() => {}), []);
  const memoizedOnMatchesOrder = useCallback(onMatchesOrder || (() => {}), []);

  useEffect(() => {
    const numParticipants = participants.length;
    const tournamentSize = Math.trunc(Math.log2(numParticipants - 1)) + 1;
    const numRows = Math.pow(2, tournamentSize) - 1;
    const numCols = 2 * tournamentSize + 1;

    const container = tournamentRef.current;
    if (container) {
      container.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
      container.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
      container.style.columnGap = `${columnGap || 0}px`;
      container.style.rowGap = `${rowGap || 0}px`;
    }

    const newBrackets: Bracket[] = generateBrackets(participants, bracketClassName, bracketStyles);
    organizeParticipants(newBrackets, participants);
    organizeMatches(newBrackets, matches, memoizedOnTournamentComplete);
    getMatchesOrder(newBrackets, matches, memoizedOnMatchesOrder);
    setBrackets(newBrackets);
  }, [participants, matches, bracketStyles, columnGap, rowGap, bracketClassName, memoizedOnTournamentComplete, memoizedOnMatchesOrder]);

  return (
    <div className={className}>
      <div ref={tournamentRef} className="grid">
        {brackets.map((bracket) => (
          <BracketComponent key={bracket.id} {...bracket}>
            {bracket.participant?.content || bracket.participant?.name}
          </BracketComponent>
        ))}
      </div>
    </div>
  );
};

export default Tournament;