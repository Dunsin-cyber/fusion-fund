import React from "react";
import { Header } from "@/components/Campaign/Header";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Background from "@/components/Background";
import Task from "@/components/Campaign/Task";
import Campaigns from "@/components/Campaign/Campaigns";

function index() {
  const router = useRouter();
  const [impactOccurred] = useHapticFeedback();
  return (
    <Background>
      <div
        onClick={() => {
          impactOccurred("medium");
          router.push("/");
        }}
      >
        <IoIosArrowBack color="white" />
      </div>
      <div className="flex flex-col space-y-10">
        <Header />
        <Task />
        <Campaigns />
      </div>
    </Background>
  );
}

export default index;
