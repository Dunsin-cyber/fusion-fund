"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useClient } from "@/context";
import { FaWallet } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { NearContext } from "@/wallets/near";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { useCreateUser } from "@/functions";

const WriteProfile = ({ isCreateProfile }) => {
  const { closeDrawer } = useClient();

  return (
    <DrawerRoot
      size="lg"
      open={isCreateProfile}
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
          <Form />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default WriteProfile;

export function Form() {
  const user = useAppSelector((state) => state.profile);
  const [title, setTitle] = useState(user ? user.username : "");
  const [bio, setBio] = useState(user ? user.bio : "");
  const { createUser, loading } = useCreateUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const data = {
      bio,
      username: title,
    };
    await createUser(data);
    setIsCreateCampOpen(false);
  };
  const { setIsCreateCampOpen, setIsCreateProfile } = useClient();
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div
        className="flex justify-end "
        onClick={() => setIsCreateProfile(false)}
      >
        <MdOutlineCancel size={"30px"} />
      </div>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          {!user && (
            <LabelInputContainer>
              <Label htmlFor="firstname">username</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="firstname"
                placeholder="username"
                type="text"
              />
            </LabelInputContainer>
          )}
          <LabelInputContainer>
            <Label htmlFor="bio">Bio</Label>
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              id="bio"
              placeholder="i love football"
              type="text"
            />
          </LabelInputContainer>
        </div>

        <button
          disabled={loading}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {loading ? "loading..." : user ? "update" : "Create"} &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
