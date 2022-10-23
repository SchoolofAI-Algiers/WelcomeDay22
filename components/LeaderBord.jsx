import React, { useState } from "react";
import data from "./data.json";

export default function Challenges() {
  const players = data;
  const [load, setload] = useState(true);
  const [width, setWidth] = useState(128);

  const breakpoint = 720;

  React.useEffect(() => {
    console.log("hi");
    setWidth(window.innerWidth);
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className=" relative">
      <div className=" min-h-screen w-full flex flex-col md:grid md:grid-cols-28 md:grid-rows-7 relative z-10">
        <img
          src="/bgChallenges.png"
          className="w-full h-screen -z-10 absolute top-0 right-0 "
        />
        {/* LEADERBOARD */}

        <div className=" mt-10 md:mt-0 mx-8 md:mx-0 md:col-start-20 md:col-span-4 z-10 md:row-start-2 md:row-span-5  flex justify-start   flex-col items-center">
          <div
            className="w-11/12 h-8 lg:h-12 bg-LEADERBOARD 
              rounded-md flex justify-center  items-center "
          >
            <h3 className="text-white font-light  z-10 text-xxxs lg:text-xxs">
              LeaderBoard
            </h3>
          </div>
          <div
            className={`' w-full  justify-center md:justify-start flex-wrap border-2 border-LEADERBOARD -mt-6 z-10 pt-10 pb-4 h-full  flex flex-row  md:flex-col flex-wrap'
              }'
               `}
          >
            {players
              .sort((a, b) => b.points - a.points)
              .map((player, rank) => (
                <div
                  key={player.id}
                  className="text-white text-xxxs lg:mx-2 md:mx-1 md:my-1 mx-8 my-2 "
                >
                  {" "}
                  {`${rank + 1}. ${player.name} ${
                    width > breakpoint ? player.points + "p" : ""
                  }`}
                </div>
              ))}
          </div>
        </div>
        {/*game place */}
        <div className="bg-opacity-25  flex-1 md:row-start-2 md:row-span-5 md:col-start-3 md:col-span-20  "></div>
      </div>

      {
        <div className="w-full flex  bg-cover h-screen overflow-hidden absolute top-0 left-0 z-50">
          <img
            src="bgChallenges.png"
            onClick={() => {
              setload(!load);
            }}
            className={`md:w-1/2 sm:w-0  z-40 
  ${
    !load &&
    "transition ease-in-out delay-400 duration-1000  translate-x-[-50rem] "
  }   `}
          />
          <img
            src="bgChallenges.png"
            onClick={() => {
              setload(!load);
            }}
            className={`md:w-1/2 sm:w-full  bg-cover z-40 
  ${
    !load &&
    "transition ease-in-out delay-400 duration-1000 translate-x-[50rem] "
  }   `}
          />
        </div>
      }
    </div>
  );
}
