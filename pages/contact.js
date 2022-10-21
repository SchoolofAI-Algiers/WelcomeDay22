import Image from "next/image";
import insta from "../public/insta.png";
import fb from "../public/fb.png";
import dis from "../public/dis.png";
import link1 from "../public/link.png";
import tit from "../public/tit.png";
import Link from 'next/link';
export default function contact() {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-8 lg-flex-row mb-10  md:mt-[10rem] mt-[5rem]">
      <h1 className="lg:text-4xl sm:text-3xl text-2xl font-bold mt-16 mb-7 text-white">Join Us</h1>
      <div className="flex md:flex-row flex-col items-center justify-center md:space-x-16 md:space-y-0 space-y-8 lg-flex-col ">
      <a target="_blank" href="https://www.instagram.com/soai_algiers/" rel="noopener noreferrer">
      <div className="relative w-32 h-32 overflow-hidden rounded-full ring-2 ring-pink-500 ring-offset-4">
        <Image
          objectFit="cover"
          src={insta}
          alt="Instagram"
          layout="fill"
          priority
        />
      </div>
      </a>
      <a target="_blank" href="https://discord.gg/uMYzAWsv45" rel="noopener noreferrer">
      <div className="relative w-32 h-32 overflow-hidden rounded-full ring-2 ring-blue-500 ring-offset-4">
        <Image
          objectFit="cover"
          src={dis}
          alt="Discord"
          layout="fill"
          priority
        />
      </div>
      </a>
      <a target="_blank" href="https://www.facebook.com/SchoolofAIAlgiers/" rel="noopener noreferrer">
      <div className="relative w-32 h-32 overflow-hidden rounded-full ring ring-blue-500 ring-offset-4">
        <Image
          objectFit="cover"
          src={fb}
          alt="Facebook"
          layout="fill"
          priority
        />
      </div>
      </a>
      <a target="_blank" href="https://twitter.com/soaialgiers" rel="noopener noreferrer">
      <div className="relative w-32 h-32 overflow-hidden rounded-full ring ring-blue-500 ring-offset-4">
        <Image
          objectFit="cover"
          src={tit}
          alt="Twitter"
          layout="fill"
          priority
        />
      </div>
      </a>
      <a target="_blank" href="https://fr.linkedin.com/company/school-of-ai-algiers" rel="noopener noreferrer">
      <div className="relative w-32 h-32 overflow-hidden rounded-full ring-2 ring-blue-300 ring-offset-4">
        <Image
          objectFit="cover"
          src={link1}
          alt="Linked In"
          layout="fill"
          priority
        />
      </div>
      </a>
    </div>
    </div>
  );
}
