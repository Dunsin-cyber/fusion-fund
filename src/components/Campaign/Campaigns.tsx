import React, { useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useClient } from "@/context";
import { NearContext } from "@/wallets/near";
import { FusionFundContract } from "@/config";
import toast from "react-hot-toast";

function Campaigns() {
  const [active, setActive] = React.useState(true);
  const { wallet, signedAccountId } = React.useContext(NearContext);

  const initContract = async () => {
    try {
      //  setLoading(true);
      const newAcc = await wallet.callMethod({
        contractId: FusionFundContract,
        method: "init",
        args: {},
      });
      if (newAcc) {
        console.log(newAcc);
        toast.success("Initialized Account Successfully");
        return;
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const createCampaign = async () => {
    try {
      //  setLoading(true);
      const newAcc = await wallet.callMethod({
        contractId: FusionFundContract,
        method: "create_campaign",
        args: {
          end_time: "3000000",
          title: "first ever camp",
          description: "dec oo",
          images: "./pic.png",
          amount_required: Number(30000).toString(),
          campaign_code: "XC#$$",
        },
      });
      if (newAcc) {
        console.log(newAcc);
        toast.success("camp created");
        return;
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const createProfile = async () => {
    try {
      //  setLoading(true);
      const newAcc = await wallet.callMethod({
        contractId: FusionFundContract,
        method: "create_profile",
        args: {
          username: "TJ",
          bio: JSON.stringify("fineboy"),
        },
      });
      if (newAcc) {
        console.log(newAcc);
        toast.success("user created");
        return;
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const getProfile = async () => {
    try {
      //  setLoading(true);
      const newAcc = await wallet.viewMethod({
        contractId: FusionFundContract,
        method: "get_user_profile",
        args: {
          user_id: signedAccountId,
        },
      });
      if (newAcc) {
        console.log(newAcc);
        //  toast.success("user created");
        return;
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  const getCampaigns = async () => {
    try {
      if (wallet) {
        const data = await wallet?.viewMethod({
          contractId: FusionFundContract,
          method: "get_all_campaigns",
          args: {},
        });

        console.log("campaigns", data);
      }
    } catch (err) {
      console.log("ERR", err);
    }
  };

  useEffect(() => {
    // initContract();
    // createCampaign();
    // createProfile();
    getProfile();
    getCampaigns();
  }, [wallet]);

  const campaigns = [
    {
      title: "Fund My Tuition",
      image: "/donation-1.png",
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
      image: "/donation-2.jpg",
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
    <div className="px-3">
      <h2 className="relative flex-row z-10 text-2xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>
          <FaTasks color="blue" />
        </span>
        <span>Campaigns</span>
      </h2>
      {/* campaigns */}
      <div>
        <div className="flex justify-evenly my-3 w-full">
          <div
            onClick={() => setActive(true)}
            className={`flex rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105  w-[50%] justify-center space-x-2 cursor-pointer items-center ${
              active && "bg-gray-700 "
            } `}
          >
            <p>Ongoing</p>
            <p className=" px-1 py-[1/2] rounded-3xl text-white font-semibold">
              2
            </p>
          </div>
          <div
            onClick={() => setActive(false)}
            className={`flex rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105   w-[50%] justify-center cursor-pointer items-center${
              !active && " bg-gray-700 "
            } `}
          >
            <p>Completed</p>
            <p className=" px-1 py-[1/2]  rounded-3xl text-white font-semibold">
              0
            </p>
          </div>
        </div>

        <div className="p-4 bg-black min-h-screen">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} {...campaign} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Campaigns;

export const CampaignCard = ({ title, image, progress, daysLeft, rewards }) => {
  const { setIsCampDetailOpen } = useClient();

  return (
    <div
      onClick={() => setIsCampDetailOpen(true)}
      className="rounded-lg shadow-lg p-4 mb-4 w-full"
    >
      {/* Campaign Header */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        {/* Image */}
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="flex items-center mb-4">
        <img src={image} alt={title} className="w-10 h-10 rounded-full mr-3" />
        <div className="flex flex-col">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <span className="text-green-400 text-sm">{daysLeft} days left</span>
        </div>
      </div>

      {/* Progress */}
      <div className="text-white mb-4">
        <p className="text-gray-400 text-sm">Progress: {progress}%</p>
      </div>

      {/* Rewards Section */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {rewards.map((reward, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-blue-400 text-xl font-bold">
              {reward.amount}
            </div>
            <div className="text-gray-400 text-sm">{reward.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
