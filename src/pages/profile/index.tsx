import React from "react";
import { useRouter } from "next/router";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import Background from "@/components/Background";
import Profile from "@/components/Profile";
import Stat from "@/components/Profile/Stat";
import CreateCamp from "@/components/Profile/MyCampaign";
import MyInfo from "@/components/Profile/MyInfo";

function Index() {
  const router = useRouter();
  const [impactOccurred] = useHapticFeedback();
  return (
    <Background>
      <div className="flex flex-col space-y-10">
        <Profile />
        <MyInfo />
        <Stat />
        <CreateCamp />
      </div>
    </Background>
  );
}

export default Index;
