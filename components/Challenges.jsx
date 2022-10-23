import { useState, useRef } from "react";
import ChallengeCard from "./ChallengeCard";

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
    <section className="relative min-h-screen text-white p-6 md:p-16 overflow-hidden" id="Challenges">
        <img
          src="/assets/Group6.png"
          className="invisible md:visible absolute xl:w-80 md:w-56 sm:w-36 w-28 top-5 left-0"
        />
        <img
          src="/assets/Group5.png"
          className="invisible md:visible absolute lg:w-80 md:w-56 sm:w-36 w-28 top-[-1] right-0"
        />
      <div className="bg-[#FFCC00] h-36 w-36 md:h-48 md:w-48 blur-[60px] md:blur-[100px] absolute top-0 -translate-x-1/2 left-1/2 -translate-y-1/2" />

      <div className="relative w-full flex flex-col items-center">
        <h1 className=" text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          challenges
        </h1>
        <div className="w-full flex flex-col items-start mt-8 md:mt-12 lg:mt-24">
          <div>
            <div className="lg:text-xl md:text-lg text-sm   ">
              <h2>lets do some</h2>
              <h2 className="text-[#E6A2C7] lg:text-2xl sm:text-xl">challenges !</h2>
            </div>
          </div>
          <h3 className="lg:text-xl md:text-lg text-sm   mt-4">
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

      <div className="flex justify-center  gap-x-8 text-xs md:text-sm flex-col md:flex-row">
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
      </div>
    </section>
  );
}
