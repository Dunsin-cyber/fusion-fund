import React from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useClient } from "@/context";
import { FaWallet } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const ConnectWalletDrawer = ({ connectWallet }) => {
  const { closeDrawer } = useClient();
  return (
    <DrawerRoot
      size="lg"
      open={connectWallet}
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
          <ConnectOptions />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default ConnectWalletDrawer;

const ConnectOptions = () => {
  const { setConnectWallet } = useClient();

  return (
    <div className="flex flex-col items-center justify-center text-white p-4 pb-8">
      <div className="flex self-end " onClick={() => setConnectWallet(false)}>
        <MdOutlineCancel size={"30px"} />
      </div>

      <h2 className="text-2xl font-semibold mb-6">Connect to Continue</h2>

      <div className="flex flex-col space-y-4">
        {/* Connect with Email */}

        <button className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
          <span className="relative z-20">Connect with Email</span>
        </button>

        {/* Connect with Wallet */}
        <button className="flex items-center justify-center shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          <FaWallet className="mr-2" />
          Connect with Wallet
        </button>
      </div>
    </div>
  );
};
