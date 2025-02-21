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
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: "1",
      content: (
        <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
          <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
            1
          </p>
          <p className="px-2 w-full text-center">Joseph</p>
        </div>
      ),
    },
    {
      id: 2,
      name: "2",
      content: (
        <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
          <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
            2
          </p>
          <p className="px-2 w-full text-center">Juan</p>
        </div>
      ),
    },
    {
      id: 3,
      name: "3",
      content: (
        <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
          <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
            3
          </p>
          <p className="px-2 w-full text-center">Pedro</p>
        </div>
      ),
    },
    {
      id: 4,
      name: "4",
      content: (
        <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
          <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
            4
          </p>
          <p className="px-2 w-full text-center">Carlos</p>
        </div>
      ),
    },
    {
      id: 5,
      name: "5",
      content: (
        <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
          <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
            5
          </p>
          <p className="px-2 w-full text-center">Javier</p>
        </div>
      ),
    },
    {
      id: 6,
      name: "6",
      content: (
        <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
          <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
            6
          </p>
          <p className="px-2 w-full text-center">Luis</p>
        </div>
      ),
    },
    {
      id: 7,
      name: "7",
      content: (
        <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
          <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
            7
          </p>
          <p className="px-2 w-full text-center">Mario</p>
        </div>
      ),
    },
    {
      id: 8,
      name: "8",
      content: (
        <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
          <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
            8
          </p>
          <p className="px-2 w-full text-center">Miguel</p>
        </div>
      ),
    },
    {
      id: 9,
      name: "9",
      content: (
        <div className="flex border-2 border-gray-700 justify-between items-center w-full h-full rounded-md font-semibold overflow-hidden">
          <p className="flex items-center h-full px-2 bg-slate-400 border-r-[2px] border-gray-700">
            9
          </p>
          <p className="px-2 w-full text-center">Andres</p>
        </div>
      ),
    },
  ]);

  const [matches, setMatches] = useState<Match[]>([
    { id: 100, idParticpants: [9, 8], idWinner: 9 },
    { id: 800, idParticpants: [7, 6], idWinner: 7 },
    { id: 900, idParticpants: [3, 11], idWinner: 3 },
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
        className="bg-gray-600 overflow-auto p-5"
        columnGap={10}
        bracketClassName="flex justify-center items-center rounded-md w-full mx-auto"
        bracketStyles={bracketStyles}
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
            .map((match) => `${match.idParticpants.join(" vs ")}`)
            .join(", ")}
        </p>
        <button
          className="bg-blue-500"
          onClick={async () => {
            const newMatch = {
              ...matchesOrder[0],
              idWinner: matchesOrder[0].idParticpants[0],
            };
            setMatches((prevMatches) => [...prevMatches, newMatch]);
          }}
        >
          Next match
        </button>
        <button
          className="bg-red-500"
          onClick={() => {
            const newMatch = {
              ...matchesOrder[0],
              idWinner: matchesOrder[0].idParticpants[1],
            };
            setMatches((prevMatches) => [...prevMatches, newMatch]);
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
          }}
        >
          Add a new participant
        </button>
      </div>
    </>
  );
}

export default App;
