import React, { useState, useEffect } from "react";
import axios from "axios";
import Pong from "./Pong";

import { isMobile } from "react-device-detect";
// import AnimatedWall from "./AnimatedWall";
export default function Challenges() {
  const [scoreboard, setScoreboard] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setScoreboard([]);
      axios
        .get("https://92ba-105-235-128-237.eu.ngrok.io/getScore")
        .then((response) => {
          // console.log(response.data);
          setScoreboard(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className=" relative">
      <div className=" min-h-screen w-full flex flex-col md:grid md:grid-cols-28 md:grid-rows-7 relative z-20">
        <img
          alt="bg"
          src="/bgChallenges.png"
          className="w-full h-screen -z-10 absolute top-0 bottom-0 right-0 "
        />
        {/* LEADERBOARD */}

        <div className=" mt-10 md:mt-0 mx-8 md:mx-0 md:col-start-20 md:col-span-4 z-10 md:row-start-2 md:row-span-5  flex justify-start   flex-col items-center">
          <div
            className="w-11/12 h-8 lg:h-12 bg-LEADERBOARD 
              rounded-md flex justify-center  items-center "
          >
            <h3 className="text-white font-light  z-20 text-xxxs lg:text-xxs">
              LeaderBoard
            </h3>
          </div>
          <div
            className={`' w-full  justify-center md:justify-start overflow-hidden flex-wrap border-2 border-LEADERBOARD -mt-6 z-10 pt-10 pb-4 h-full  flex flex-row  md:flex-col flex-wrap'
              }'
               `}
          >
            {scoreboard &&
              scoreboard
                .sort((a, b) => b.score - a.score)
                .slice(0, isMobile ? 5 : 20)
                .map(({ score, username }, rank) => (
                  <div
                    key={rank}
                    className="text-white text-xxxs lg:mx-2 md:mx-1 md:my-1 mx-8 my-2 "
                  >
                    <p>{`${rank + 1}. ${username} -- ${score}`}</p>
                  </div>
                ))}
          </div>
        </div>
        <div className="bg-opacity-25 h flex-1 md:row-start-2 md:row-span-5 z-20 md:col-start-3 md:col-span-20  ">
          <Pong setLoading={setLoading} />
        </div>
      </div>
      {/* <AnimatedWall load={load} setload={setload} /> */}
    </div>
  );
}
