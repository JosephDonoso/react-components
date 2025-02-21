import { Participant, Match, BracketStyles } from "./Interfaces";
import { BracketProps as Bracket } from "./Bracket";

const getColPosition = (
  side: string | undefined,
  col: number,
  defaultOffset: number
) => {
  if (side) {
    if (side === "left") {
      return col - 1;
    } else {
      return col + 1;
    }
  }
  return col + defaultOffset;
};

const getOffsetY = (index: number, tournamentSize: number) => {
  if (index === 0) return 0;
  return Math.pow(2, tournamentSize - Math.trunc(Math.log2(index + 1)) - 1);
};

export const generateBrackets = (
  participants: Participant[],
  bracketClassName: string | undefined,
  bracketStyles: BracketStyles | undefined
): Bracket[] => {
  const numParticipants = participants.length;
  const tournamentSize = Math.trunc(Math.log2(numParticipants - 1)) + 1;
  const numRows = Math.pow(2, tournamentSize) - 1;
  const numCols = 2 * tournamentSize + 1;
  const newBrackets: Bracket[] = [];
  const numBrackets = Math.pow(2, tournamentSize + 1) - 1;
  let index = -1;
  let currentBracket = null;
  while (newBrackets.length < numBrackets) {
    if (index == -1) {
      newBrackets.push({
        id: index + 1,
        className: bracketClassName,
        bracketStyles: bracketStyles,
        position: [Math.trunc(numRows / 2) + 1, Math.trunc(numCols / 2) + 1],
        style: "notUsed",
        participant: undefined,
      });
    } else {
      currentBracket = newBrackets[index] as Bracket;
      if (currentBracket) {
        const offsetY = getOffsetY(index, tournamentSize);

        newBrackets.push({
          id: 2 * currentBracket.id + 1,
          className: bracketClassName,
          bracketStyles: bracketStyles,
          position: [
            currentBracket.position[0] - offsetY,
            getColPosition(currentBracket.side, currentBracket.position[1], -1),
          ],
          style: "notUsed",
          side: currentBracket.side ? currentBracket.side : "left",
          participant: undefined,
        });
        newBrackets.push({
          id: 2 * currentBracket.id + 2,
          className: bracketClassName,
          bracketStyles: bracketStyles,
          position: [
            currentBracket.position[0] + offsetY,
            getColPosition(currentBracket.side, currentBracket.position[1], 1),
          ],
          style: "notUsed",
          side: currentBracket.side ? currentBracket.side : "right",
          participant: undefined,
        });
      }
    }
    index += 1;
  }
  return newBrackets;
};

export const organizeParticipants = (
  newBrackets: Bracket[],
  participants: Participant[]
) => {
  let index = 0;
  while (index < participants.length - 1) {
    const bracket = newBrackets[index];
    if (bracket.participant === undefined) {
      bracket.participant = participants[index];
      bracket.style = "used";
      index -= 1;
    } else {
      newBrackets[2 * bracket.id + 1].participant = bracket.participant;
      newBrackets[2 * bracket.id + 1].style = "used";

      newBrackets[2 * bracket.id + 2].participant = participants[index + 1];
      newBrackets[2 * bracket.id + 2].style = "used";

      bracket.participant = undefined;
      bracket.style = "empty";
    }
    index += 1;
  }

  index = participants.length - 1;
  for (let i = newBrackets.length - 1; i >= 0; i -= 1) {
    if (newBrackets[i].style === "used") {
      newBrackets[i].participant = participants[index];
      index -= 1;
      if (index < 0) {
        break;
      }
    }
  }
};

const isAdjacentBracket = (bracket1: Bracket, bracket2: Bracket) => {
  return bracket1.id - bracket2.id === 1 || bracket2.id - bracket1.id === 1;
};

const advanceBracket = (
  newBrackets: Bracket[],
  bracket1: Bracket,
  bracket2: Bracket,
  onTournamentComplete: (winner: Participant) => void
) => {
  const parentBracket = newBrackets.find(
    (bracket) => bracket.id === Math.trunc((bracket1.id - 1) / 2)
  );
  if (parentBracket) {
    bracket1.style = "advanced";
    bracket2.style = "loser";
    parentBracket.participant = bracket1.participant;
    if (parentBracket.id === 0) {
      parentBracket.style = "winner";
      if (parentBracket.participant && onTournamentComplete) {
        onTournamentComplete(parentBracket.participant);
      }
    } else {
      parentBracket.style = "used";
    }
  }
};

export const organizeMatches = (
  newBrackets: Bracket[],
  matches: Match[],
  onTournamentComplete: (winner: Participant | null) => void
) => {
  onTournamentComplete(null);
  const matchesCopy: Match[] = [...matches];
  const matchesVisited: { [key: number]: boolean } = {};
  const maxIterations = Math.max(
    (matchesCopy.length * (matchesCopy.length + 1)) / 2,
    2
  );
  let i = 1;
  while (matchesCopy.length > 0) {
    if (i === maxIterations) {
      console.error(
        "Error, existen matches que no se pudieron organizar: ",
        matchesCopy
      );
      return;
    }
    i += 1;
    const match = matchesCopy.shift();
    if (match) {
      if (matchesVisited[match.id] !== undefined && matchesVisited[match.id]) {
        console.error("Error, match repetido: ", match);
        return;
      }

      const bracketParticipant1 = newBrackets.find(
        (bracket) =>
          bracket.participant &&
          bracket.style === "used" &&
          bracket.participant.id === match.idParticpants[0]
      );
      const bracketParticipant2 = newBrackets.find(
        (bracket) =>
          bracket.participant &&
          bracket.style === "used" &&
          bracket.participant.id === match.idParticpants[1]
      );

      if (
        bracketParticipant1 &&
        bracketParticipant2 &&
        isAdjacentBracket(bracketParticipant1, bracketParticipant2) &&
        Math.max(bracketParticipant1.id, bracketParticipant2.id)%2 === 0
      ) {
        matchesVisited[match.id] = true;
        if (match.idWinner === bracketParticipant1.participant?.id) {
          advanceBracket(
            newBrackets,
            bracketParticipant1,
            bracketParticipant2,
            onTournamentComplete
          );
        } else if (match.idWinner === bracketParticipant2.participant?.id) {
          advanceBracket(
            newBrackets,
            bracketParticipant2,
            bracketParticipant1,
            onTournamentComplete
          );
        } else {
          console.error(
            "Error, idWinner no coincide con ninguno de los participantes"
          );
          return;
        }
      } else {
        matchesCopy.push(match);
      }
    }
  }
};

export const getMatchesOrder = (
  newBrackets: Bracket[],
  matches: Match[],
  onMatchesOrder: (matches: Match[]) => void
) => {
  const matchesOrder: Match[] = [];
  let matchId = matches.length;
  for (let i = newBrackets.length - 1; i > 0; i -= 2) {
    if (
      newBrackets[i].style === "used" &&
      newBrackets[i - 1].style === "used"
    ) {
      matchesOrder.push({
        id: matchId,
        idParticpants: [
          newBrackets[i].participant?.id || -1,
          newBrackets[i - 1].participant?.id || -1,
        ],
        idWinner: -1,
      });
      matchId += 1;
    }
  }
  onMatchesOrder(matchesOrder);
};
