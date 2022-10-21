import { useState, useRef } from "react";
import ChallengeCard from "../components/ChallengeCard";
import { Pong } from "../components/Pong";

export default function Challenges() {
  const ref = useRef();
  const [username, setUsername] = useState("");
  const [challengeID, setChallengeID] = useState();
  const challenges = [
    {
      id: 1,
      image:
        "https://cdn.shopify.com/s/files/1/0747/3829/products/mL4465_1024x1024.jpg?v=1591827152",
    },
    {
      id: 2,
      image:
        "https://cdn.shopify.com/s/files/1/0747/3829/products/mL4465_1024x1024.jpg?v=1591827152",
    },
    {
      id: 3,
      image:
        "https://cdn.shopify.com/s/files/1/0747/3829/products/mL4465_1024x1024.jpg?v=1591827152",
    },
  ];

  return (
    <section className="background min-h-screen text-white p-6 md:p-16 overflow-hidden">
      <div className="bg-[#FFCC00] h-36 w-36 md:h-48 md:w-48 blur-[60px] md:blur-[100px] absolute top-0 -translate-x-1/2 left-1/2 -translate-y-1/2" />

      <div className="relative w-full flex flex-col items-center">
        <h1 className="font-arcade text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          challenges
        </h1>
        <div className="w-full flex flex-col items-start mt-8 md:mt-12 lg:mt-24">
          <div>
            <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-arcade">
              <h2>let's do some</h2>
              <h2 className="text-[#E6A2C7]">challenges !</h2>
            </div>
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mt-4">
            Play againt the AI! Choose a game
          </h3>
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly my-8">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            setChallengeID={setChallengeID}
            id={challenge.id}
            selected={challengeID === challenge.id}
            image={challenge.image}
          />
        ))}
      </div>

      <div className="flex justify-center font-arcade gap-x-8 text-xs md:text-sm flex-col md:flex-row">
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
          <Pong />
        </button>
      </div>
    </section>
  );
}
