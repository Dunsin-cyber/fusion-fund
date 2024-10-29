import React, { useState, useEffect } from "react";
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
import toast from "react-hot-toast";
import { NearContext } from "@/wallets/near";
import { FusionFundContract } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addCampaignInView } from "@/redux/slice/CampInViewSlice";
import { msToDaysLeft } from "@/lib/DaysLeft";

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
  const { setIsCampDetailOpen, campId } = useClient();
  const [fetching, setFetching] = useState(false);
  const { wallet, signedAccountId } = React.useContext(NearContext);
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state) => state.campInView);

  const handleGetCampaignDetails = async () => {
    try {
      if (wallet) {
        console.log(campId);
        setFetching(true);
        const data = await wallet?.viewMethod({
          contractId: FusionFundContract,
          method: "get_campaign",
          args: { campaign_id: +campId },
        });
        dispatch(addCampaignInView({ ...data, campaign_id: campId }));
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error Fetching Campaign");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    handleGetCampaignDetails();
  }, [campId]);

  return (
    <div className="space-y-6">
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        {/* Image */}
        <img
          src={"/donation-1.png"}
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
            Progress:{" "}
            {(campaign.total_contributions / campaign.amount_required) * 100}%
          </p>
        </div>
        <div>
          <span className="text-green-400 text-sm">
            {msToDaysLeft(campaign.crowdfunding_end_time)} days left
          </span>
        </div>
      </div>

      {/* Reward */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex flex-col items-center">
          <div className="text-blue-400 text-xl font-bold">
            {" "}
            {campaign.contributions.length}
          </div>
          <div className="text-gray-400 text-sm">Donors</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-blue-400 text-xl font-bold">
            {campaign.amount_required.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">NEAR</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-blue-400 text-xl font-bold">
            {" "}
            {campaign.total_contributions.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Donated</div>
        </div>
      </div>

      {/* Donate Button */}
      <div className={"flex justify-center pb-8"}>
        <CustomButton
          disabled={
            campaign.creator === signedAccountId &&
            campaign.total_contributions < campaign.amount_required
          }
          title={
            campaign.creator === signedAccountId
              ? "Claim Donation"
              : "Donate Now"
          }
          isLoading={false}
        />
      </div>
    </div>
  );
}
