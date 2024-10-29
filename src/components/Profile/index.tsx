import React, { useContext, useEffect } from "react";
// import Image from "next/image";
// import Logo from "./logo.png";
import { MdOutlineVerified } from "react-icons/md";
import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import { NearContext } from "@/wallets/near";
import { useAppSelector } from "@/redux/hook";
import { msToDaysLeft } from "@/lib/DaysLeft";

function Profile() {
  const { signedAccountId } = useContext(NearContext);
  const myCamp = useAppSelector((state) => state.myCampaign);

  const latestCamp =
    myCamp.length > 0
      ? myCamp?.reduce((max, campaign) =>
          campaign.total_contributions > max.total_contributions
            ? campaign
            : max
        )
      : null;

  return (
    <div>
      {/* first card */}
      <div className="bg-gray-950 rounded-lg pb-4 px-3 mx-3">
        <div className="flex flex-col justify-center items-center ">
          <div className="animate-beep">
            <img src="/logo.png" alt="logo" className="w-40 h-40 " />
          </div>

          {signedAccountId && (
            <span className="space-x-3 flex items-center ">
              <p>
                {signedAccountId.length > 20
                  ? signedAccountId.slice(0, 20)
                  : signedAccountId}
                {signedAccountId.length > 20 && "..."}
              </p>
              <MdOutlineVerified />
            </span>
          )}
        </div>
        {/* progress */}
        <div className="space-y-1">
          <p className="text-blue-400 text-xl font-bold">
            {latestCamp?.amount_required} NEAR
          </p>
          <ProgressRoot
            value={
              !latestCamp
                ? 0
                : (latestCamp?.total_contributions /
                    latestCamp?.amount_required) *
                  100
            }
          >
            <ProgressBar />
          </ProgressRoot>
          <div className="text-gray-400 text-sm">
            {!latestCamp ? 0 : msToDaysLeft(latestCamp?.crowdfunding_end_time)}
            days left
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
