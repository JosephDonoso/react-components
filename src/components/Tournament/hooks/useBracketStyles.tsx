import { useState, useEffect } from "react";
import { BracketStyles } from "../Interfaces";

export const useBracketStyles = (param_bracketStyles: BracketStyles) => {
  const [bracketStyles, setBracketStyles] = useState<BracketStyles>({});

  useEffect(() => {
    if (
      param_bracketStyles.winner !== bracketStyles.winner ||
      param_bracketStyles.loser !== bracketStyles.loser ||
      param_bracketStyles.advanced !== bracketStyles.advanced ||
      param_bracketStyles.used !== bracketStyles.used ||
      param_bracketStyles.notUsed !== bracketStyles.notUsed ||
      param_bracketStyles.empty !== bracketStyles.empty
    ) {
      setBracketStyles(param_bracketStyles);
    }
    
  }, [param_bracketStyles, bracketStyles]);

  return bracketStyles;
};