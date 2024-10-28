import { NearContext } from "@/wallets/near";
import React, { useEffect, useState } from "react";
import { FaFlag, FaBolt, FaUser, FaHandHolding } from "react-icons/fa";

const DashboardCards = () => {
  const { wallet, signedAccountId } = React.useContext(NearContext);
  const [nearBalance, setNearBalance] = useState(0);
  const getBalance = async () => {
    if (wallet && signedAccountId) {
      console.log(wallet);
      try {
        const balance = await wallet?.getBalance(signedAccountId);
        setNearBalance(balance);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getBalance();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4 p-4  text-white mx-auto rounded-lg">
      {/* Campaigns Card */}
      <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <FaFlag className="text-red-500" />
          <span className="text-2xl font-semibold">1</span>
        </div>
        <p className="mt-2 text-gray-400 text-sm">Campaigns</p>
      </div>

      {/* Streaks Card */}
      <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <FaBolt className="text-orange-500" />
          <span className="text-2xl font-semibold">2</span>
        </div>
        <p className="mt-2 text-gray-400 text-sm">Streaks</p>
      </div>

      {/* Friends Card */}
      <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <FaUser className="text-blue-500" />
          <span className="text-2xl font-semibold">0</span>
        </div>
        <p className="mt-2 text-gray-400 text-sm">Friends</p>
      </div>

      {/* SBT Card */}
      <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <FaHandHolding className="text-blue-500" />
          <span className="text-xl font-semibold">
            {nearBalance.toPrecision(3)}
          </span>
        </div>
        <p className="mt-2 text-gray-400 text-sm">NEAR</p>
      </div>
    </div>
  );
};

export default DashboardCards;
