import ImageEvent from "./ImageEvent";

function Events() {
  const events = [
    {
      title: "Reading Sessions",
      desc: "We discuss the content of a scientific paper",
      date: "Each Friday 7pm ",
      picture: "bg-event1",
      width: "md:w-5/12 w-full",
    },
    {
      title: "AI2E",
      desc: "Full series of workshops ",
      date: "Each year",
      picture: "bg-event2",
      width: "md:w-6/12 w-full",
    },
    {
      title: "HAICK",
      desc: "An AI hackathon",
      date: "Each year",
      picture: "bg-event3",
      width: "md:w-6/12 w-full",
    },
    {
      title: "Guide d’achat",
      desc: "Les meilleurs ensembles Apple",
      date: "30/12/2021",
      picture: "bg-event4",
      width: "md:w-5/12 w-full",
    },
  ];
  return (
    <div>
      <div
        className="relative min-h-screen text-white p-6 md:p-10 overflow-hidden"
        id="Events"
      >
        {/* {Header} */}
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
            Events
          </h1>
          <div className="w-full  md:ml-20  flex flex-col items-start mt-8   md:mt-12 lg:mt-24">
            <p className="text-lg md:text-2xl lg:text-2xl xl:text-2xl mt-10">
              What we do in SOIA?
            </p>
            <div className="lg:w-3/5  md:w-3/4 w-full">
              <p className="lg:text-sm text-xs    md:max-w-2xl mt-4">
                We organize a veriaty of amazing and exciting AI events, in
                which we aim to help you to learn and develop in the field of
                AI, all while having fun and enjoying our selfes
              </p>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="   my-10">
          <div className="md:flex  justify-around my-10 flex-wrap  w-full ">
            {events.map((item, index) => {
              return (
                <ImageEvent
                  key={index}
                  src={item.picture}
                  title={item.title}
                  date={item.date}
                  desc={item.desc}
                  width={item.width}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
