import React, { useContext } from "react";
// import Image from "next/image";
// import Logo from "./logo.png";
import { MdOutlineVerified } from "react-icons/md";
import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import { NearContext } from "@/wallets/near";

function Profile() {
  const { signedAccountId } = useContext(NearContext);

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
              <p>{signedAccountId}</p>
              <MdOutlineVerified />
            </span>
          )}
        </div>
        {/* progress */}
        <div className="space-y-1">
          <p className="text-blue-400 text-xl font-bold"> 600 NEAR</p>
          <ProgressRoot value={70}>
            <ProgressBar />
          </ProgressRoot>
          <div className="text-gray-400 text-sm">15 days left</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
