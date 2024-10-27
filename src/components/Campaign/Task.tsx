import React from "react";
import { FaTasks } from "react-icons/fa";
import { CiFlag1 } from "react-icons/ci";
import { useClient } from "@/context";

function Campaigns() {
  const [isOpen, setIsOpen] = React.useState(false);

  const {} = useClient();

  const onClose = () => {
    setIsOpen(!false);
  };
  return (
    <div className="my-2 px-3">
      <h2 className="relative flex-row z-10 text-2xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span className="mt-1">
          <FaTasks color="blue" />
        </span>
        <span>Set up your Account</span>
      </h2>
      <div className="rounded-xl bg-gray-900 px-3 py-3 mt-3 z-10">
        <div className="space-y-6 mt-2">
          {/* task */}
          <div
            onClick={() => setIsOpen(true)}
            className="rounded-lg border border-blue-800 border-5 flex justify-between items-center py-3 px-5"
          >
            <CiFlag1 color="white" />
            <div>
              <p className="font-bold text-sm">Connect Email</p>
              <p className="text-xs">or connect with your wallet</p>
            </div>

            <h1 className="bg-white text-black rounded-full px-2"> Go</h1>
          </div>
          <div
            onClick={() => console.log("create camp")}
            className="rounded-lg border border-blue-800 border-5 flex justify-between items-center py-3 px-5"
          >
            <CiFlag1 color="white" />
            <div>
              <p className="font-bold text-sm">Create a Campaign</p>
              <p className="text-xs">or fund a campaign</p>
            </div>

            <h1 className="bg-white text-black rounded-full px-2"> Go</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Campaigns;
