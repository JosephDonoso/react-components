import { useState, useEffect } from "react";
import { Match } from "../Interfaces";

export const useMatches = (param_matches: Match[]) => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (param_matches.length !== matches.length) {
      setMatches(param_matches);
      return;
    }
    for (let i = 0; i < matches.length; i++) {
      if (
        param_matches[i].id !== matches[i].id ||
        param_matches[i].idParticipants[0] !== matches[i].idParticipants[0] ||
        param_matches[i].idParticipants[1] !== matches[i].idParticipants[1] ||
        param_matches[i].idWinner !== matches[i].idWinner
      ) {
        setMatches(param_matches);
        break;
      }
    }
  }, [param_matches, matches]);

  return matches;
};
