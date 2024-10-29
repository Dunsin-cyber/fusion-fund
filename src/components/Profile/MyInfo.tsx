import { NearContext } from "@/wallets/near";
import React from "react";
import {
  FaWallet,
  FaCheckCircle,
  FaTimesCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hook";

const UserProfile = () => {
  const router = useRouter();
  const { wallet } = React.useContext(NearContext);
  const user = useAppSelector((state) => state.profile);
  const connectedWallet = "mynearWallet";

  const handleLogOut = () => {
    wallet.signOut();
    router.push("/");
  };

  return (
    <div className="p-6  text-white max-w-sm mx-auto rounded-lg space-y-6">
      {/* User Info */}
      <div className="text-start">
        <h2 className="text-2xl font-bold">{user?.username}</h2>
        <p className="mt-2 text-gray-400 text-sm">{user?.bio}</p>
      </div>

      {/* Wallet Info */}
      <div className="flex items-center justify-between bg-gray-950 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <FaWallet className="text-green-500" />
          <span className="text-sm font-semibold">Connected Wallet:</span>
        </div>
        <span className="text-gray-300 text-xs">{connectedWallet}</span>
      </div>

      {/* KYC Verification Status */}
      <div className="flex items-center justify-between bg-gray-950 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          {user?.kyc_verified ? (
            <>
              <FaCheckCircle className="text-green-500" />
              <span className="text-sm font-semibold">KYC Verified</span>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500" />
              <span className="text-sm font-semibold">KYC Not Verified</span>
            </>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogOut}
        className="flex items-center justify-center w-full bg-red-900 hover:bg-red-700 text-white py-2 rounded-lg transition duration-200"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
