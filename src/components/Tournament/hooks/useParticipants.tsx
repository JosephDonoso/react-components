import { useState, useEffect } from "react";
import { Participant } from "../Interfaces";

export const useParticipants = (param_participants: Participant[]) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (param_participants.length !== participants.length) {
      setParticipants(param_participants);
      return;
    }
    for (let i = 0; i < participants.length; i++) {
      if (
        param_participants[i].id !== participants[i].id ||
        param_participants[i].name !== participants[i].name
      ) {
        setParticipants(param_participants);
        break;
      }
    }
  }, [param_participants, participants]);

  return participants;
};
