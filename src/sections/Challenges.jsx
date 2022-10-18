import { useState } from "react";
import ChallengeCard from "../components/ChallengeCard";

export default function Challenges() {
  const [challengeID, setChallengeID] = useState();
  const challenges = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];

  return (
    <section className="background min-h-screen text-white p-16 overflow-hidden">
      <div className="bg-[#FFCC00] h-48 w-48 blur-[100px] absolute top-0 -translate-x-1/2 left-1/2 -translate-y-1/2" />

      <div className="relative w-full flex flex-col items-center">
        <h1 className="font-arcade text-4xl">challenges</h1>
        <div className="w-full flex flex-col items-start mt-24">
          <div>
            <div className="text-4xl font-arcade">
              <h2>let's do some</h2>
              <h2 className="text-[#E6A2C7]">challenges !</h2>
            </div>
          </div>
          <h3 className="text-3xl mt-4">Play againt the AI! Choose a game</h3>
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly my-16">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} />
        ))}
      </div>
    </section>
  );
}
