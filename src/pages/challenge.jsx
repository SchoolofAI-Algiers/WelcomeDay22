import React, { useState } from 'react'
import { data } from 'data.json'
export default function Challenges() {
  console.log(data);
    const players = data.stringify();
      
      const [width, setWidth] = useState(128);
      if (typeof window != undefined) {
        // browser code
        const [width, setWidth] = useState(1280);
      }
      else {
        const [width, setWidth] = useState(128);
      }
      
      const breakpoint = 720;
    
      React.useEffect(() => {
        console.log('hi');
        setWidth(window.innerWidth);
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);
    
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
      }, []);
    
       return (
    <div className='  min-h-screen w-full flex flex-col md:grid md:grid-cols-28 md:grid-rows-7 '>
    <img src='/bgChallenges.png' className='w-full h-screen -z-10 absolute top-0 right-0 ' />
    {/* LEADERBOARD */}

    <div className=' md:mt-0 mx-8 md:mx-0 md:col-start-22 md:col-span-4  md:row-start-2 md:row-span-5  flex justify-start   flex-col items-center'>
        <div className='w-9/12 h-8 lg:h-12 bg-LEADERBOARD 
        rounded-md flex justify-center z-10 items-center '> 
        <h3 className='text-white font-normal font-semibold   md:text-base   xl:text-lg'>leadBoard</h3></div>
        <div className ={`' w-full border-2 border-LEADERBOARD -mt-6 z-9 pt-8 h-full  flex flex-row space-x-2 md:flex-col flex-wrap'
        }'
         `}>
        { players.sort((a,b) => b.points-a.points).map((player,rank) => (

           <div key={player.id} className='text-white lg:pl-4 text-sm md:text-md xl:text-lg '> {`${rank+1} . ${player.name} ${width > breakpoint?player.points+'pts':''}`}</div>
        ))
        }
        </div>
    </div>
    {/*game place */}
    <div className='bg-rose-500 bg-opacity-25 flex-1 md:row-start-2 md:row-span-5 md:col-start-3 md:col-span-20  '>
         
    </div>
   
    </div>
  )
}
