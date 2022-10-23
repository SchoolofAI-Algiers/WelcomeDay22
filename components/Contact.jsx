import {
  FaLocationArrow,
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Image from "next/image";

const socials = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/SchoolofAIAlgiers/",
    icon: <FaFacebook size={30}></FaFacebook>,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/soai_algiers",
    icon: <RiInstagramFill size={30}></RiInstagramFill>,
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/company/school-of-ai-algiers/",
    icon: <FaLinkedin size={30}></FaLinkedin>,
  },
  {
    name: "Twitter",
    link: "https://twitter.com/soaialgiers",
    icon: <FaTwitter size={30}></FaTwitter>,
  },
  {
    name: "Youtube",
    link: "https://m.youtube.com/channel/UChFa3XnZYZ94tkjfJ5CnPOA",
    icon: <FaYoutube size={30}></FaYoutube>,
  },
];

export default function Contact() {
  return (
    <div className="text-white" id="Contact">
      <div className="lg:grid flex flex-col mx-4 sm:mx-28 gap-y-10 lg:grid-cols-2">
        <div className="">
          <p className="lg:text-2xl font-bold text-center">Contact us !</p>
          <div className="my-8 space-y-8 sm:space-y-0 m-auto">
            <div className="flex items-center my-5">
              <FaLocationArrow
                className="md:text-4xl hidden sm:block"
                size={30}
                color="#FFF"
              />
              <p className="font-light lg:text-md text-xxs sm:ml-5">
                Higher National School of Computer Science Oued Smar, Alger
              </p>
            </div>
            <div className="flex items-center my-5">
              <FaEnvelope
                className="md:text-4xl text-xl hidden sm:block"
                size={30}
                color="#FFF"
              />
              <p className="font-light lg:text-md text-xxs sm:ml-5">
                schoolofai.algiers@esi.dz
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8 flex flex-col items-center sm:m-0">
          <div className="pb-14 lg:text-2xl font-bold text-center">
            Follow us
          </div>
          <div className="flex gap-x-6">
            {socials.map((social, i) => (
              <div key={i} className="flex items-center justify-center">
                <a href={social.link} target="_blank" rel="noreferrer">
                  {social.icon}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-12">
        <Image src="/soai_logo_white.svg" alt="" width="250" height="100" />
      </div>
    </div>
  );
}
