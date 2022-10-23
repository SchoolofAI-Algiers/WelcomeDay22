export default function AnimatedWall({ load, setload }) {
  return (
    <div className="w-full flex  bg-cover h-screen overflow-hidden absolute top-0 left-0 z-50">
      <img
        alt="right"
        src="./assets/gauche2.png"
        onClick={() => {
          setload(!load);
        }}
        className={`  md:w-full scale-[1.11] -mt-6 sm:w-0  z-40  ml-[9rem]
  ${
    !load &&
    "transition ease-in-out delay-400 duration-1000  translate-x-[-50rem] "
  }   `}
      />
      <img
        alt="left"
        src="./assets/droite2.png"
        onClick={() => {
          setload(!load);
        }}
        className={` md:w-full sm:w-full -ml-[25rem]  bg-cover z-40 
  ${
    !load &&
    "transition ease-in-out delay-400 duration-1000 translate-x-[50rem] "
  }   `}
      />
    </div>
  );
}
