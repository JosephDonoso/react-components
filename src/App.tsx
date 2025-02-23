import Tournament from "./components/Tournament/Tournament";
import {
  Participant,
  Match,
  BracketStyles,
} from "./components/Tournament/Interfaces";
import { useState } from "react";

function App() {
  const [winner, setWinner] = useState<Participant | null>(null);
  const [matchesOrder, setMatchesOrder] = useState<Match[]>([]);
  const [linkColor, setLinkColor] = useState<string | undefined>(undefined);

  const bracketContent = (id: number, name: string) => (
    <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full font-semibold overflow-hidden">
      <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
        {id}
      </p>
      <p className="px-2 w-full text-center">{name}</p>
    </div>
  );

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: "Joseph",
      content: bracketContent(1, "Joseph"),
    },
    {
      id: 2,
      name: "James",
      content: bracketContent(2, "James"),
    },
    {
      id: 3,
      name: "Emma",
      content: bracketContent(3, "Emma"),
    },
    {
      id: 4,
      name: "Oliver",
      content: bracketContent(4, "Oliver"),
    },
    {
      id: 5,
      name: "Sophia",
      content: bracketContent(5, "Sophia"),
    },
    {
      id: 6,
      name: "William",
      content: bracketContent(6, "William"),
    },
    {
      id: 7,
      name: "Isabella",
      content: bracketContent(7, "Isabella"),
    },
    {
      id: 8,
      name: "Benjamin",
      content: bracketContent(8, "Benjamin"),
    },
    {
      id: 9,
      name: "Charlotte",
      content: bracketContent(9, "Charlotte"),
    },
  ]);

  const [matches, setMatches] = useState<Match[]>([
    { id: 100, idParticipants: [9, 8], idWinner: 9 },
    { id: 800, idParticipants: [7, 6], idWinner: 7 },
  ]);

  const [bracketStyles] = useState<BracketStyles>({
    winner: "bg-yellow-400",
    loser: "bg-red-300",
    advanced: "bg-green-300",
    used: "bg-blue-500",
    notUsed: "hidden",
    empty: "bg-gray-500",
  });

  const handleTournamentComplete = (winner: Participant | null) => {
    setWinner(winner);
  };

  const handleMatchesOrder = (matches: Match[]) => {
    setMatchesOrder(matches);
  };

  return (
    <>
      <Tournament
        className="bg-gray-600 overflow-auto p-5 w-1/2 mx-auto"
        rowGap={10}
        columnGap={10}
        bracketClassName="flex justify-center items-center rounded-xl w-full min-w-[200px] mx-auto text-xl"
        bracketStyles={bracketStyles}
        linkColor={linkColor}
        participants={participants}
        matches={matches}
        onTournamentComplete={handleTournamentComplete}
        onMatchesOrder={handleMatchesOrder}
      />

      <div className="mt-5 p-5 bg-cyan-300">
        <h1> Tournament Features</h1>
        <p className="bg-yellow-200">
          Winner: {winner ? winner.name : "No winner yet"}
        </p>
        <p className="bg-cyan-400">
          Next matches Order:{" "}
          {matchesOrder
            .map((match) => `${match.idParticipants.join(" vs ")}`)
            .join(", ")}
        </p>
        <button
          className="bg-blue-500"
          onClick={async () => {
            const newMatch = {
              ...matchesOrder[0],
              idWinner: matchesOrder[0].idParticipants[0],
            };
            setMatches((prevMatches) => [...prevMatches, newMatch]);
            setLinkColor("rgba(0, 255, 255, 1");
          }}
        >
          Next match
        </button>
        <button
          className="bg-red-500"
          onClick={() => {
            const newMatch = {
              ...matchesOrder[0],
              idWinner: matchesOrder[0].idParticipants[1],
            };
            setMatches((prevMatches) => [...prevMatches, newMatch]);
            setLinkColor("rgba(255, 0, 255, 1");
          }}
        >
          Next match
        </button>
        <button
          className="bg-green-500"
          onClick={() => {
            const newParticipant = {
              id: participants.length + 1,
              name: `${participants.length + 1}`,
              content: (
                <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
                  <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
                    {participants.length + 1}
                  </p>
                  <p className="px-2 w-full text-center">New_Participant</p>
                </div>
              ),
            };
            setParticipants((prevParticipants) => [
              ...prevParticipants,
              newParticipant,
            ]);
            setLinkColor("rgba(255, 255, 0, 1");
          }}
        >
          Add a new participant
        </button>
      </div>
    </>
  );
}

export default App;
