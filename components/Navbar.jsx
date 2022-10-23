import { Link } from "react-scroll";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const [bg, setBg] = useState("bg-transparent");
  const [txt, setTxt] = useState("text-white");
  const [logo, setLogo] = useState("/soai_logo_white.svg");

  const navlinks = ["Home", "Events", "Challenges", "FAQ", "Contact"];

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setBg("bg-white");
        setLogo("/soai_logo_blue.svg");
        setTxt("text-blue");
      } else {
        setBg("bg-transparent");
        setLogo("/soai_logo_white.svg");
        setTxt("text-white");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 w-full z-[100] ease-in duration-300 ${bg}`}
    >
      <div className="flex justify-between items-center px-5 text-white">
        <Link
          to="Home"
          offset={-68}
          className="cursor-pointer sm:w-auto w-40 -my-2 block text-gray-900 hover:text-gray-900 focus:text-gray-900 justify-center items-center"
        >
          <Image src={logo} alt="" width="200" height="80" />
        </Link>
        <div className={`hidden lg:flex ${txt}`}>
          {navlinks.map((section) => (
            <Link
              to={section}
              key={section}
              offset={-68}
              className="px-6 lg:text-base cursor-pointer font-bold hover:text-amber-400"
            >
              {section}
            </Link>
          ))}
        </div>
        {/* Mobile Button */}
        <div onClick={handleNav} className="lg:hidden z-10 cursor-pointer">
          {nav ? (
            <AiOutlineClose size={30} className="text-white" />
          ) : (
            <AiOutlineMenu size={30} className={txt} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "lg::hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black background text-center ease-in duration-300"
              : "lg::hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black background text-center ease-in duration-300"
          }
        >
          <div className="space-y-4">
            {navlinks.map((section) => (
              <Link
                onClick={handleNav}
                to={section}
                key={section}
                className="p-4 text-2xl sm:text-4xl flex flex-col hover:text-gray-500"
              >
                {section}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
