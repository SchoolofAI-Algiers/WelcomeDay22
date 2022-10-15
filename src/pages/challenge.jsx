import React from 'react'

export default function Challenges() {
    const players = [
        {
                id:1,
                name:'yassine' ,
                points:100
        },
        {
            id:2,
            name:'wajih' ,
            points:90
        },
        {
        id:3,
        name:'yasser' ,
        points:150
        }

]
  return (
    <div className='  h-screen w-full grid grid-cols-28 grid-rows-7 '>
    <img src='/bgChallenges.png' className='w-full h-screen -z-10 absolute top-0 right-0 ' />
    {/* LEADERBOARD */}

    <div className=' col-start-22 col-span-4 row-start-2 row-span-5  flex justify-start   flex-col items-center'>
        <div className='w-9/12 h-12 bg-LEADERBOARD 
        rounded-md flex justify-center z-10 items-center '> 
        <h3 className='text-white font-normal lg:font-semibold  text-xs md:text-base   xl:text-lg'>LEADERBOARD</h3></div>
        <div className =' w-full border-2 border-LEADERBOARD -mt-6 z-9 pt-8 h-full'>
        { players.sort((a,b) => b.points-a.points).map((player,rank) => (

           <div key={player.id} className='text-white pl-4 text-sm md:text-md xl:text-lg '> {`${rank+1} . ${player.name} ${player.points} pts`}</div>
        ))
        }
        </div>
    </div>
   
    </div>
  )
}
