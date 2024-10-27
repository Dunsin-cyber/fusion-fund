import React from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useClient } from "@/context";
import CustomButton from "@/components/custom/Button";

function CampaignDetailDrawer({ isCampDetailOpen }) {
  const { closeDrawer } = useClient();
  return (
    <DrawerRoot
      size="lg"
      open={isCampDetailOpen}
      onOpenChange={closeDrawer}
      placement={"bottom"}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" style={{ display: "none" }}>
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent roundedTop={"25"} roundedBottom={undefined}>
        <DrawerBody>
          <Details />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
}

export default CampaignDetailDrawer;

function Details() {
  const { setIsCampDetailOpen } = useClient();

  const campaign = {
    title: "Fund My Tuition",
    image: "/donation-1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar risus ullamcorper augue sodales, in consequat libero mattis. Nunc sed pulvinar ex. Donec at vestibulum quam. Duis ullamcorper, nibh vel ullamcorper egestas, mi eros ullamcorper est, vel ultrices urna lacus nec nibh. Aenean enim odio, elementum id congue eu, ultricies et magna. Fusce sed leo in mauris auctor imperdiet. Suspendisse aliquam lacinia fermentum. Maecenas lobortis, felis sed maximus dignissim, arcu felis sagittis turpis, vitae consequat quam justo ac erat. Phasellus erat libero, efficitur vel ultrices nec, hendrerit eleifend lacus. Cras id aliquet nulla, at dapibus tellus.",
    progress: "50",
    daysLeft: "16",
    rewards: [
      { amount: "400", label: "Donors" },
      { amount: "3,600", label: "NEAR" },
      { amount: "4X$%", label: "CODE" },
    ],
  };
  return (
    <div className="space-y-6">
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        {/* Image */}
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Cancel Icon */}
        <button
          className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 p-1 rounded-full hover:bg-opacity-100"
          onClick={() => setIsCampDetailOpen(false)} // replace `handleCancel` with your cancel function
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="text-3xl font-bold">{campaign.title}</div>
      <div className="text-gray-500">{campaign.description}</div>

      {/* Progress */}
      <div className="flex justify-between">
        <div className="text-white mb-4">
          <p className="text-gray-400 text-sm">
            Progress: {campaign.progress}%
          </p>
        </div>
        <div>
          <span className="text-green-400 text-sm">
            {campaign.daysLeft} days left
          </span>
        </div>
      </div>

      {/* Reward */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {campaign.rewards.map((reward, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-blue-400 text-xl font-bold">
              {reward.amount}
            </div>
            <div className="text-gray-400 text-sm">{reward.label}</div>
          </div>
        ))}
      </div>

      {/* Donate Button */}
      <div className={"flex justify-center pb-8"}>
        <CustomButton title="Donate Now" isLoading={false} />
      </div>
    </div>
  );
}
