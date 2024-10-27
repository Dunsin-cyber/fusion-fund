"use client";
import React from "react";
import Button from "@/components/custom/Button";
import { useRouter } from "next/router";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const words = `Your Funding Solution in one Place`;

export default function Home() {
  const [impactOccurred] = useHapticFeedback();
  const router = useRouter();

  return (
    <div>
      <ShootingStars />
      <StarsBackground />
      <div className="flex flex-col space-y-4 justify-center items-center mt-[30vh] ">
        <TextGenerateEffect words={words} />
        <Button
          title="Get Started"
          isLoading={false}
          onClick={() => {
            impactOccurred("rigid");
            router.push("/campaigns");
          }}
        />
      </div>
    </div>
  );
}
