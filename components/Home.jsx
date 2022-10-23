import Image from "next/image";
import mypic1 from "../public/brain.png";

export default function Home() {
  return (
    <div className="flex items-center mx-5 md:mx-auto h-screen pt-10" id="Home">
      <div className="sm:px-4 text-white lg:w-4/6 sm:mx-2 md:ml-10 xl:ml-16">
        <h2 className="xl:text-4xl sm:text-3xl text-xl font-bold mb-8">
          SCHOOL OF AI ALGIERS
        </h2>
        <p className="lg:text-sm text-xs md:max-w-2xl lg:leading-6 leading-5">
          School of AI Algiers, to some, is known to be a scientific club at the
          higher school of computer science in Algiers (ESI) that was founded in
          2018. But who are we really? School of AI Algiers is a local community
          of ambitious and curious students who look for a perfect learning path
          in their AI journey through fruitful workshops and talks, amazing
          conferences, fun reading sessions, and exciting AI competitions and
          for that, we are called “AI wizards”
        </p>
      </div>
      <div className="hidden md:flex w-2/5">
        <Image
          className="invisible md:visible bg-cover align-middle"
          alt=""
          src={mypic1}
        />
      </div>
    </div>
  );
}
