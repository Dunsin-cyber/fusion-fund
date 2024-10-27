"use client";
import React from "react";
import { useRouter } from "next/router";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import FooterNav from "@/components/Footer";
import Drawer from "@/components/custom/Drawer";
import { useClient } from "@/context";

export default function Home({ children }) {
  const [impactOccurred] = useHapticFeedback();
  const router = useRouter();
  const { drawerTitle, drawerBody, closeDrawer, drawerIsOpen } = useClient();

  const onClose = () => {
    // setIsOpen(!false);
  };
  return (
    <div className="relative h-[screen]">
      <ShootingStars />
      <StarsBackground />
      <div className="mx-1 my-[5%]">{children}</div>
      <Drawer
        isOpen={drawerIsOpen}
        closeDrawer={closeDrawer}
        drawerTitle={drawerTitle}
        drawerBody={drawerBody}
      />
      <FooterNav />
    </div>
  );
}
