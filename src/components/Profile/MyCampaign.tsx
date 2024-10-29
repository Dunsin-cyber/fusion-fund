import React from "react";
import Button from "@/components/custom/Button";
import { MdCampaign } from "react-icons/md";
import { CampaignCard } from "../Campaign/Campaigns";
import { useClient } from "@/context";
import { useAppSelector } from "@/redux/hook";

function CreateCampaign() {
  const { setIsCreateCampOpen } = useClient();
  const myCampaigns = useAppSelector((state) => state.myCampaign);

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
        {myCampaigns?.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}

export default CreateCampaign;
