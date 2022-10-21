import Link from 'next/link';
import image from 'next/image';
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textColor, setTextColor] = useState('white');

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor('transparent');
        setTextColor('#ffffff');
      } else {
        setColor('transparent');
        setTextColor('#ffffff');
      }
    };
    window.addEventListener('scroll', changeColor);
  }, []);

  return (
    
    <div
    style={{ backgroundImage: `url(${require('../public/Asset.png')})`, backgroundColor: `${color}` }}
    className='fixed left-0 top-0 w-full z-10 ease-in duration-300'
    >
      <div className='flex justify-between items-center p-5 text-white'>
        <Link href='/'>
              <a class="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900" href="/">
        <img src="/assets/soaif.png"  alt="" loading="lazy" />
      </a>
        </Link>
        <ul style={{ color: `${textColor}` }} className='hidden sm:flex'>
          <li className='p-4 xl:text-xl lg:text-lg md:text-xs sm:text-xs font-bold hover:text-amber-400'>
            <Link href='/#Home'>Home</Link>
          </li>
          <li className='p-4 xl:text-xl lg:text-lg md:text-xs sm:text-xs font-bold hover:text-amber-400'>
            <Link href='/#EventsS'>Events</Link>
          </li>
          <li className='p-4 xl:text-xl lg:text-lg md:text-xs sm:text-xs font-bold hover:text-amber-400'>
            <Link href='/#Challenges'>Challenges</Link>
          </li>
          <li className='p-4 xl:text-xl lg:text-lg md:text-xs sm:text-xs font-bold hover:text-amber-400'>
            <Link href='/#FAQ'>FAQ</Link>
          </li>
          <li className='p-4 xl:text-xl lg:text-lg md:text-xs sm:text-xs font-bold hover:text-amber-400'>
            <Link href='/contact'>Contact us</Link>
          </li>          
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className='block sm:hidden z-10'>
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black background text-center ease-in duration-300'
              : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black background text-center ease-in duration-300'
          }
        >
          <ul>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/#Home'>Home</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/#EventsS'>Events</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/#Challenges'>Challenges</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/#FAQ'>FAQ</Link>
            </li>
            <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
              <Link href='/contact'>Contact us</Link>
            </li>          
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
