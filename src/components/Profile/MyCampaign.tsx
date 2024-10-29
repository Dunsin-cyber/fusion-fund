import React from "react";
import Button from "@/components/custom/Button";
import { MdCampaign } from "react-icons/md";
import { CampaignCard } from "../Campaign/Campaigns";
import { useClient } from "@/context";
import { useAppSelector } from "@/redux/hook";

function CreateCampaign() {
  const { setIsCreateCampOpen } = useClient();
  const myCampaigns = useAppSelector((state) => state.myCampaign);

  const pics = [
    "/donation-1.png",
    "/donation-2.jpg",
    "/donation-3.jpg",
    "/donation-4.jpg",
    // "donation-5.jpg",
    // "donation-6.jpg",
    // "donation-7.jpg",
    // "donation-8.jpg",
    // "donation-9.jpg",
    // "donation-10.jpg",
    // "donation-11.jpg",
  ];

  const getRandomImage = () => {
    return pics[Math.floor(Math.random() * pics.length)];
  };

  const filteredCampaign = myCampaigns?.map((camp) => ({
    ...camp, // Spread existing properties of each campaign
    images: getRandomImage(),
  }));

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
        {filteredCampaign?.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}

export default CreateCampaign;
