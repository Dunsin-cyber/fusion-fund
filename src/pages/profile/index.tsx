import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import Background from "@/components/Background";
import Profile from "@/components/Profile";
import Stat from "@/components/Profile/Stat";
import CreateCamp from "@/components/Profile/MyCampaign";
import MyInfo from "@/components/Profile/MyInfo";
import { useAppSelector } from "@/redux/hook";
import { useClient } from "@/context";
import { useGetUser } from "@/functions";

function Index() {
  const router = useRouter();
  const [impactOccurred] = useHapticFeedback();
  const { getUser } = useGetUser();
  const user = useAppSelector((state) => state.profile);

  useEffect(() => {
    getUser();
  }, []);
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
      </div>
    </div>
  );
}
