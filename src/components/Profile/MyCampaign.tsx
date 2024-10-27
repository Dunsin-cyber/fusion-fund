import React from "react";
import Button from "@/components/custom/Button";
import { MdCampaign } from "react-icons/md";
import { CampaignCard } from "../Campaign/Campaigns";
import { useClient } from "@/context";

function CreateCampaign() {
  const { setIsCreateCampOpen } = useClient();
  const campaigns = [
    {
      title: "Fund My Tuition",
      image: "/donation-3.jpg",
      progress: "50",
      daysLeft: "16",
      rewards: [
        { amount: "400", label: "Donors" },
        { amount: "3,600", label: "NEAR" },
        { amount: "4", label: "BOXES" },
      ],
    },
    {
      title: "Help Rebuild Home",
      image: "/donation-4.jpg",
      progress: "23",
      daysLeft: "15",
      rewards: [
        { amount: "3", label: "Donors" },
        { amount: "2,600", label: "USDT" },
        { amount: "2", label: "BOXES" },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <Button
          title={"Create Campaign"}
          isLoading={false}
          onClick={() => setIsCreateCampOpen(true)}
          // onClick={() => console.log("true")}
        />
      </div>
      <h2 className=" relative flex-row z-10 text-2xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span className="mt-1">
          <MdCampaign color="blue" />
        </span>
        <span>My Campaigns</span>
      </h2>

      <div className="p-4 bg-black min-h-screen">
        {campaigns.map((campaign, index) => (
          <CampaignCard key={index} {...campaign} />
        ))}
      </div>
    </div>
  );
}

export default CreateCampaign;
