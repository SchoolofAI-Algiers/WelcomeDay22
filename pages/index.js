import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import mypic1 from "../public/brain.png";
import Faq from "../components/Faq.jsx";
import Challenges from "../components/Challenges.jsx";
import EventsSection from "../components/eventSection";

export default function Home() {
  return (
    <div>
      <div className="md:flex items-center lg:mt-20 mt-32 mb-8 " id="Home">
        {/* Overlay ontent flex py-2*/}
        <div className="p-4 text-white  lg:w-4/6 z-[2] xl:mt-1 mx-2  md:ml-10">
          <h2 className="lg:text-4xl sm:text-3xl text-xl font-bold mb-3">
            SCHOOL OF AI ALGIERS
          </h2>
          <p className="lg:text-sm text-xs    md:max-w-2xl  mt-4">
            School of AI Algiers is a local community of developers students and
              lovers of Artificial intelligence in Algiers started in 2018. We are
              a scientific club at the higher school of computer science ( ESI
              Algiers ). Expect from us everything from workshops, talks,
              conferences, reading sessions, AI competitions and so much more!
              </p>

        </div>
        <div className=" hidden md:flex w-2/5 "> 
          <Image className="invisible md:visible bg-cover align-middle" alt="" src={mypic1} />
        </div>

      </div>
      <EventsSection />
      <Challenges />
      <Faq />
    </div>
  );
}
