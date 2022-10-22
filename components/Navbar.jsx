import { Link } from "react-scroll";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const navlinks = ["Home", "Events", "Challenges", "FAQ", "Contact"];

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("transparent");
        setTextColor("#ffffff");
      } else {
        setColor("transparent");
        setTextColor("#ffffff");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${require("../public/Asset.png")})`,
        backgroundColor: `${color}`,
      }}
      className="fixed left-0 top-0 w-full z-50 ease-in duration-300"
    >
      <div className="flex justify-between items-center px-5 text-white">
        <Link
          to="Home"
          offset={-80}
          className="cursor-pointer invisible sm:visible block text-gray-900 hover:text-gray-900 focus:text-gray-900 justify-center items-center"
        >
          <Image src="/soai_logo_white.svg" alt="" width="250" height="100" />
        </Link>
        <div style={{ color: `${textColor}` }} className="hidden lg:flex">
          {navlinks.map((section) => (
            <Link
              to={section}
              key={section}
              offset={-80}
              className="px-6 lg:text-base cursor-pointer font-bold hover:text-amber-400"
            >
              {section}
            </Link>
          ))}
        </div>
        {/* Mobile Button */}
        <div onClick={handleNav} className="lg:hidden z-10">
          {nav ? (
            <AiOutlineClose size={30} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={30} style={{ color: `${textColor}` }} />
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
