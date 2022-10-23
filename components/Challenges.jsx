import { useState, useRef } from "react";
import ChallengeCard from "./ChallengeCard";

import LeaderBoard from "./LeaderBord.jsx";
export default function Challenges() {
  return (
    <section
      className="relative min-h-screen text-white overflow-hidden"
      id="Challenges"
    >
      <div className="p-6 md:p-16">
        <img
          alt="pac"
          src="/assets/Group6.png"
          className="invisible md:visible absolute xl:w-80 md:w-56 sm:w-36 w-28 top-5 left-0"
        />
        <img
          alt="pac"
          src="/assets/Group5.png"
          className="invisible md:visible absolute lg:w-80 md:w-56 sm:w-36 w-28 top-[-1] right-0"
        />
        <div className="bg-[#FFCC00] h-36 w-36 md:h-48 md:w-48 blur-[60px] md:blur-[100px] absolute top-0 -translate-x-1/2 left-1/2 -translate-y-1/2" />

        <div className="relative w-full flex flex-col items-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            challenges
          </h1>
          <div className="w-full flex flex-col lg:text-xl md:text-lg text-sm items-start mt-8 md:mt-12 lg:mt-24">
            <div>
              <div>
                <h2 className="flex flex-wrap items-center gap-x-4">
                  Lets do some
                  <span className="text-[#E6A2C7]">challenges !</span>
                </h2>
              </div>
            </div>
            <h3 className="mt-4">
              Play against the AI
              {/* <h3 className="text-[#E6A2C7]">Choose a game</h3> */}
            </h3>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-wrap justify-evenly gap-x-6 my-8">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            setChallengeID={setChallengeID}
            id={challenge.id}
            selected={challengeID === challenge.id}
            image={challenge.image}
          />
        ))}
      </div> */}

      {/* <div className="flex justify-center gap-x-8 text-xs md:text-sm flex-col sm:flex-row">
        <input
          ref={ref}
          className="text-white bg-transparent border-2 border-[#E6A2C7] outline-none rounded-sm p-2 my-2"
          type="text"
          placeholder="enter user name"
        />
        <button
          onClick={() => {
            setUsername(ref.current.value);
          }}
        >
          <div className="bg-[#E6A2C7] p-2 my-2 md:p-4 rounded-sm">
            start playing
          </div>
        </button>
      </div> */}

      <LeaderBoard />
    </section>
  );
}
