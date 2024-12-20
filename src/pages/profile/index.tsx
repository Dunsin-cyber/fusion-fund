import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import Background from "@/components/Background";
import Profile from "@/components/Profile";
import Stat from "@/components/Profile/Stat";
import CreateCamp from "@/components/Profile/MyCampaign";
import MyInfo from "@/components/Profile/MyInfo";
import { useAppSelector } from "@/redux/hook";
import { useClient } from "@/context";
import { useGetUser, useGetMyCampigns } from "@/functions";
import { NearContext } from "@/wallets/near";
import { FaSignOutAlt } from "react-icons/fa";

function Index() {
  const router = useRouter();
  const [impactOccurred] = useHapticFeedback();
  const { getUser } = useGetUser();
  const { getMyCampaigns } = useGetMyCampigns();
  const user = useAppSelector((state) => state.profile);
  const { wallet, signedAccountId } = useContext(NearContext);

  useEffect(() => {
    getUser();
    getMyCampaigns();
  }, [signedAccountId]);

  return (
    <Background>
      {user ? (
        <div className="flex flex-col space-y-10">
          <Profile />
          <MyInfo />
          <Stat />
          <CreateCamp />
        </div>
      ) : (
        <ProfileSetupCard />
      )}
    </Background>
  );
}

export default Index;

function ProfileSetupCard() {
  const { setIsCreateProfile } = useClient();
  const { wallet } = React.useContext(NearContext);
  const router = useRouter();

  const handleLogOut = () => {
    wallet.signOut();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg text-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-400">
          Set up your profile
        </h2>
        <p className="text-gray-300">
          To get started, please complete your profile setup.
        </p>
        <button
          onClick={() => setIsCreateProfile(true)}
          className="w-full h-12 mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Set Up Profile
        </button>
        {/* Logout Button */}
        <button
          onClick={handleLogOut}
          className="flex items-center justify-center w-full bg-red-900 hover:bg-red-700 text-white py-2 rounded-lg transition duration-200"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
