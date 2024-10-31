"use client";
import React from "react";
import { useRouter } from "next/router";
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import FooterNav from "@/components/Footer";
import Drawer from "@/components/custom/Drawer";
import { useClient } from "@/context";
import CreateCampaignDrawer from "@/components/Profile/CreateCampaignDrawer";
import CampaignDetailDrawer from "@/components/Campaign/CampaignDetailDrawer";
import ConnectWalletDrawer from "@/components/Drawer/ConnectWalletDrawer";
import WriteProfile from "../Drawer/WriteProfile";
import CreateLoanDrawer from "../Drawer/CreateLoanDrawer";

export default function Home({ children }) {
  const [impactOccurred] = useHapticFeedback();
  const router = useRouter();
  const {
    drawerTitle,
    drawerBody,
    drawerIsOpen,
    isCreateCampOpen,
    isCampDetailOpen,
    connectWallet,
    isCreateProfile,
    isLoanModalOpen,
  } = useClient();

  const onClose = () => {
    // setIsOpen(!false);
  };
  return (
    <div className="relative h-[screen]">
      <ShootingStars />
      <StarsBackground />
      <div className="relative mx-1 my-[5%] z-30 ">{children}</div>
      <Drawer
        isOpen={drawerIsOpen}
        drawerTitle={drawerTitle}
        drawerBody={drawerBody}
      />
      <ConnectWalletDrawer connectWallet={connectWallet} />
      <CreateCampaignDrawer isCreateCampOpen={isCreateCampOpen} />
      <CampaignDetailDrawer isCampDetailOpen={isCampDetailOpen} />
      <WriteProfile isCreateProfile={isCreateProfile} />
      <CreateLoanDrawer isLoanModalOpen={isLoanModalOpen} />
      <FooterNav />
    </div>
  );
}
