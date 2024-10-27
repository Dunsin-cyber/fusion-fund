import { useState } from "react";
import { AiFillHome, AiFillCrown, AiFillStar } from "react-icons/ai";
import { GiBodySwapping } from "react-icons/gi";

const FooterNav = () => {
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: <AiFillHome /> },
    { id: "p2p", label: "P2P", icon: <GiBodySwapping /> },
    { id: "seasons", label: "Seasons", icon: <AiFillCrown /> },
    { id: "profile", label: "Profile", icon: <AiFillStar /> },
  ];

  return (
    <div className="fixed bottom-0 z-40 w-full bg-black py-4 flex justify-around items-center text-white">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex flex-col items-center transition duration-200 ${
            active === item.id ? "scale-125" : "scale-100"
          }`}
        >
          <div
            className={`w-8 h-8 ${
              active === item.id ? "text-purple-500" : "text-gray-400"
            }`}
          >
            {item.icon}
          </div>
          <span
            className={`text-xs mt-1 ${
              active === item.id ? "text-white" : "text-gray-400"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FooterNav;
