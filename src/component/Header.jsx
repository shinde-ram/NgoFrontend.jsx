import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoHome ,IoListSharp,IoNewspaperSharp,IoInformationCircle,IoTrophy} from "react-icons/io5";
import { MdContactMail,MdAccountCircle  } from "react-icons/md";
import mainlogo from "../images/newlogo2.png"

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { href: '/', label: 'Home', logo: IoHome },
    { href: '/list', label: "NGO's" ,logo: IoListSharp},
    { href: '/events', label: 'Events',logo:IoNewspaperSharp },
    { href: '/about', label: 'About Us' ,logo:IoInformationCircle},
    { href: '/ourimpact', label: 'Our Impact' ,logo:IoTrophy},
    { href: '/contactus', label: 'Contact Us',logo:MdContactMail },
    {href : '/account', label :'Account', logo:MdAccountCircle },
  ];

  return (
    <div className="fixed top-0 left-0 w-[15%] bg-violet-800 text-white flex flex-col justify-between p-4 h-screen">
      <div>
        {/* Logo */}
        <div className="flex items-center my-4 justify-center">
          <img src={`${mainlogo}`} alt="logo" className="w-[80%] rounded-full border-2 border-black" />
        </div>
        <hr className="border-0 h-[1px] w-full bg-white" />

        {/* Navigation Links */}
        <nav className="flex flex-col justify-evenly text-xl font-medium mt-10">
          {navLinks.map((link) => (
            <Link
              to={link.href}
              key={link.href} 
              className={`hover:text-black transition duration-300 ease-in-out transform hover:scale-105 p-[10%] hover:bg-violet-600  flex items-center ${
                pathname === link.href ? 'text-yellow-400 font-bold' : ''
              }`}
            >
              <div className="flex items-center justify-center">
                {link.logo && <link.logo className="inline-block  text-gray-300" />} {/* Conditionally render the logo */}
                <span className="ps-3">{link.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Header;
