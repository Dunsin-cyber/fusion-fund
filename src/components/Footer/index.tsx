import { useState } from "react";
import { AiFillHome, AiFillCrown, AiFillStar } from "react-icons/ai";
import { GiBodySwapping } from "react-icons/gi";
import { useRouter } from "next/router";

const FooterNav = () => {
  const router = useRouter();
  const path = router.pathname;
  console.log(typeof path);

  const [active, setActive] = useState("home");

  const navItems = [
    { id: "/campaigns", label: "Home", icon: <AiFillHome /> },
    { id: "/p2p", label: "P2P", icon: <GiBodySwapping /> },
    { id: "/loans", label: "My Loans", icon: <AiFillCrown /> },
    { id: "/profile", label: "Profile", icon: <AiFillStar /> },
  ];

  return (
    <div className="fixed bottom-0 z-40 w-full bg-black py-4 flex justify-around items-center text-white">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => router.push(item.id)}
          className={`flex flex-col items-center transition duration-200 ${
            path.includes(item.id) ? "scale-125" : "scale-100"
          }`}
        >
          <div
            className={`w-8 h-8 ${
              path.includes(item.id) ? "text-purple-500" : "text-gray-400"
            }`}
          >
            {item.icon}
          </div>
          <span
            className={`text-xs mt-1 ${
              path.includes(item.id) ? "text-white" : "text-gray-400"
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
